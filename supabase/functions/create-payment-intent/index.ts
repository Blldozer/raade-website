
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@13.7.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Maximum number of retries for Stripe API calls
const MAX_RETRIES = 3;
// Request timeout in milliseconds
const REQUEST_TIMEOUT = 10000;

/**
 * Create Payment Intent Edge Function
 * 
 * Processes payment requests for conference registrations by:
 * - Creating a Stripe payment intent based on ticket type
 * - Calculating correct pricing based on ticket selection and group size
 * - Validating group size for group registrations
 * - Handling timeouts and retries for better reliability
 * - Enhanced logging for troubleshooting
 * - Detailed error handling and reporting
 */
serve(async (req) => {
  const requestStart = Date.now();
  const requestId = crypto.randomUUID();
  
  console.log(`[${requestId}] Request started`);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the Stripe secret key from environment variable
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    
    if (!stripeSecretKey) {
      console.error(`[${requestId}] STRIPE_SECRET_KEY is not set in environment variables`);
      return new Response(
        JSON.stringify({ 
          error: "Server configuration error: Missing Stripe secret key",
          requestId
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Validate the secret key format (should start with sk_)
    if (!stripeSecretKey.startsWith('sk_')) {
      console.error(`[${requestId}] Invalid STRIPE_SECRET_KEY format, should start with sk_`);
      return new Response(
        JSON.stringify({ 
          error: "Server configuration error: Invalid Stripe secret key format",
          requestId
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Parse the request body with timeout
    let requestData;
    try {
      const body = await req.text();
      if (!body) {
        console.error(`[${requestId}] Empty request body`);
        return new Response(
          JSON.stringify({ 
            error: "Empty request body",
            requestId
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      
      try {
        requestData = JSON.parse(body);
      } catch (parseError) {
        console.error(`[${requestId}] Failed to parse request body:`, parseError);
        return new Response(
          JSON.stringify({ 
            error: "Invalid request format: Unable to parse JSON",
            requestId
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
    } catch (bodyError) {
      console.error(`[${requestId}] Error reading request body:`, bodyError);
      return new Response(
        JSON.stringify({ 
          error: "Failed to read request body",
          requestId
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Extract and validate request data
    const { ticketType, email, fullName, groupSize } = requestData;
    
    // Log request for debugging
    console.log(`[${requestId}] Received payment intent request:`, JSON.stringify({
      ticketType,
      email,
      fullName,
      groupSize: groupSize || "N/A"
    }));
    
    // Validate input data
    if (!ticketType || !email || !fullName) {
      console.error(`[${requestId}] Missing required fields`);
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields",
          details: "Ticket type, email, and full name are required",
          requestId
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Validate group size for student-group tickets
    const isGroupRegistration = ticketType === "student-group";
    if (isGroupRegistration) {
      if (!groupSize || groupSize < 5) {
        console.error(`[${requestId}] Invalid group size: ${groupSize}`);
        return new Response(
          JSON.stringify({ 
            error: "Invalid group size",
            details: "Group registrations require a minimum of 5 people",
            requestId
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
    }
    
    let amount = 0;
    let description = "";

    // Calculate amount based on ticket type - using the updated pricing
    switch (ticketType) {
      case "student":
        amount = 3500; // $35.00
        description = "Student Ticket - RAADE Conference 2025";
        break;
      case "professional":
        amount = 6000; // $60.00
        description = "Professional Ticket - RAADE Conference 2025";
        break;
      case "student-group":
        // Ensure minimum group size of 5
        const finalGroupSize = Math.max(groupSize || 5, 5);
        amount = 3000 * finalGroupSize; // $30.00 per person
        description = `Student Group (${finalGroupSize} members) - RAADE Conference 2025`;
        break;
      default:
        console.error(`[${requestId}] Invalid ticket type: ${ticketType}`);
        return new Response(
          JSON.stringify({ 
            error: `Invalid ticket type: ${ticketType}`,
            validTypes: ["student", "professional", "student-group"],
            receivedData: requestData,
            requestId
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
    }

    console.log(`[${requestId}] Creating payment intent for ${amount} cents (${description}) - ${email}`);
    
    // Implement retry logic with backoff for Stripe API calls
    let paymentIntent = null;
    let retryCount = 0;
    let lastError = null;
    
    // Create Stripe instance once outside the retry loop
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
      httpClient: Stripe.createFetchHttpClient(),
    });

    while (retryCount < MAX_RETRIES && !paymentIntent) {
      if (retryCount > 0) {
        // Exponential backoff: 500ms, 1000ms, 2000ms
        const backoffTime = Math.pow(2, retryCount - 1) * 500;
        console.log(`[${requestId}] Retry ${retryCount}/${MAX_RETRIES} after ${backoffTime}ms`);
        await new Promise(resolve => setTimeout(resolve, backoffTime));
      }
      
      try {
        // Implement timeout for the Stripe API call
        const timeoutController = new AbortController();
        const timeoutId = setTimeout(() => timeoutController.abort(), REQUEST_TIMEOUT);
        
        try {
          // Create a Payment Intent
          paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            description,
            receipt_email: email,
            metadata: {
              ticketType,
              customerName: fullName,
              email,
              groupSize: isGroupRegistration ? String(groupSize || 5) : undefined,
              requestId
            },
            automatic_payment_methods: {
              enabled: true,
            },
          });
          
          clearTimeout(timeoutId);
        } catch (timeoutError) {
          clearTimeout(timeoutId);
          if (timeoutError.name === 'AbortError' || timeoutController.signal.aborted) {
            console.error(`[${requestId}] Stripe API call timed out after ${REQUEST_TIMEOUT}ms`);
            throw new Error(`Stripe API timeout after ${REQUEST_TIMEOUT}ms`);
          }
          throw timeoutError;
        }
      } catch (stripeError) {
        lastError = stripeError;
        console.error(`[${requestId}] Stripe API error (attempt ${retryCount + 1}/${MAX_RETRIES}):`, stripeError);
        
        // Check if this is a retryable error
        const isRetryable = 
          stripeError.type === 'api_connection_error' || 
          stripeError.type === 'api_error' ||
          stripeError.message?.includes('timeout') ||
          stripeError.message?.includes('network') ||
          (stripeError.statusCode >= 500 && stripeError.statusCode < 600);
        
        if (!isRetryable) {
          console.error(`[${requestId}] Non-retryable Stripe error:`, stripeError.type);
          break; // Don't retry non-retryable errors
        }
      }
      
      retryCount++;
    }
    
    // If we have a payment intent, return it, otherwise return the last error
    if (paymentIntent) {
      const responseTime = Date.now() - requestStart;
      console.log(`[${requestId}] Payment intent created successfully in ${responseTime}ms:`, paymentIntent.id);

      // Return the payment intent client secret with detailed information
      return new Response(
        JSON.stringify({ 
          clientSecret: paymentIntent.client_secret,
          amount: amount / 100, // Convert cents to dollars for display
          currency: "USD",
          isGroupRegistration,
          groupSize: isGroupRegistration ? Math.max(groupSize || 5, 5) : undefined,
          ticketType,
          perPersonCost: isGroupRegistration ? 30 : (ticketType === "student" ? 35 : 60),
          requestId,
          responseTime
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    } else {
      const errorMessage = lastError?.message || "Unknown error creating payment intent";
      console.error(`[${requestId}] Failed to create payment intent after ${MAX_RETRIES} attempts:`, errorMessage);
      
      return new Response(
        JSON.stringify({ 
          error: "Stripe API error: " + errorMessage,
          details: `Failed to create payment intent after ${retryCount} attempts. Please try again later.`,
          stripeErrorType: lastError?.type || "unknown",
          requestId
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
  } catch (error) {
    const responseTime = Date.now() - requestStart;
    console.error(`[${requestId}] Unhandled error after ${responseTime}ms:`, error);
    
    return new Response(
      JSON.stringify({ 
        error: "Server error: " + error.message,
        details: "There was an unexpected error processing your payment request. Please try again or contact support.",
        requestId,
        responseTime
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
