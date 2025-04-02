
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { clearExistingSessionData, generateUniqueSessionId } from '../services/sessionManagement';

/**
 * Custom hook to manage checkout session state
 * 
 * Provides functionality for:
 * - Managing loading and success states
 * - Tracking checkout completion
 * - Preventing duplicate callbacks
 * - Managing retry attempts
 * - Cleaning up session data
 */
export function useCheckoutState() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const successCalledRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const requestId = useRef<string | null>(generateUniqueSessionId()).current;
  const { toast } = useToast();

  // Reset state
  const resetCheckoutState = () => {
    setIsLoading(false);
    setIsCompleted(false);
    setError(null);
    setRetryCount(0);
    successCalledRef.current = false;
    
    // Abort any pending requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort("Reset requested");
      abortControllerRef.current = null;
    }
  };

  // Handle successful checkout
  const handleSuccess = () => {
    if (successCalledRef.current) return;
    
    successCalledRef.current = true;
    setIsLoading(false);
    setIsCompleted(true);
    
    // Display success toast
    toast({
      title: "Payment successful",
      description: "Your payment has been processed successfully.",
    });
    
    // Clear session data
    clearExistingSessionData();
  };

  // Handle checkout error
  const handleError = (errorMessage: string) => {
    setIsLoading(false);
    setError(errorMessage);
    
    // Display error toast
    toast({
      title: "Payment failed",
      description: errorMessage || "There was an issue processing your payment.",
      variant: "destructive",
    });
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      // If the component unmounts with no success or error, clean up
      if (!successCalledRef.current && !error) {
        clearExistingSessionData();
      }
      
      // Abort any pending requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort("Component unmounted");
        abortControllerRef.current = null;
      }
    };
  }, [error]);

  return {
    isLoading,
    setIsLoading,
    isCompleted,
    setIsCompleted,
    error,
    setError,
    retryCount,
    setRetryCount,
    requestId,
    abortControllerRef,
    resetCheckoutState,
    handleSuccess,
    handleError,
    successCalledRef
  };
}
