
import { Stripe, StripeElements } from "@stripe/stripe-js";

/**
 * Handles the core payment confirmation process through Stripe
 * 
 * Makes the actual API call to Stripe to confirm the payment
 * and processes the response
 * 
 * @param stripe - Stripe instance
 * @param elements - Stripe Elements instance
 * @param email - Customer email for receipt
 * @returns Object containing success status and other relevant data
 */
export const confirmStripePayment = async (
  stripe: Stripe,
  elements: StripeElements,
  email: string
) => {
  console.log("Starting payment confirmation...");
  
  const { error, paymentIntent } = await stripe.confirmPayment({
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
  
  return { error, paymentIntent };
};
