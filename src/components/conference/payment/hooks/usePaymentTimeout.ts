
import { useRef, useEffect } from 'react';

/**
 * Custom hook for managing payment processing timeouts
 * 
 * Provides a way to set a timeout for payment processing:
 * - Automatically cleans up on unmount
 * - Prevents memory leaks
 * - Explicitly uses window.setTimeout for browser compatibility
 * 
 * @param timeoutDuration - Timeout duration in milliseconds
 * @param onTimeout - Callback function to execute when timeout occurs
 * @returns Functions to control the timeout
 */
export const usePaymentTimeout = (
  timeoutDuration: number,
  onTimeout: () => void
) => {
  const timeoutIdRef = useRef<number | null>(null);
  const isMountedRef = useRef(true);
  
  // Setup cleanup on component unmount
  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
      if (timeoutIdRef.current !== null) {
        window.clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);
  
  // Start a new timeout
  const startTimeout = () => {
    // Clear existing timeout if one exists
    if (timeoutIdRef.current !== null) {
      window.clearTimeout(timeoutIdRef.current);
    }
    
    // Set new timeout
    timeoutIdRef.current = window.setTimeout(() => {
      // Only execute callback if component is still mounted
      if (isMountedRef.current) {
        onTimeout();
      }
      timeoutIdRef.current = null;
    }, timeoutDuration);
  };
  
  // Clear the current timeout
  const clearTimeout = () => {
    if (timeoutIdRef.current !== null) {
      window.clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  };
  
  return {
    startTimeout,
    clearTimeout,
    isMountedRef
  };
};
