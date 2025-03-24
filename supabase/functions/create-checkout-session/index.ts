
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Calculate prices based on ticket type
function calculatePrice(ticketType: string, groupSize?: number) {
  // Define base prices in dollars
  const STUDENT_PRICE = 35;
  const PROFESSIONAL_PRICE = 60;
  const GROUP_PRICE_PER_PERSON = 30;
  
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
}

// Helper function to sanitize and validate input
function validateRequestData(requestData: any) {
  // Required fields validation
  const requiredFields = ['ticketType', 'email', 'fullName', 'successUrl', 'cancelUrl'];
  const missingFields = requiredFields.filter(field => !requestData[field]);
  
  if (missingFields.length > 0) {
    return {
      isValid: false,
      error: `Missing required fields: ${missingFields.join(', ')}`
    };
  }
  
  // Data type validation
  if (typeof requestData.ticketType !== 'string' || !['student', 'professional', 'student-group'].includes(requestData.ticketType)) {
    return {
      isValid: false,
      error: "Invalid ticket type. Must be 'student', 'professional', or 'student-group'"
    };
  }
  
  if (typeof requestData.email !== 'string' || !requestData.email.includes('@')) {
    return {
      isValid: false,
      error: "Invalid email format"
    };
  }
  
  if (typeof requestData.fullName !== 'string' || requestData.fullName.length < 2) {
    return {
      isValid: false,
      error: "Invalid full name"
    };
  }
  
  // Group size validation for student-group
  if (requestData.ticketType === 'student-group') {
    if (!requestData.groupSize || requestData.groupSize < 5) {
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
  if (!Array.isArray(emails)) {
    return [];
  }
  
  return emails
    .filter((email): email is (string | { value: string }) => {
      // Filter out null and undefined values
      return email !== null && email !== undefined;
    })
    .map(emailItem => {
      if (typeof emailItem === 'object' && emailItem.value !== undefined) {
        // Extract value from object format
        return emailItem.value;
      }
      // Return string directly if it's a string
      return String(emailItem);
    })
    .filter(email => email.length > 0 && typeof email === 'string' && email.includes('@')); // Filter out invalid emails
}

serve(async (req) => {
  // Extract request ID from user input or generate a new one
  let requestId;
  let requestData;
  
  try {
    const body = await req.text();
    requestData = JSON.parse(body);
    requestId = requestData.requestId || crypto.randomUUID();
  } catch (error) {
    requestId = crypto.randomUUID();
    console.error(`[${requestId}] Error parsing request body:`, error);
    
    return new Response(
      JSON.stringify({ 
        error: "Invalid request format", 
        message: "Could not parse request body",
        requestId
      }), 
      { 
        status: 400, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
  
  console.log(`[${requestId}] Request started`);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the Stripe secret key from environment variable
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    
    if (!stripeSecretKey) {
      console.error(`[${requestId}] Missing STRIPE_SECRET_KEY environment variable`);
      return new Response(
        JSON.stringify({ 
          error: "Server configuration error", 
          message: "Stripe API key is not configured" 
        }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
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
        return new Response(
          JSON.stringify({ error: "Invalid request format" }), 
          { 
            status: 400, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
    } else {
      retryCount = requestData.retryCount || 0;
    }
    
    // Validate request data
    const validation = validateRequestData(requestData);
    if (!validation.isValid) {
      console.error(`[${requestId}] Validation error:`, validation.error);
      return new Response(
        JSON.stringify({ 
          error: "Validation error", 
          message: validation.error,
          requestId 
        }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Extract validated registration data
    const { 
      ticketType, 
      email,
      fullName,
      groupSize,
      organization,
      role,
      specialRequests,
      groupEmails = [],
      successUrl,
      cancelUrl
    } = requestData;
    
    // Sanitize group emails
    const sanitizedGroupEmails = sanitizeGroupEmails(groupEmails);
    
    console.log(`[${requestId}] Creating checkout session for ${email}, ticket: ${ticketType}, attempt: ${retryCount + 1}`);
    
    try {
      // Calculate price information
      const priceInfo = calculatePrice(ticketType, groupSize);
      
      // Initialize Stripe
      const stripe = new Stripe(stripeSecretKey, {
        apiVersion: "2025-02-24.acacia",
        httpClient: Stripe.createFetchHttpClient(),
      });
      
      // Create a unique idempotency key to prevent duplicate checkouts
      // If this is a retry, append the retry count to ensure a new key
      const idempotencyKey = `${requestId}-${email}-${ticketType}-${retryCount}`;
      
      // Create Checkout Session
      const session = await stripe.checkout.sessions.create({
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
          groupSize: priceInfo.isGroup ? String(groupSize) : "",
          groupEmails: priceInfo.isGroup ? JSON.stringify(sanitizedGroupEmails) : ""
        },
      }, {
        idempotencyKey // Add idempotency key to prevent duplicates
      });
      
      console.log(`[${requestId}] Checkout session created: ${session.id}, attempt: ${retryCount + 1}`);
      
      // Return the session URL
      return new Response(
        JSON.stringify({
          sessionId: session.id,
          url: session.url,
          requestId
        }), 
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
      
    } catch (error) {
      console.error(`[${requestId}] Stripe error (attempt ${retryCount + 1}):`, error);
      
      // Check if this is a network-related error
      const errorMessage = error.message || "Unknown error";
      if (
        errorMessage.includes("network") || 
        errorMessage.includes("connection") || 
        errorMessage.includes("timeout")
      ) {
        return new Response(
          JSON.stringify({ 
            error: "Network error", 
            message: "Could not connect to payment service. Please try again.",
            isRecoverable: true,
            requestId
          }), 
          { 
            status: 503, // Service Unavailable
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      
      // Determine if this is a recoverable error
      const isRecoverable = 
        error.code === 'resource_already_exists' || 
        error.code === 'idempotency_key_in_use' ||
        (typeof error.message === 'string' && (
          error.message.includes('already exists') ||
          error.message.includes('session') ||
          error.message.includes('idempotency')
        ));
      
      // Special handling for recoverable errors
      if (isRecoverable) {
        return new Response(
          JSON.stringify({ 
            error: "Checkout session conflict", 
            message: "A previous checkout session exists. Please try again.",
            isRecoverable: true,
            requestId
          }), 
          { 
            status: 409, // Conflict status code
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          error: "Payment processing error", 
          message: errorMessage || "Failed to create checkout session",
          requestId
        }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
  } catch (error) {
    console.error(`[${requestId}] Unhandled error:`, error);
    return new Response(
      JSON.stringify({ 
        error: "Server error", 
        message: error.message || "An unexpected error occurred",
        requestId
      }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
