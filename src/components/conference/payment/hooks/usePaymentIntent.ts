
import { useState, useEffect, useRef } from "react";
import { usePaymentIntentState } from "./usePaymentIntentState";
import { usePaymentIntentFlow } from "./usePaymentIntentFlow";

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
 * - Browser tab focus/blur detection for auto-retry
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
  
  // Use payment intent flow hook
  const { initiatePaymentIntent } = usePaymentIntentFlow(
    isMountedRef,
    activeRequestRef,
    safeSetLoading,
    safeSetErrorDetails,
    updatePaymentState,
    isSuccessCalledRef,
    onSuccess,
    onError
  );

  // Track initialization status
  const [isInitialized, setIsInitialized] = useState(false);
  const initAttemptsRef = useRef(0);
  
  // Create payment intent when the component loads or retryCount changes
  useEffect(() => {
    // Only execute if a payment intent doesn't already exist
    if (!clientSecret && !activeRequestRef.current && !isInitialized) {
      console.log("Initiating payment intent creation, retryCount:", retryCount);
      
      // Mark as initialized to prevent duplicate requests on mount
      setIsInitialized(true);
      
      // Track initialization attempt
      initAttemptsRef.current += 1;
      
      // Create a unique attempt ID
      const attemptId = `init-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      
      // Initiate the payment intent with short delay to ensure DOM is ready
      setTimeout(() => {
        initiatePaymentIntent(ticketType, email, fullName, groupSize);
      }, 100);
    }
  }, [retryCount]); // Minimal dependencies for controlled execution

  // Listen for tab focus events to auto-retry failed requests
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && errorDetails && !clientSecret) {
        console.log("Tab became visible with errors present, auto-retrying payment intent");
        handleRetry();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [errorDetails, clientSecret, handleRetry]);

  // Return the necessary state and functions
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
