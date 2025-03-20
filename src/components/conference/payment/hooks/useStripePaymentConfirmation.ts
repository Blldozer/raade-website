
import { useState, useRef } from "react";
import { Stripe, StripeElements, PaymentIntent, StripeError } from "@stripe/stripe-js";
import { usePaymentErrorHandling } from "./usePaymentErrorHandling";
import { usePaymentTimeout } from "./usePaymentTimeout";
import { confirmStripePayment } from "../services/paymentConfirmationService";
import { usePaymentResultHandler } from "./usePaymentResultHandler";
import { PaymentResult } from "../types";

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

type PaymentConfirmationResult = {
  success: boolean;
  reason?: string;
  paymentIntent?: PaymentIntent;
  error?: StripeError | Error;
};

/**
 * Custom hook to handle Stripe payment confirmation
 * 
 * Coordinates the payment confirmation process:
 * - Manages processing state
 * - Handles timeouts
 * - Processes payment results
 * - Ensures callbacks are only called once
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
  const successCalledRef = useRef<boolean>(false);

  // Set up error handling
  const { handleError, errorCalledRef } = usePaymentErrorHandling(onError, requestId);
  
  // Set up result handler
  const { handleSuccess: handleSuccessMessage, handleError: handleErrorMessage, handlePaymentStatus } = 
    usePaymentResultHandler(setMessage);
  
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

  const handleConfirmPayment = async (): Promise<PaymentConfirmationResult> => {
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
      const { error, paymentIntent } = await confirmStripePayment(stripe, elements, email);
      
      // Clear the timeout since we got a response
      clearTimeout();
      
      if (!isMountedRef.current) return { success: false, reason: "unmounted" };

      if (error) {
        // This point will only be reached if there's an immediate error when confirming the payment.
        console.error("Payment error:", error.type, error.message);
        
        handleErrorMessage(error);
        handleError(error.message || "An unexpected error occurred");
        
        return { success: false, reason: "payment-error", error };
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // The payment has been processed!
        handleSuccessMessage();
        
        if (!successCalledRef.current) {
          successCalledRef.current = true;
          onSuccess();
        }
        
        return { success: true, paymentIntent };
      } else if (paymentIntent) {
        // Payment requires additional actions or is in another state
        console.log("Payment intent is in state:", paymentIntent.status);
        handlePaymentStatus(paymentIntent.status);
        
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
      
      const errorMessage = unexpectedError instanceof Error ? 
        unexpectedError.message : 
        "An unexpected error occurred: Unknown error";
        
      handleError(errorMessage);
      
      return { 
        success: false, 
        reason: "unexpected-error", 
        error: unexpectedError instanceof Error ? unexpectedError : new Error(String(unexpectedError))
      };
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
