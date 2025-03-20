
import { useEffect } from "react";
import { Stripe } from "@stripe/stripe-js";
import { retrievePaymentIntentFromUrl, retrieveAndCheckPaymentIntent } from "../services/paymentIntentCheckService";
import { usePaymentIntentStatus } from "./usePaymentIntentStatus";

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
 * @param successCalledRef - Reference to track if success callback was already called
 */
export const useStripePaymentIntentCheck = (
  stripe: Stripe | null,
  onPaymentSuccess: () => void,
  onPaymentProcessing: () => void, 
  onPaymentFailure: (message: string) => void,
  isMountedRef: React.MutableRefObject<boolean>,
  successCalledRef: React.MutableRefObject<boolean>
) => {
  // Use the payment status handler hook
  const { handlePaymentStatus } = usePaymentIntentStatus(
    onPaymentSuccess,
    onPaymentProcessing,
    onPaymentFailure,
    successCalledRef
  );

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Get client secret from URL if present
    const clientSecret = retrievePaymentIntentFromUrl();

    if (!clientSecret) {
      return;
    }

    // When returning from a redirect, check payment status
    retrieveAndCheckPaymentIntent(stripe, clientSecret).then(({ paymentIntent }) => {
      if (!isMountedRef.current) return;
      
      // Handle the payment intent status
      handlePaymentStatus(paymentIntent?.status);
    }).catch(error => {
      if (!isMountedRef.current) return;
      
      console.error("Error checking payment intent:", error);
      onPaymentFailure("Error retrieving payment status. Please contact support.");
    });
  }, [stripe, onPaymentSuccess, onPaymentProcessing, onPaymentFailure, isMountedRef, successCalledRef, handlePaymentStatus]);
};
