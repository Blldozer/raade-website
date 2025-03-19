
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@13.7.0";
import { corsHeaders, createResponse, createErrorResponse, createTimeout } from "./utils.ts";
import { validateStripeKey, validateRequestData } from "./validation.ts";
import { calculatePaymentAmount } from "./pricing.ts";
import { createPaymentIntentWithRetry, MAX_RETRIES } from "./stripe-service.ts";

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
    
    // Validate the Stripe API key
    const keyValidationError = validateStripeKey(stripeSecretKey, requestId);
    if (keyValidationError) return keyValidationError;

    // Parse the request body with timeout
    let requestData;
    try {
      const body = await req.text();
      if (!body) {
        console.error(`[${requestId}] Empty request body`);
        return createErrorResponse("Empty request body", undefined, 400, requestId);
      }
      
      try {
        requestData = JSON.parse(body);
      } catch (parseError) {
        console.error(`[${requestId}] Failed to parse request body:`, parseError);
        return createErrorResponse(
          "Invalid request format: Unable to parse JSON", 
          undefined,
          400, 
          requestId
        );
      }
    } catch (bodyError) {
      console.error(`[${requestId}] Error reading request body:`, bodyError);
      return createErrorResponse("Failed to read request body", undefined, 400, requestId);
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
    
    // Validate the request data
    const validationError = validateRequestData(requestData, requestId);
    if (validationError) return validationError;
    
    try {
      // Calculate payment amount
      const { amount, description, isGroupRegistration } = calculatePaymentAmount(ticketType, groupSize);

      console.log(`[${requestId}] Creating payment intent for ${amount} cents (${description}) - ${email}`);
      
      // Create Stripe instance
      const stripe = new Stripe(stripeSecretKey, {
        apiVersion: "2023-10-16",
        httpClient: Stripe.createFetchHttpClient(),
      });

      // Create payment intent with retry mechanism
      const { paymentIntent, lastError } = await createPaymentIntentWithRetry(
        stripe,
        amount,
        "usd",
        description,
        email,
        fullName,
        ticketType,
        groupSize,
        isGroupRegistration,
        requestId
      );
      
      // If we have a payment intent, return it, otherwise return the last error
      if (paymentIntent) {
        const responseTime = Date.now() - requestStart;
        console.log(`[${requestId}] Payment intent created successfully in ${responseTime}ms:`, paymentIntent.id);

        // Return the payment intent client secret with detailed information
        return createResponse({ 
          clientSecret: paymentIntent.client_secret,
          amount: amount / 100, // Convert cents to dollars for display
          currency: "USD",
          isGroupRegistration,
          groupSize: isGroupRegistration ? Math.max(groupSize || 5, 5) : undefined,
          ticketType,
          perPersonCost: isGroupRegistration ? 30 : (ticketType === "student" ? 35 : 60),
          requestId,
          responseTime
        });
      } else {
        const errorMessage = lastError?.message || "Unknown error creating payment intent";
        console.error(`[${requestId}] Failed to create payment intent after ${MAX_RETRIES} attempts:`, errorMessage);
        
        return createErrorResponse(
          "Stripe API error: " + errorMessage,
          `Failed to create payment intent. Please try again later.`,
          500,
          requestId
        );
      }
    } catch (error) {
      if (error.message && error.message.includes("Invalid ticket type")) {
        return createErrorResponse(
          error.message,
          `Valid types are: ["student", "professional", "student-group"]`,
          400,
          requestId
        );
      }
      throw error; // Re-throw other errors to be caught by outer catch
    }
  } catch (error) {
    const responseTime = Date.now() - requestStart;
    console.error(`[${requestId}] Unhandled error after ${responseTime}ms:`, error);
    
    return createErrorResponse(
      "Server error: " + error.message,
      "There was an unexpected error processing your payment request. Please try again or contact support.",
      500,
      requestId
    );
  }
});
