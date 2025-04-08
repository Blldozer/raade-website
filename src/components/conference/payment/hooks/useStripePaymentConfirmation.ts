
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
  getClientSecret: () => string | null;
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
  getClientSecret,
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
    email,
    getClientSecret
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
      console.error('Stripe not initialized!', { stripe: !!stripe, elements: !!elements });
      return { success: false, reason: "stripe-not-loaded" };
    }

    if (isProcessing) {
      console.log("Payment already processing, ignoring duplicate submission");
      return { success: false, reason: "already-processing" };
    }

    const clientSecret = getClientSecret();
    if (!clientSecret) {
      console.error('Missing client secret for payment confirmation!');
      reportError("Payment system configuration error. Please try again.");
      return { success: false, reason: "missing-client-secret" };
    }

    console.log(`Starting payment confirmation process (${requestId || 'unknown'})`);
    startTimeout();

    try {
      const result = await processPaymentConfirmation();
      
      // Clear the timeout since we got a response
      clearTimeout();
      
      if (!isMountedRef.current) {
        console.log('Component unmounted during payment processing, abandoning');
        return { success: false, reason: "unmounted" };
      }

      // Handle the result based on its success status
      if (result.success && result.paymentIntent) {
        console.log(`Payment confirmation successful (${requestId || 'unknown'})`);
        handleSuccess(result.paymentIntent);
        return result;
      } else {
        // Handle different error cases
        if (result.reason === "payment-error" && result.error) {
          console.error(`Payment error (${requestId || 'unknown'}):`, result.error);
          handleError(result.error);
        } else if (result.reason === "requires-action" && result.paymentIntent) {
          console.log(`Payment requires action (${requestId || 'unknown'}):`, result.paymentIntent.status);
          handlePaymentStatus(result.paymentIntent.status || "unknown");
        } else {
          console.error(`Payment failed (${requestId || 'unknown'}):`, result.reason);
          setMessage("Something went wrong with your payment. Please try again.");
          reportError("Payment failed: " + (result.reason || "Unknown reason"));
        }
        
        return result;
      }
    } catch (unexpectedError) {
      // Clear the timeout
      clearTimeout();
      
      if (!isMountedRef.current) {
        console.log('Component unmounted during error handling, abandoning');
        return { success: false, reason: "unmounted" };
      }
      
      const error = unexpectedError instanceof Error ? 
        unexpectedError : 
        new Error(String(unexpectedError));
      
      console.error(`Unexpected payment error (${requestId || 'unknown'}):`, error);  
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
      console.log(`Payment confirmation component unmounting (${requestId || 'unknown'})`);
    };
  }, []);

  return {
    isProcessing,
    handleConfirmPayment,
    successCalledRef
  };
};
