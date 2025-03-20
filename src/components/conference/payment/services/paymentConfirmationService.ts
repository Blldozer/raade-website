
import { Stripe, StripeElements, StripePaymentElementOptions, PaymentIntent, StripeError } from "@stripe/stripe-js";

/**
 * Service for confirming Stripe payments
 * 
 * Handles the actual payment confirmation process with Stripe
 * Separated from UI logic for better testability and reuse
 * 
 * @param stripe - Stripe instance
 * @param elements - Stripe elements
 * @param email - Customer email for payment receipt
 * @returns Promise with the payment confirmation result
 */
export const confirmStripePayment = async (
  stripe: Stripe,
  elements: StripeElements,
  email: string
): Promise<{error?: StripeError; paymentIntent?: PaymentIntent}> => {
  // Make sure CardElement is populated with customer payment information
  if (!elements.getElement("card")) {
    throw new Error("Card element not found");
  }
  
  // Confirm payment with Stripe using CardElement data
  return stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: window.location.href,
      receipt_email: email,
      payment_method_data: {
        billing_details: { email }
      }
    },
    redirect: "if_required"
  });
};
