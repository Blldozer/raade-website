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

serve(async (req) => {
  // Extract request ID from user input or generate a new one
  let requestId;
  let requestData;
  const startTime = Date.now();
  
  // Handle CORS preflight requests - IMPORTANT FIX
  if (req.method === "OPTIONS") {
    return new Response(null, { 
      headers: corsHeaders 
    });
  }
  
  try {
    const body = await req.text();
    try {
      requestData = JSON.parse(body);
      requestId = requestData.requestId || crypto.randomUUID();
    } catch (parseError) {
      requestId = crypto.randomUUID();
      console.error(`[${requestId}] Error parsing request body:`, parseError, "Raw body:", body);
      
      return createErrorResponse(
        "Invalid request format", 
        "Could not parse request body as JSON",
        400,
        requestId
      );
    }
  } catch (error) {
    requestId = crypto.randomUUID();
    console.error(`[${requestId}] Error reading request body:`, error);
    
    return createErrorResponse(
      "Invalid request format", 
      "Could not read request body",
      400,
      requestId
    );
  }
  
  console.log(`[${requestId}] Request started`);

  try {
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

    // Parse the request body again if it wasn't successfully parsed earlier
    let retryCount = 0;
    if (!requestData) {
      try {
        const body = await req.text();
        requestData = JSON.parse(body);
        retryCount = requestData.retryCount || 0;
      } catch (error) {
        console.error(`[${requestId}] Failed to parse request body:`, error);
        return createErrorResponse(
          "Invalid request format",
          "Failed to parse request JSON", 
          400, 
          requestId
        );
      }
    } else {
      retryCount = requestData.retryCount || 0;
    }
    
    // Log request details
    console.log(`[${requestId}] Processing request:`, {
      ticketType: requestData.ticketType,
      email: requestData.email,
      fullName: requestData.fullName,
      retryCount
    });
    
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
    
    // Extract validated registration data
    const { 
      ticketType, 
      email,
      fullName,
      groupSize,
      organization = "",
      role = "",
      specialRequests = "",
      referralSource = "",
      groupEmails = [],
      successUrl,
      cancelUrl
    } = requestData;
    
    // Sanitize group emails
    const sanitizedGroupEmails = sanitizeGroupEmails(groupEmails);
    
    console.log(`[${requestId}] Creating checkout session for ${email}, ticket: ${ticketType}, attempt: ${retryCount + 1}`);
    
    try {
      // Calculate price information with error handling
      let priceInfo;
      try {
        priceInfo = calculatePrice(ticketType, parseInt(groupSize));
      } catch (priceError) {
        console.error(`[${requestId}] Price calculation error:`, priceError);
        return createErrorResponse(
          "Price calculation failed",
          priceError.message,
          400,
          requestId
        );
      }
      
      // Initialize Stripe with explicit timeout and version
      const stripe = new Stripe(stripeSecretKey, {
        apiVersion: "2025-02-24.acacia",
        httpClient: Stripe.createFetchHttpClient(),
        timeout: 20000, // 20 second timeout
      });
      
      // Create a unique idempotency key to prevent duplicate checkouts
      // If this is a retry, append the retry count to ensure a new key
      const idempotencyKey = `${requestId}-${email}-${ticketType}-${retryCount}`;
      
      // Use a 15-second timeout promise to prevent function timeouts
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Request timeout after 15 seconds")), 15000);
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
        success_url: successUrl,
        cancel_url: cancelUrl,
        customer_email: email,
        metadata: {
          ticketType,
          fullName,
          email,
          requestId,
          retryCount: String(retryCount),
          organization: organization || "",
          role: role || "",
          specialRequests: specialRequests || "",
          referralSource: referralSource || "",
          groupSize: priceInfo.isGroup ? String(groupSize) : "",
          groupEmails: priceInfo.isGroup ? JSON.stringify(sanitizedGroupEmails) : ""
        },
      }, {
        idempotencyKey // Add idempotency key to prevent duplicates
      });
      
      // Race the session creation against a timeout
      const session = await Promise.race([sessionPromise, timeoutPromise]) as Stripe.Checkout.Session;
      
      const processingTime = Date.now() - startTime;
      console.log(`[${requestId}] Checkout session created: ${session.id}, processing time: ${processingTime}ms`);
      
      // Return the session URL with timing information
      return createResponse({
        sessionId: session.id,
        url: session.url,
        processingTime,
        requestId
      });
      
    } catch (error) {
      console.error(`[${requestId}] Stripe error (attempt ${retryCount + 1}):`, error);
      
      // Check if this is a network-related error
      const errorMessage = error.message || "Unknown error";
      if (
        errorMessage.includes("network") || 
        errorMessage.includes("connection") || 
        errorMessage.includes("timeout")
      ) {
        return createErrorResponse(
          "Network error", 
          "Could not connect to payment service. Please try again.",
          503, // Service Unavailable
          requestId
        );
      }
      
      // Check for idempotency key conflicts or existing session errors
      if (
        error.code === 'resource_already_exists' || 
        error.code === 'idempotency_key_in_use' ||
        (typeof error.message === 'string' && (
          error.message.includes('already exists') ||
          error.message.includes('session') ||
          error.message.includes('idempotency')
        ))
      ) {
        return createErrorResponse(
          "Checkout session conflict", 
          "A previous checkout session exists. Please try again.",
          409, // Conflict status code
          requestId
        );
      }
      
      return createErrorResponse(
        "Payment processing error", 
        errorMessage || "Failed to create checkout session",
        400, 
        requestId
      );
    }
    
  } catch (error) {
    console.error(`[${requestId}] Unhandled error:`, error);
    
    return createErrorResponse(
      "Server error", 
      error.message || "An unexpected error occurred",
      500, 
      requestId
    );
  }
});
