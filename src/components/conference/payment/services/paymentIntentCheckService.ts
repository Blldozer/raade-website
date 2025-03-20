
import { Stripe, PaymentIntentResult } from "@stripe/stripe-js";

/**
 * Service for checking payment intent status
 * 
 * Handles retrieval and checking of payment intent from URL parameters
 * Provides a clean abstraction for payment status checking
 * 
 * @param stripe - Stripe instance
 * @param clientSecret - The payment intent client secret
 * @returns Promise with the payment intent status check result
 */
export const retrievePaymentIntentFromUrl = (): string | null => {
  return new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );
};

/**
 * Retrieves and checks a payment intent with Stripe
 * 
 * @param stripe - Stripe instance
 * @param clientSecret - The client secret from URL
 * @returns Promise with the payment intent
 */
export const retrieveAndCheckPaymentIntent = async (
  stripe: Stripe,
  clientSecret: string
): Promise<PaymentIntentResult> => {
  try {
    const result = await stripe.retrievePaymentIntent(clientSecret);
    return result;
  } catch (error) {
    console.error("Error retrieving payment intent:", error);
    throw error;
  }
};
