
import { Stripe } from "@stripe/stripe-js";

/**
 * Get payment intent client secret from URL parameters
 * 
 * Looks for the payment_intent_client_secret parameter in the URL
 * which is added when returning from a redirect flow
 * 
 * @returns The client secret string or null if not found
 */
export const retrievePaymentIntentFromUrl = (): string | null => {
  // Get payment_intent_client_secret from URL query params
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('payment_intent_client_secret');
};

/**
 * Retrieve and check payment intent status with Stripe
 * 
 * Calls the Stripe API to get the current status of a payment intent
 * 
 * @param stripe - Stripe instance
 * @param clientSecret - Client secret for the payment intent
 * @returns The result of the retrieval operation
 */
export const retrieveAndCheckPaymentIntent = async (stripe: Stripe, clientSecret: string) => {
  return stripe.retrievePaymentIntent(clientSecret);
};
