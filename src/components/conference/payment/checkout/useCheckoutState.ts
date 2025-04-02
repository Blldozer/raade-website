
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { clearExistingSessionData } from '../services/sessionManagement';

/**
 * Custom hook to manage checkout session state
 * 
 * Provides functionality for:
 * - Managing loading and success states
 * - Tracking checkout completion
 * - Preventing duplicate callbacks
 * - Cleaning up session data
 */
export function useCheckoutState() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const successCalledRef = useRef(false);
  const { toast } = useToast();

  // Reset state
  const resetCheckoutState = () => {
    setIsLoading(false);
    setIsCompleted(false);
    setError(null);
    successCalledRef.current = false;
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
      variant: "default",
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
    };
  }, [error]);

  return {
    isLoading,
    setIsLoading,
    isCompleted,
    setIsCompleted,
    error,
    setError,
    resetCheckoutState,
    handleSuccess,
    handleError,
    successCalledRef
  };
}
