
import { useState, useRef } from "react";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { usePaymentErrorHandling } from "./usePaymentErrorHandling";
import { usePaymentTimeout } from "./usePaymentTimeout";

// Default timeout duration for payment processing
const PAYMENT_PROCESSING_TIMEOUT = 30000; // 30 seconds

interface UseStripePaymentConfirmationProps {
  stripe: Stripe | null;
  elements: StripeElements | null;
  email: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  setMessage: (message: string | null) => void;
  requestId?: string | null;
}

/**
 * Custom hook to handle Stripe payment confirmation
 * 
 * Manages the confirmation process for Stripe payments:
 * - Provides handleConfirmPayment function to process payments
 * - Handles errors and timeouts
 * - Ensures success/error callbacks are only called once
 * - Manages processing state throughout the payment flow
 */
export const useStripePaymentConfirmation = ({
  stripe,
  elements,
  email,
  onSuccess,
  onError,
  setMessage,
  requestId
}: UseStripePaymentConfirmationProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Track if success callback has been fired to prevent duplicates
  const successCalledRef = useRef(false);

  // Set up error handling
  const { handleError, errorCalledRef } = usePaymentErrorHandling(onError, requestId);
  
  // Set up timeout handling
  const { startTimeout, clearTimeout, isMountedRef } = usePaymentTimeout(
    PAYMENT_PROCESSING_TIMEOUT,
    () => {
      if (isMountedRef.current) {
        setMessage("The payment is taking longer than expected. Please check your card details and try again.");
        setIsProcessing(false);
        
        if (!errorCalledRef.current) {
          handleError("Payment processing timed out. Please try again with a different payment method.");
        }
      }
    }
  );

  const handleConfirmPayment = async () => {
    if (!stripe || !elements) {
      return { success: false, reason: "stripe-not-loaded" };
    }

    if (isProcessing) {
      console.log("Payment already processing, ignoring duplicate submission");
      return { success: false, reason: "already-processing" };
    }

    setIsProcessing(true);
    startTimeout();

    try {
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
      
      // Clear the timeout since we got a response
      clearTimeout();
      
      if (!isMountedRef.current) return { success: false, reason: "unmounted" };

      if (error) {
        // This point will only be reached if there's an immediate error when confirming the payment.
        console.error("Payment error:", error.type, error.message);
        
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message || "An unexpected error occurred");
          handleError(error.message || "An unexpected error occurred");
        } else {
          const errorMessage = `Payment error (${error.type}): ${error.message}`;
          console.error(errorMessage);
          setMessage("An unexpected error occurred");
          handleError(errorMessage);
        }
        
        return { success: false, reason: "payment-error", error };
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // The payment has been processed!
        setMessage("Payment succeeded!");
        
        if (!successCalledRef.current) {
          successCalledRef.current = true;
          onSuccess();
        }
        
        return { success: true, paymentIntent };
      } else if (paymentIntent) {
        // Payment requires additional actions or is in another state
        console.log("Payment intent is in state:", paymentIntent.status);
        switch (paymentIntent.status) {
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          case "requires_action":
            setMessage("Additional verification required. Please follow the prompts.");
            break;
          default:
            setMessage(`Payment status: ${paymentIntent.status}`);
        }
        
        return { success: false, reason: "requires-action", paymentIntent };
      } else {
        // Shouldn't normally get here
        console.warn("No payment intent or error returned");
        setMessage("Something went wrong with your payment. Please try again.");
        
        handleError("Payment failed: No payment confirmation received");
        return { success: false, reason: "no-response" };
      }
    } catch (unexpectedError) {
      // Clear the timeout
      clearTimeout();
      
      if (!isMountedRef.current) return { success: false, reason: "unmounted" };
      
      console.error("Unexpected error during payment:", unexpectedError);
      setMessage("An unexpected error occurred during payment processing");
      
      handleError(unexpectedError instanceof Error ? 
        unexpectedError.message : 
        "An unexpected error occurred: Unknown error");
      
      return { success: false, reason: "unexpected-error", error: unexpectedError };
    } finally {
      if (isMountedRef.current) {
        setIsProcessing(false);
      }
    }
  };

  return {
    isProcessing,
    handleConfirmPayment,
    successCalledRef
  };
};
