
import { useRef, useEffect } from "react";

/**
 * Custom hook to handle payment timeouts
 * 
 * Manages timeout state and cleanup for payment processing
 * 
 * @param timeout - Timeout duration in milliseconds
 * @param onTimeout - Callback function when timeout occurs
 */
export const usePaymentTimeout = (
  timeout: number,
  onTimeout: () => void
) => {
  const timeoutRef = useRef<number | null>(null);
  const isMountedRef = useRef(true);

  // Start a new timeout
  const startTimeout = () => {
    // Clear any existing timeout first
    clearTimeoutRef();
    
    // Set a new timeout
    timeoutRef.current = window.setTimeout(() => {
      if (isMountedRef.current) {
        onTimeout();
      }
    }, timeout);
  };

  // Clear the current timeout
  const clearTimeoutRef = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      clearTimeoutRef();
    };
  }, []);

  return {
    startTimeout,
    clearTimeout: clearTimeoutRef,
    isMountedRef
  };
};
