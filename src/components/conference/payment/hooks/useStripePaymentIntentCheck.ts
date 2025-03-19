
import { useEffect, useRef } from "react";
import { Stripe } from "@stripe/stripe-js";

/**
 * Custom hook to check payment intent status from URL parameters
 * 
 * Examines URL for payment_intent_client_secret parameter and
 * checks payment status with Stripe to handle return redirect flows
 * 
 * @param stripe - Stripe instance
 * @param onPaymentSuccess - Callback when payment is successful 
 * @param onPaymentProcessing - Callback when payment is processing
 * @param onPaymentFailure - Callback when payment fails
 * @param isMountedRef - Reference to check if component is still mounted
 */
export const useStripePaymentIntentCheck = (
  stripe: Stripe | null,
  onPaymentSuccess: () => void,
  onPaymentProcessing: () => void, 
  onPaymentFailure: (message: string) => void,
  isMountedRef: React.MutableRefObject<boolean>,
  successCalledRef: React.MutableRefObject<boolean>
) => {
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    // When returning from a redirect, check payment status
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!isMountedRef.current) return;
      
      switch (paymentIntent?.status) {
        case "succeeded":
          if (!successCalledRef.current) {
            successCalledRef.current = true;
            onPaymentSuccess();
          }
          break;
        case "processing":
          onPaymentProcessing();
          break;
        case "requires_payment_method":
          onPaymentFailure("Your payment was not successful, please try again.");
          break;
        default:
          onPaymentFailure("Something went wrong.");
          break;
      }
    });
  }, [stripe, onPaymentSuccess, onPaymentProcessing, onPaymentFailure, isMountedRef, successCalledRef]);
};
