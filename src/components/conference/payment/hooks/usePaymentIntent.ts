
import { useEffect, useCallback, useState } from "react";
import { usePaymentIntentState } from "./usePaymentIntentState";
import { usePaymentIntentTimeout } from "./usePaymentIntentTimeout";
import { createPaymentIntentRequest } from "../services/paymentIntentService";
import { PaymentIntentResponse } from "../types";

// Default timeout duration for payment processing
const PAYMENT_INTENT_TIMEOUT = 20000; // 20 seconds

interface UsePaymentIntentProps {
  ticketType: string;
  email: string;
  fullName: string;
  groupSize?: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

interface PaymentIntentError {
  message: string;
  code?: string;
}

/**
 * Custom hook for creating and managing payment intents
 * 
 * Handles:
 * - Payment intent creation via Supabase Edge Function
 * - Timeout handling and retry logic
 * - Error management and request deduplication
 * - Loading and error states
 */
export const usePaymentIntent = ({
  ticketType,
  email,
  fullName,
  groupSize,
  onSuccess,
  onError
}: UsePaymentIntentProps) => {
  // Use state management hook
  const {
    clientSecret,
    isLoading,
    amount,
    currency,
    isGroupRegistration,
    errorDetails,
    requestId,
    retryCount,
    safeSetLoading,
    safeSetErrorDetails,
    updatePaymentState,
    handleRetry,
    isMountedRef,
    isSuccessCalledRef,
    activeRequestRef
  } = usePaymentIntentState();
  
  // Use timeout management hook
  const { startTimeout, clearTimeout } = usePaymentIntentTimeout({
    timeoutDuration: PAYMENT_INTENT_TIMEOUT,
    onTimeout: () => {
      if (isMountedRef.current) {
        safeSetLoading(false);
        safeSetErrorDetails("The payment service took too long to respond. Please try again.");
        onError("Payment service timeout. Please try again later.");
      }
      activeRequestRef.current = false;
    }
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, [isMountedRef]);

  // Wrap createPaymentIntent in useCallback to avoid recreating on every render
  const createPaymentIntent = useCallback(async () => {
    // If a request is already in progress, don't start another one
    if (activeRequestRef.current) {
      console.log("Payment intent request already in progress, skipping duplicate request");
      return;
    }
    
    activeRequestRef.current = true;
    safeSetLoading(true);
    safeSetErrorDetails(null);
    
    // Generate a unique attempt ID for this specific attempt
    const attemptId = Date.now().toString();
    
    // Start timeout timer
    startTimeout();
    
    try {
      const { data, error } = await createPaymentIntentRequest(
        ticketType,
        email,
        fullName,
        groupSize,
        attemptId
      );
      
      // Clear the timeout since we got a response
      clearTimeout();
      
      if (!isMountedRef.current) {
        activeRequestRef.current = false;
        return;
      }
      
      if (error) {
        safeSetErrorDetails(`Error from payment service: ${error.message || "Unknown error"}`);
        onError(error.message || "Failed to initialize payment");
        activeRequestRef.current = false;
        return;
      }
      
      if (!data) {
        safeSetErrorDetails("No response from payment service");
        onError("Failed to initialize payment. No response from server.");
        activeRequestRef.current = false;
        return;
      }
      
      // Handle free tickets (speakers)
      if (data.freeTicket) {
        if (!isSuccessCalledRef.current) {
          isSuccessCalledRef.current = true;
          onSuccess();
        }
        activeRequestRef.current = false;
        return;
      }
      
      if (data.error) {
        console.error("Payment intent error:", data.error, "Details:", data.details);
        safeSetErrorDetails(data.details || data.error);
        onError(data.error);
        activeRequestRef.current = false;
        return;
      }
      
      if (data.clientSecret) {
        updatePaymentState(data);
      } else {
        console.error("No client secret in response:", data);
        safeSetErrorDetails("Payment initialization failed. No client secret received.");
        onError("Failed to initialize payment. Please try again.");
      }
    } catch (error) {
      // Clear the timeout
      clearTimeout();
      
      if (!isMountedRef.current) {
        activeRequestRef.current = false;
        return;
      }
      
      console.error("Error creating payment intent:", error);
      
      // Provide more specific error messages based on the error
      let errorMessage = "An unexpected error occurred";
      
      const err = error as Error;
      
      if (err.message?.includes('timeout')) {
        errorMessage = "The payment service took too long to respond. Please try again.";
      } else if (err.message?.includes('network')) {
        errorMessage = "A network error occurred. Please check your internet connection and try again.";
      } else if ((error as { code?: string }).code === 'AbortError') {
        errorMessage = "The request was cancelled. Please try again.";
      }
      
      safeSetErrorDetails(errorMessage);
      onError("Failed to initialize payment. " + errorMessage);
    } finally {
      safeSetLoading(false);
      activeRequestRef.current = false;
    }
  }, [
    ticketType, 
    email, 
    fullName, 
    groupSize, 
    onSuccess, 
    onError, 
    activeRequestRef, 
    safeSetLoading, 
    safeSetErrorDetails, 
    startTimeout, 
    clearTimeout, 
    isMountedRef, 
    isSuccessCalledRef, 
    updatePaymentState
  ]);

  // Create payment intent when the component loads or retryCount changes
  useEffect(() => {
    // Only execute if a payment intent doesn't already exist
    if (!clientSecret) {
      createPaymentIntent();
    }
  }, [createPaymentIntent, retryCount, clientSecret]);

  return {
    clientSecret,
    isLoading,
    amount,
    currency,
    isGroupRegistration,
    errorDetails,
    requestId,
    handleRetry
  };
};
