import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { corsHeaders, createResponse, createErrorResponse, createTimeout } from "./utils.ts";
import { validateStripeKey, validateRequestData } from "./validation.ts";
import { calculatePaymentAmount } from "../_shared/pricing.ts";
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
  // Create a unique context for this specific request to ensure isolation
  const requestContext = {
    id: crypto.randomUUID(),
    startTime: Date.now(),
    stripe: null as Stripe | null,
    controller: new AbortController(),
    timeouts: new Set<number>()
  };
  
  // Set up automatic cleanup when request is aborted or completed
  const cleanupContext = () => {
    // Clear all timeouts associated with this request
    requestContext.timeouts.forEach(timeoutId => {
      clearTimeout(timeoutId);
    });
    requestContext.timeouts.clear();
    
    // Abort any in-progress operations
    requestContext.controller.abort();
    
    console.log(`[${requestContext.id}] Request context cleaned up after ${Date.now() - requestContext.startTime}ms`);
  };
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log(`[${requestContext.id}] Request started`);
    
    // Get the Stripe secret key from environment variable
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    
    // Validate the Stripe API key
    const keyValidationError = validateStripeKey(stripeSecretKey, requestContext.id);
    if (keyValidationError) return keyValidationError;
    
    // Create a fresh Stripe instance for each request
    // This ensures total isolation between requests
    requestContext.stripe = new Stripe(stripeSecretKey as string, {
      apiVersion: '2022-11-15',
      httpClient: Stripe.createFetchHttpClient(),
      maxNetworkRetries: 2,
    });

    // Parse the request body with timeout
    let requestData;
    try {
      const bodyTextPromise = req.text();
      
      // Create a timeout with cleanup function
      const { promise: timeoutPromise, cleanup: cleanupTimeout } = createTimeout(
        5000, 
        "Request body parsing timed out"
      );
      
      // Add cleanup function to this request's timeouts
      const timeoutId = setTimeout(() => {
        console.error(`[${requestContext.id}] Request body parsing timed out`);
      }, 5000);
      requestContext.timeouts.add(timeoutId);
      
      try {
        // Race between body parsing and timeout
        const body = await Promise.race([bodyTextPromise, timeoutPromise]);
        
        // If we get here, body parsing succeeded - clean up
        cleanupTimeout();
        requestContext.timeouts.delete(timeoutId);
        
        if (!body) {
          console.error(`[${requestContext.id}] Empty request body`);
          return createErrorResponse("Empty request body", undefined, 400, requestContext.id);
        }
        
        try {
          requestData = JSON.parse(body);
        } catch (parseError) {
          console.error(`[${requestContext.id}] Failed to parse request body:`, parseError);
          return createErrorResponse(
            "Invalid JSON in request body",
            "Please provide a valid JSON payload",
            400,
            requestContext.id
          );
        }
      } catch (error) {
        // Always clean up the timeout
        cleanupTimeout();
        requestContext.timeouts.delete(timeoutId);
        throw error;
      }

      // Handle check-only mode for testing Stripe connection
      if (requestData.checkOnly) {
        console.log(`[${requestContext.id}] Stripe connection check requested`);
        
        // Create Stripe instance to verify the API key is valid
        try {
          const stripe = new Stripe(stripeSecretKey as string, {
            apiVersion: '2022-11-15',
            httpClient: Stripe.createFetchHttpClient(),
            maxNetworkRetries: 2,
          });
          
          // Just try to get account info to verify the key works
          await stripe.account.retrieve();
          
          console.log(`[${requestContext.id}] Stripe connection check successful`);
          return createResponse({ 
            success: true, 
            message: "Stripe connection verified successfully",
            requestId: requestContext.id
          });
        } catch (error) {
          console.error(`[${requestContext.id}] Stripe connection check failed:`, error);
          return createErrorResponse(
            `Stripe API error: ${error.message || "Unknown error"}`,
            "Could not connect to Stripe payment service. Please check API key configuration.",
            500,
            requestContext.id
          );
        }
      }
      
      // Extract and validate request data
      const { ticketType, email, fullName, groupSize } = requestData;
      
      // Log request for debugging
      console.log(`[${requestContext.id}] Received payment intent request:`, JSON.stringify({
        ticketType,
        email,
        fullName,
        groupSize: groupSize || "N/A"
      }));
      
      // Use the existing validation logic
      const validationError = validateRequestData(requestData, requestContext.id);
      if (validationError) return validationError;
      
      try {
        // Calculate payment amount based on ticket type
        const { amount, description, isGroupRegistration } = calculatePaymentAmount(ticketType, groupSize);
        
        // Create payment intent using the request-specific Stripe instance
        const { paymentIntent, lastError } = await createPaymentIntentWithRetry(
          requestContext.stripe,
          amount,
          'usd',
          description,
          email,
          fullName,
          ticketType,
          groupSize,
          isGroupRegistration,
          requestContext.id
        );
        
        // If we have a payment intent, return it, otherwise return the last error
        if (paymentIntent) {
          const responseTime = Date.now() - requestContext.startTime;
          console.log(`[${requestContext.id}] Payment intent created successfully in ${responseTime}ms:`, paymentIntent.id);

          // Return the payment intent client secret with detailed information
          return createResponse({ 
            clientSecret: paymentIntent.client_secret,
            amount: amount / 100, // Convert cents to dollars for display
            currency: "USD",
            isGroupRegistration,
            groupSize: isGroupRegistration ? Math.max(groupSize || 5, 5) : undefined,
            ticketType,
            perPersonCost: isGroupRegistration ? 30 : (ticketType === "student" ? 35 : 60),
            requestId: requestContext.id,
            responseTime
          });
        } else {
          const errorMessage = lastError?.message || "Unknown error creating payment intent";
          console.error(`[${requestContext.id}] Failed to create payment intent after ${MAX_RETRIES} attempts:`, errorMessage);
          
          return createErrorResponse(
            "Stripe API error: " + errorMessage,
            `Failed to create payment intent. Please try again later.`,
            500,
            requestContext.id
          );
        }
      } catch (error) {
        if (error.message && error.message.includes("Invalid ticket type")) {
          return createErrorResponse(
            error.message,
            `Valid types are: ["student", "professional", "student-group"]`,
            400,
            requestContext.id
          );
        }
        throw error; // Re-throw other errors to be caught by outer catch
      }
    } catch (bodyError) {
      console.error(`[${requestContext.id}] Error reading request body:`, bodyError);
      return createErrorResponse("Failed to read request body", undefined, 400, requestContext.id);
    }
  } catch (error) {
    const responseTime = Date.now() - requestContext.startTime;
    console.error(`[${requestContext.id}] Unhandled error after ${responseTime}ms:`, error);
    
    return createErrorResponse(
      "Server error: " + error.message,
      "There was an unexpected error processing your payment request. Please try again or contact support.",
      500,
      requestContext.id
    );
  } finally {
    // Always clean up the request context
    cleanupContext();
  }
});
