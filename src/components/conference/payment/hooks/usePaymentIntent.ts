
import { useEffect, useState } from "react";
import { usePaymentIntentState } from "./usePaymentIntentState";
import { usePaymentIntentTimeout } from "./usePaymentIntentTimeout";
import { createPaymentIntentRequest } from "../services/paymentIntentService";
import { PaymentIntentResponse } from "../types";

// Default timeout duration for payment processing
const PAYMENT_INTENT_TIMEOUT = 20000; // 20 seconds
// Minimum time between payment intent creation attempts (ms)
const REQUEST_DEBOUNCE_TIME = 2000; // 2 seconds

interface UsePaymentIntentProps {
  ticketType: string;
  email: string;
  fullName: string;
  groupSize?: number;
  onSuccess: () => void;
  onError: (error: string) => void;
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
  
  // Track last request timestamp to prevent rapid sequential requests
  const [lastRequestTime, setLastRequestTime] = useState<number>(0);
  
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
      clearTimeout();
    };
  }, [isMountedRef, clearTimeout]);

  /**
   * Create payment intent - moved outside of useCallback to prevent recreation
   */
  const createPaymentIntent = async () => {
    // If a request is already in progress, don't start another one
    if (activeRequestRef.current) {
      console.log("Payment intent request already in progress, skipping duplicate request");
      return;
    }
    
    // Check if we're trying to make requests too quickly
    const now = Date.now();
    if (now - lastRequestTime < REQUEST_DEBOUNCE_TIME) {
      console.log(`Request debounced: Last request was ${now - lastRequestTime}ms ago`);
      return;
    }
    
    // Set last request time to now
    setLastRequestTime(now);
    
    // Update request state
    activeRequestRef.current = true;
    safeSetLoading(true);
    safeSetErrorDetails(null);
    
    // Generate a unique attempt ID for this specific attempt
    const attemptId = `${now}-${Math.random().toString(36).substring(2, 9)}`;
    console.log(`Creating payment intent, attemptId: ${attemptId}`);
    
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
        console.log(`Component unmounted during request, attemptId: ${attemptId}`);
        activeRequestRef.current = false;
        return;
      }
      
      if (error) {
        console.error(`Payment intent error, attemptId: ${attemptId}`, error);
        safeSetErrorDetails(`Error from payment service: ${error.message || "Unknown error"}`);
        onError(error.message || "Failed to initialize payment");
        activeRequestRef.current = false;
        return;
      }
      
      if (!data) {
        console.error(`No response data, attemptId: ${attemptId}`);
        safeSetErrorDetails("No response from payment service");
        onError("Failed to initialize payment. No response from server.");
        activeRequestRef.current = false;
        return;
      }
      
      console.log(`Payment intent response received, attemptId: ${attemptId}`, data);
      
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
        console.error(`Payment intent service error, attemptId: ${attemptId}`, data.error, data.details);
        safeSetErrorDetails(data.details || data.error);
        onError(data.error);
        activeRequestRef.current = false;
        return;
      }
      
      if (data.clientSecret) {
        console.log(`Payment intent created successfully, attemptId: ${attemptId}`);
        updatePaymentState(data);
      } else {
        console.error(`No client secret in response, attemptId: ${attemptId}`, data);
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
      
      console.error(`Error creating payment intent, attemptId: ${attemptId}`, error);
      
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
      if (isMountedRef.current) {
        safeSetLoading(false);
      }
      // Use a small delay before setting activeRequest to false to prevent race conditions
      setTimeout(() => {
        activeRequestRef.current = false;
      }, 100);
    }
  };

  // Create payment intent when the component loads or retryCount changes
  // Simplified dependency array to prevent unnecessary re-runs
  useEffect(() => {
    // Only execute if a payment intent doesn't already exist
    if (!clientSecret && !activeRequestRef.current) {
      console.log("Initiating payment intent creation, retryCount:", retryCount);
      createPaymentIntent();
    }
  }, [retryCount, clientSecret]); // Minimal dependencies

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
