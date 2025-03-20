import Stripe from "https://esm.sh/stripe@14.21.0";
import { createTimeout } from "./utils.ts";

// Maximum number of retries for Stripe API calls
export const MAX_RETRIES = 3;
// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 10000;

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
      } catch (timeoutError) {
        clearTimeout(timeoutId);
        if (timeoutController.signal.aborted) {
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
  
  return { paymentIntent, lastError };
}
