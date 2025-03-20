
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createTimeout } from "./utils.ts";

// Maximum number of retries for Stripe API calls
export const MAX_RETRIES = 3;
// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 15000; // Increased from 10000 to 15000

// Create payment intent with retries
export async function createPaymentIntentWithRetry(
  stripe: Stripe,
  amount: number,
  currency: string,
  description: string, 
  email: string,
  fullName: string,
  ticketType: string,
  groupSize: number | undefined,
  isGroupRegistration: boolean,
  requestId: string
) {
  let paymentIntent = null;
  let retryCount = 0;
  let lastError = null;
  
  console.log(`[${requestId}] Starting payment intent creation for ${email}, amount: ${amount}, ticket: ${ticketType}`);
  
  while (retryCount < MAX_RETRIES && !paymentIntent) {
    if (retryCount > 0) {
      // Exponential backoff: 500ms, 1000ms, 2000ms
      const backoffTime = Math.pow(2, retryCount - 1) * 500;
      console.log(`[${requestId}] Retry ${retryCount}/${MAX_RETRIES} after ${backoffTime}ms`);
      await new Promise(resolve => setTimeout(resolve, backoffTime));
    }
    
    try {
      // Implement timeout for the Stripe API call
      const timeoutId = setTimeout(() => {
        console.error(`[${requestId}] Stripe API call attempt ${retryCount + 1} timed out after ${REQUEST_TIMEOUT}ms`);
      }, REQUEST_TIMEOUT);
      
      try {
        console.log(`[${requestId}] Attempting to create payment intent (try ${retryCount + 1}/${MAX_RETRIES})`);
        
        // Create a Payment Intent
        paymentIntent = await Promise.race([
          stripe.paymentIntents.create({
            amount,
            currency,
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
          }),
          createTimeout(REQUEST_TIMEOUT, `Stripe API timeout after ${REQUEST_TIMEOUT}ms`)
        ]);
        
        clearTimeout(timeoutId);
        console.log(`[${requestId}] Payment intent created successfully: ${paymentIntent.id}`);
      } catch (timeoutError) {
        clearTimeout(timeoutId);
        console.error(`[${requestId}] Error during payment intent creation:`, timeoutError);
        throw timeoutError;
      }
    } catch (stripeError) {
      lastError = stripeError;
      console.error(`[${requestId}] Stripe API error (attempt ${retryCount + 1}/${MAX_RETRIES}):`, 
        stripeError.type || 'unknown', 
        stripeError.message || 'No message'
      );
      
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
  
  if (paymentIntent) {
    console.log(`[${requestId}] Successfully created payment intent after ${retryCount} ${retryCount === 1 ? 'try' : 'tries'}`);
  } else {
    console.error(`[${requestId}] Failed to create payment intent after ${MAX_RETRIES} attempts`);
  }
  
  return { paymentIntent, lastError };
}
