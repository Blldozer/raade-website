
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createTimeout } from "./utils.ts";

// Maximum number of retries for Stripe API calls
export const MAX_RETRIES = 3;
// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 15000; // Increased from 10000 to 15000

// Create payment intent with proper error handling and retries
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
  let retryCount = 0;
  let lastError = null;
  
  console.log(`[${requestId}] Starting payment intent creation for ${email}, amount: ${amount}, ticket: ${ticketType}`);
  
  while (retryCount < MAX_RETRIES) {
    if (retryCount > 0) {
      // Exponential backoff: 500ms, 1000ms, 2000ms
      const backoffTime = Math.pow(2, retryCount - 1) * 500;
      console.log(`[${requestId}] Retry ${retryCount}/${MAX_RETRIES} after ${backoffTime}ms`);
      await new Promise(resolve => setTimeout(resolve, backoffTime));
    }
    
    try {
      // Create a controller for this specific request that can be aborted
      const controller = new AbortController();
      let timeoutId = null;
      
      // Setup timeout with proper cleanup
      const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => {
          console.error(`[${requestId}] Stripe API call attempt ${retryCount + 1} timed out after ${REQUEST_TIMEOUT}ms`);
          controller.abort();
          reject(new Error(`Stripe API timeout after ${REQUEST_TIMEOUT}ms`));
        }, REQUEST_TIMEOUT);
      });
      
      try {
        console.log(`[${requestId}] Attempting to create payment intent (try ${retryCount + 1}/${MAX_RETRIES})`);
        
        // Use Promise.race with proper cleanup
        const paymentIntent = await Promise.race([
          stripe.paymentIntents.create({
            amount,
            currency,
            description,
            payment_method_types: ["card"],
            receipt_email: email,
            metadata: {
              fullName,
              email,
              ticketType,
              groupSize: groupSize?.toString() || "1",
              isGroupRegistration: isGroupRegistration.toString(),
              requestId,
              attempt: retryCount.toString()
            }
          }, { stripeAccount: undefined }),
          timeoutPromise
        ]);
        
        // If we got here, clear the timeout to prevent memory leaks
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }
        
        console.log(`[${requestId}] Payment intent created successfully: ${paymentIntent.id}`);
        return { paymentIntent, lastError: null };
      } catch (error) {
        // Always clean up timeout to prevent memory leaks
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }
        
        // Re-throw to be handled by outer try/catch
        throw error;
      }
    } catch (error) {
      retryCount++;
      lastError = error;
      console.error(`[${requestId}] Attempt ${retryCount} failed:`, error.message);
      
      // Check if we've exhausted all retries
      if (retryCount >= MAX_RETRIES) {
        console.error(`[${requestId}] All ${MAX_RETRIES} attempts failed`);
        return { paymentIntent: null, lastError };
      }
    }
  }
  
  // This should never be reached due to the return in the loop above
  return { paymentIntent: null, lastError: new Error(`Failed to create payment intent after ${MAX_RETRIES} attempts`) };
}
