
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, cache-control, x-requested-with',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '1728000',
  'Access-Control-Allow-Credentials': 'true',
  'Vary': 'Origin',
};

// Helper function to create standardized response with CORS headers
function createResponse(data: any, status = 200) {
  return new Response(
    JSON.stringify(data),
    {
      status,
      headers: { 
        ...corsHeaders, 
        "Content-Type": "application/json",
        // Add cache control headers to prevent browser caching
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        "Pragma": "no-cache",
        "Expires": "0"
      }
    }
  );
}

// Helper function to create error responses
function createErrorResponse(error: string, message = "An error occurred", status = 400, requestId = "unknown") {
  console.error(`[${requestId}] Error: ${error}, Status: ${status}, Message: ${message}`);
  return createResponse({ 
    error, 
    message,
    requestId,
    timestamp: new Date().toISOString()
  }, status);
}

// Calculate prices based on ticket type
function calculatePrice(ticketType: string, groupSize?: number) {
  // Define base prices in dollars
  const STUDENT_PRICE = 35;
  const PROFESSIONAL_PRICE = 60;
  const GROUP_PRICE_PER_PERSON = 30;
  
  try {
    switch (ticketType) {
      case "student":
        return {
          amount: STUDENT_PRICE * 100, // Convert to cents
          description: "RAADE Conference 2025 - Student Registration",
          isGroup: false
        };
      case "professional":
        return {
          amount: PROFESSIONAL_PRICE * 100, // Convert to cents
          description: "RAADE Conference 2025 - Professional Registration",
          isGroup: false
        };
      case "student-group":
        if (!groupSize || groupSize < 5) {
          throw new Error("Group registrations require at least 5 participants");
        }
        return {
          amount: GROUP_PRICE_PER_PERSON * groupSize * 100, // Convert to cents
          description: `RAADE Conference 2025 - Student Group (${groupSize} attendees)`,
          isGroup: true,
          groupSize
        };
      default:
        throw new Error(`Invalid ticket type: ${ticketType}`);
    }
  } catch (error) {
    console.error("Price calculation error:", error.message);
    throw error;
  }
}

// Helper function to sanitize and validate input
function validateRequestData(requestData: any, requestId = "unknown") {
  // Required fields validation
  const requiredFields = ['ticketType', 'email', 'fullName', 'successUrl', 'cancelUrl'];
  const missingFields = requiredFields.filter(field => !requestData[field]);
  
  if (missingFields.length > 0) {
    console.error(`[${requestId}] Missing required fields: ${missingFields.join(', ')}`);
    return {
      isValid: false,
      error: `Missing required fields: ${missingFields.join(', ')}`
    };
  }
  
  // Data type validation
  if (typeof requestData.ticketType !== 'string' || !['student', 'professional', 'student-group'].includes(requestData.ticketType)) {
    console.error(`[${requestId}] Invalid ticket type: ${requestData.ticketType}`);
    return {
      isValid: false,
      error: "Invalid ticket type. Must be 'student', 'professional', or 'student-group'"
    };
  }
  
  if (typeof requestData.email !== 'string' || !requestData.email.includes('@')) {
    console.error(`[${requestId}] Invalid email format: ${requestData.email}`);
    return {
      isValid: false,
      error: "Invalid email format"
    };
  }
  
  if (typeof requestData.fullName !== 'string' || requestData.fullName.length < 2) {
    console.error(`[${requestId}] Invalid full name: ${requestData.fullName}`);
    return {
      isValid: false,
      error: "Invalid full name"
    };
  }
  
  // Group size validation for student-group
  if (requestData.ticketType === 'student-group') {
    const groupSize = Number(requestData.groupSize);
    if (isNaN(groupSize) || groupSize < 5) {
      console.error(`[${requestId}] Invalid group size: ${requestData.groupSize}`);
      return {
        isValid: false,
        error: "Group registrations require at least 5 participants"
      };
    }
  }
  
  return { isValid: true };
}

// Sanitize group emails
function sanitizeGroupEmails(emails: any): string[] {
  try {
    if (!Array.isArray(emails)) {
      return [];
    }
    
    return emails
      .filter((email): email is (string | { value: string }) => {
        // Filter out null and undefined values
        return email !== null && email !== undefined;
      })
      .map(emailItem => {
        if (typeof emailItem === 'object' && emailItem !== null && 'value' in emailItem) {
          // Extract value from object format
          return emailItem.value;
        }
        // Return string directly if it's a string
        return String(emailItem || '');
      })
      .filter(email => email.length > 0 && typeof email === 'string' && email.includes('@')); // Filter out invalid emails
  } catch (error) {
    console.error("Error sanitizing group emails:", error);
    return [];
  }
}

// Main function to create a Stripe checkout session
async function createCheckoutSession(
  stripeSecretKey: string, 
  requestData: any, 
  requestId: string, 
  retryCount: number = 0
) {
  try {
    // Extract unique session ID to prevent conflicts
    const sessionUniqueId = requestData.sessionUniqueId || `fallback-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    
    // Calculate price information
    let priceInfo;
    try {
      priceInfo = calculatePrice(requestData.ticketType, parseInt(String(requestData.groupSize)));
    } catch (priceError) {
      console.error(`[${requestId}] Price calculation error:`, priceError);
      return {
        success: false,
        error: "Price calculation failed",
        message: priceError.message,
      };
    }
    
    // Initialize Stripe with explicit timeout and version
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2022-11-15",
      httpClient: Stripe.createFetchHttpClient(),
      timeout: 25000, // 25 second timeout (increased from 20s)
    });
    
    // Create a unique idempotency key to prevent duplicate checkouts
    // Includes session unique ID to ensure true isolation between requests
    const idempotencyKey = `${requestId}-${sessionUniqueId}-${requestData.email}-${requestData.ticketType}-${retryCount}`;
    
    // Process and sanitize additional metadata
    const referralSource = requestData.referralSource || "";
    const sanitizedGroupEmails = sanitizeGroupEmails(requestData.groupEmails || []);
    
    // Create request metadata including all important fields
    const metadata = {
      ticketType: requestData.ticketType,
      fullName: requestData.fullName,
      email: requestData.email,
      requestId,
      retryCount: String(retryCount),
      sessionUniqueId,
      organization: requestData.organization || "",
      role: requestData.role || "",
      specialRequests: requestData.specialRequests || "",
      referralSource,
      groupSize: priceInfo.isGroup ? String(requestData.groupSize) : "",
      groupEmails: priceInfo.isGroup ? JSON.stringify(sanitizedGroupEmails) : ""
    };
    
    console.log(`[${requestId}] Creating checkout session with metadata:`, {
      ...metadata,
      // Truncate some fields for logging
      groupEmails: priceInfo.isGroup ? `[${sanitizedGroupEmails.length} emails]` : "", 
      specialRequests: requestData.specialRequests ? "[present]" : "",
    });
    
    // Use a timeout promise to prevent edge function timeouts
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`Request timeout after 20 seconds (${requestId})`)), 20000);
    });
    
    // Create Checkout Session with timeout protection
    const sessionPromise = stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: priceInfo.description,
            },
            unit_amount: priceInfo.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: requestData.successUrl,
      cancel_url: requestData.cancelUrl,
      customer_email: requestData.email,
      metadata,
    }, {
      idempotencyKey
    });
    
    // Race the session creation against a timeout
    const session = await Promise.race([sessionPromise, timeoutPromise]) as Stripe.Checkout.Session;
    
    return {
      success: true,
      sessionId: session.id,
      url: session.url,
      processingTime: Date.now() - (requestData.timestamp || Date.now()),
    };
    
  } catch (error) {
    console.error(`[${requestId}] Stripe error (attempt ${retryCount + 1}):`, error);
    
    // Check if this is a network-related error
    const errorMessage = error.message || "Unknown error";
    
    // Categorize the error for better handling
    if (errorMessage.includes("network") || 
        errorMessage.includes("connection") || 
        errorMessage.includes("timeout")) {
      return {
        success: false,
        error: "Network error", 
        message: "Could not connect to payment service. Please try again.",
        code: 503, // Service Unavailable
      };
    }
    
    // Check for idempotency key conflicts or existing session errors
    if (error.code === 'resource_already_exists' || 
        error.code === 'idempotency_key_in_use' ||
        (typeof errorMessage === 'string' && (
          errorMessage.includes('already exists') ||
          errorMessage.includes('session') ||
          errorMessage.includes('idempotency')
        ))) {
      return {
        success: false,
        error: "Checkout session conflict", 
        message: "A previous checkout session exists. Please try again.",
        code: 409, // Conflict status code
      };
    }
    
    return {
      success: false,
      error: "Payment processing error", 
      message: errorMessage || "Failed to create checkout session",
      code: 400,
    };
  }
}

serve(async (req) => {
  // Create isolated context for this request with unique ID
  const requestId = crypto.randomUUID();
  const startTime = Date.now();
  
  // Handle CORS preflight requests - IMPORTANT FIX
  if (req.method === "OPTIONS") {
    return new Response(null, { 
      headers: corsHeaders 
    });
  }
  
  // Log request start with tracing ID
  console.log(`[${requestId}] Request started at ${new Date().toISOString()}`);
  
  try {
    // Parse request body with error handling
    let requestData;
    try {
      // Get content type and check if it's empty
      const contentType = req.headers.get('content-type');
      
      if (!contentType || !contentType.includes('application/json')) {
        console.error(`[${requestId}] Invalid content type: ${contentType}`);
        return createErrorResponse(
          "Invalid content type", 
          "Request must have Content-Type: application/json",
          400,
          requestId
        );
      }
      
      // Check for request body
      const body = await req.text();
      
      if (!body || body.trim() === '') {
        console.error(`[${requestId}] Empty request body`);
        return createErrorResponse(
          "Empty request", 
          "Request body cannot be empty",
          400,
          requestId
        );
      }
      
      try {
        requestData = JSON.parse(body);
        // Extract retry count from request if present
        const retryCount = requestData.retryCount || 0;
        console.log(`[${requestId}] Request parsed successfully, retry count: ${retryCount}`);
      } catch (parseError) {
        console.error(`[${requestId}] Error parsing request body:`, parseError, "Raw body:", body);
        
        return createErrorResponse(
          "Invalid request format", 
          "Could not parse request body as JSON",
          400,
          requestId
        );
      }
    } catch (error) {
      console.error(`[${requestId}] Error reading request body:`, error);
      
      return createErrorResponse(
        "Invalid request format", 
        "Could not read request body",
        400,
        requestId
      );
    }

    // Get the Stripe secret key from environment variable
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    
    if (!stripeSecretKey) {
      console.error(`[${requestId}] Missing STRIPE_SECRET_KEY environment variable`);
      return createErrorResponse(
        "Server configuration error", 
        "Stripe API key is not configured",
        500,
        requestId
      );
    }

    // Validate request data
    const validation = validateRequestData(requestData, requestId);
    if (!validation.isValid) {
      return createErrorResponse(
        "Validation error", 
        validation.error, 
        400, 
        requestId
      );
    }
    
    // Extract retry count
    const retryCount = requestData.retryCount || 0;
    
    // Create checkout session
    const result = await createCheckoutSession(
      stripeSecretKey, 
      requestData, 
      requestId, 
      retryCount
    );
    
    // Process the result
    if (!result.success) {
      return createErrorResponse(
        result.error, 
        result.message,
        result.code || 400,
        requestId
      );
    }
    
    // Calculate and log processing time
    const processingTime = Date.now() - startTime;
    console.log(`[${requestId}] Checkout session created successfully in ${processingTime}ms`);
    
    // Return the successful result
    return createResponse({
      sessionId: result.sessionId,
      url: result.url,
      processingTime,
      requestId
    });
    
  } catch (error) {
    // Handle any unexpected errors
    const processingTime = Date.now() - startTime;
    console.error(`[${requestId}] Unhandled error after ${processingTime}ms:`, error);
    
    return createErrorResponse(
      "Server error", 
      error.message || "An unexpected error occurred",
      500, 
      requestId
    );
  }
});
