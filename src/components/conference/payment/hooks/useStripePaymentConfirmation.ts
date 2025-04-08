
import { useState, useEffect } from "react";
import { Stripe, StripeElements, PaymentIntent, StripeError } from "@stripe/stripe-js";
import { usePaymentErrorHandling } from "./usePaymentErrorHandling";
import { usePaymentTimeout } from "./usePaymentTimeout";
import { usePaymentConfirmationState } from "./usePaymentConfirmationState";
import { usePaymentConfirmationCallbacks } from "./usePaymentConfirmationCallbacks";
import { useProcessPaymentConfirmation, PaymentConfirmationResult } from "./useProcessPaymentConfirmation";

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
  // Get payment confirmation state
  const { 
    isMountedRef, 
    successCalledRef 
  } = usePaymentConfirmationState();
  
  // Set up error handling
  const { handleError: reportError } = usePaymentErrorHandling(onError, requestId);
  
  // Set up callback handlers
  const { 
    handleSuccess, 
    handleError, 
    handlePaymentStatus 
  } = usePaymentConfirmationCallbacks({
    onSuccess,
    onError,
    setMessage,
    requestId
  });
  
  // Set up payment confirmation processor
  const { 
    isProcessing, 
    processPaymentConfirmation 
  } = useProcessPaymentConfirmation({
    stripe,
    elements,
    email
  });
  
  // Set up timeout handling
  const { startTimeout, clearTimeout } = usePaymentTimeout(
    PAYMENT_PROCESSING_TIMEOUT,
    () => {
      if (isMountedRef.current) {
        setMessage("The payment is taking longer than expected. Please check your card details and try again.");
        
        if (!successCalledRef.current) {
          reportError("Payment processing timed out. Please try again with a different payment method.");
        }
      }
    }
  );

  /**
   * Handle payment confirmation
   * Initiates the payment confirmation process and handles the result
   */
  const handleConfirmPayment = async () => {
    if (!stripe || !elements) {
      return { success: false, reason: "stripe-not-loaded" };
    }

    if (isProcessing) {
      console.log("Payment already processing, ignoring duplicate submission");
      return { success: false, reason: "already-processing" };
    }

    startTimeout();

    try {
      const result = await processPaymentConfirmation();
      
      // Clear the timeout since we got a response
      clearTimeout();
      
      if (!isMountedRef.current) return { success: false, reason: "unmounted" };

      // Handle the result based on its success status
      if (result.success && result.paymentIntent) {
        handleSuccess(result.paymentIntent);
        return result;
      } else {
        // Handle different error cases
        if (result.reason === "payment-error" && result.error) {
          handleError(result.error);
        } else if (result.reason === "requires-action" && result.paymentIntent) {
          handlePaymentStatus(result.paymentIntent.status || "unknown");
        } else {
          setMessage("Something went wrong with your payment. Please try again.");
          reportError("Payment failed: " + (result.reason || "Unknown reason"));
        }
        
        return result;
      }
    } catch (unexpectedError) {
      // Clear the timeout
      clearTimeout();
      
      if (!isMountedRef.current) return { success: false, reason: "unmounted" };
      
      const error = unexpectedError instanceof Error ? 
        unexpectedError : 
        new Error(String(unexpectedError));
        
      handleError(error);
      
      return { 
        success: false, 
        reason: "unexpected-error",
        error
      };
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return {
    isProcessing,
    handleConfirmPayment,
    successCalledRef
  };
};
