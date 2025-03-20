
import { useEffect } from "react";
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

  // Create payment intent when the component loads or retryCount changes
  useEffect(() => {
    // Only execute if a payment intent doesn't already exist
    if (!clientSecret && !activeRequestRef.current) {
      console.log("Initiating payment intent creation, retryCount:", retryCount);
      initiatePaymentIntent(ticketType, email, fullName, groupSize);
    }
  }, [retryCount, clientSecret]); // Minimal dependencies

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
