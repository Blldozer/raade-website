
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createTimeout } from "./utils.ts";
import { getBackoffDelay } from "./utils.ts";

// Maximum number of retries for Stripe API calls
export const MAX_RETRIES = 3;
// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 15000; // 15 seconds

/**
 * Create payment intent with robust error handling and retries
 * 
 * @param stripe - Request-isolated Stripe instance
 * @param amount - Payment amount in cents
 * @param currency - Currency code
 * @param description - Payment description
 * @param email - Customer email
 * @param fullName - Customer name
 * @param ticketType - Type of ticket purchased
 * @param groupSize - Number of people in group registration
 * @param isGroupRegistration - Whether this is a group registration
 * @param requestId - Unique ID for request tracking
 * @returns Payment intent object or error
 */
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
): Promise<{ paymentIntent?: Stripe.PaymentIntent; lastError?: Error }> {
  // Track retry attempts
  let attempt = 0;
  let lastError: Error | undefined;
  
  while (attempt <= MAX_RETRIES) {
    // Create abort controller for this attempt
    const controller = new AbortController();
    
    // Create timeout with cleanup
    const { promise: timeoutPromise, cleanup: cleanupTimeout } = createTimeout(
      REQUEST_TIMEOUT,
      `Stripe API timeout after ${REQUEST_TIMEOUT}ms`
    );
    
    try {
      console.log(`[${requestId}] Creating payment intent, attempt ${attempt + 1}/${MAX_RETRIES + 1}`);
      console.log(`[${requestId}] Payment details: ${ticketType}, ${amount} cents, ${isGroupRegistration ? 'Group of ' + groupSize : 'Individual'}`);
      
      // Create a promise for the payment intent creation
      const paymentIntentPromise = stripe.paymentIntents.create({
        amount,
        currency,
        description,
        metadata: {
          email,
          fullName,
          ticketType,
          groupSize: groupSize?.toString() || "N/A",
          isGroupRegistration: isGroupRegistration.toString(),
          requestId
        },
        receipt_email: email,
        automatic_payment_methods: { enabled: true },
      }, {
        // Pass the signal to the request to allow cancellation
        signal: controller.signal
      });
      
      // Race the payment intent creation against the timeout
      const paymentIntent = await Promise.race([
        paymentIntentPromise,
        timeoutPromise
      ]) as Stripe.PaymentIntent;
      
      // If we reach here, the request was successful - clean up the timeout
      cleanupTimeout();
      
      console.log(`[${requestId}] Payment intent created successfully: ${paymentIntent.id}`);
      return { paymentIntent };
    } catch (error) {
      // Always clean up the timeout
      cleanupTimeout();
      
      lastError = error;
      console.error(`[${requestId}] Payment intent error:`, error);
      
      // Determine if we should retry based on the error type
      const shouldRetry = attempt < MAX_RETRIES && (
        error.message?.includes("timeout") ||
        error.message?.includes("rate limited") ||
        error.message?.includes("network") ||
        error.message?.includes("connection") ||
        error.type === "StripeConnectionError" ||
        error.type === "StripeAPIError" ||
        error.code === "resource_missing"
      );
      
      if (shouldRetry) {
        attempt++;
        const delayMs = getBackoffDelay(attempt - 1);
        console.log(`[${requestId}] Retrying payment intent creation in ${delayMs}ms (attempt ${attempt}/${MAX_RETRIES})`);
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delayMs));
      } else {
        // We've exceeded retries or got a non-retryable error
        console.error(`[${requestId}] Giving up on payment intent creation after ${attempt} attempts:`, error);
        return { lastError };
      }
    } finally {
      // Always abort the controller to clean up any pending requests
      controller.abort("Request complete or timed out");
    }
  }
  
  // If we get here, we've exceeded the maximum retries
  return { lastError };
}
