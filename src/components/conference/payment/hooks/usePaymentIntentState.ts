
import { useState, useRef } from "react";

/**
 * Custom hook to manage payment intent state
 * 
 * Centralizes the state management for payment intents
 * and provides helper functions for updating that state
 */
export const usePaymentIntentState = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [isGroupRegistration, setIsGroupRegistration] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  // Use refs to track component mount state and callback flags
  const isMountedRef = useRef(true);
  const isSuccessCalledRef = useRef(false);
  const activeRequestRef = useRef(false);
  
  // Update payment state with successful response data
  const updatePaymentState = (data: any) => {
    if (isMountedRef.current) {
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setAmount(data.amount);
        setCurrency(data.currency);
        setIsGroupRegistration(data.isGroupRegistration || false);
      }
      
      if (data.requestId) {
        setRequestId(data.requestId);
      }
    }
  };
  
  // Reset state for a new payment intent attempt
  const handleRetry = () => {
    // Reset client secret to force a new payment intent creation
    setClientSecret("");
    setRetryCount(prev => prev + 1);
  };
  
  // Set loading state (only if component is mounted)
  const safeSetLoading = (loading: boolean) => {
    if (isMountedRef.current) {
      setIsLoading(loading);
    }
  };
  
  // Set error details (only if component is mounted)
  const safeSetErrorDetails = (error: string | null) => {
    if (isMountedRef.current) {
      setErrorDetails(error);
    }
  };
  
  return {
    // State values
    clientSecret,
    isLoading,
    amount,
    currency,
    isGroupRegistration,
    errorDetails,
    requestId,
    retryCount,
    
    // State setters
    setClientSecret,
    safeSetLoading,
    safeSetErrorDetails,
    updatePaymentState,
    handleRetry,
    
    // Refs
    isMountedRef,
    isSuccessCalledRef,
    activeRequestRef
  };
};
