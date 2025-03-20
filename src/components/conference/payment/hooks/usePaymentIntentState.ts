
import { useState, useRef } from "react";
import { PaymentIntentState, PaymentIntentResponse } from "../types";

/**
 * Custom hook to manage payment intent state
 * 
 * Centralizes the state management for payment intents
 * and provides helper functions for updating that state
 */
export const usePaymentIntentState = () => {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("USD");
  const [isGroupRegistration, setIsGroupRegistration] = useState<boolean>(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  
  // Use refs to track component mount state and callback flags
  const isMountedRef = useRef<boolean>(true);
  const isSuccessCalledRef = useRef<boolean>(false);
  const activeRequestRef = useRef<boolean>(false);
  
  // Update payment state with successful response data
  const updatePaymentState = (data: PaymentIntentResponse) => {
    if (isMountedRef.current) {
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        
        if (data.amount !== undefined) {
          setAmount(data.amount);
        }
        
        if (data.currency) {
          setCurrency(data.currency);
        }
        
        setIsGroupRegistration(data.isGroupRegistration || false);
      }
      
      if (data.requestId) {
        setRequestId(data.requestId);
      }
      
      // Mark request as complete
      activeRequestRef.current = false;
    }
  };
  
  // Reset state for a new payment intent attempt
  const handleRetry = () => {
    // Reset client secret to force a new payment intent creation
    setClientSecret("");
    // Clear any previous errors
    setErrorDetails(null);
    // Ensure active request flag is reset
    activeRequestRef.current = false;
    // Increment retry counter to trigger useEffect
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
