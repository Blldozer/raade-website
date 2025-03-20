
import { useRef, useEffect } from "react";

/**
 * Custom hook to manage payment intent creation timeouts
 * 
 * Provides timeout management for async operations:
 * - Sets a timeout for payment intent creation
 * - Provides cleanup functionality
 * - Tracks component mount state
 * 
 * @param timeoutDuration - Duration in ms before timeout
 * @param onTimeout - Callback function when timeout occurs
 */
export const usePaymentIntentTimeout = ({
  timeoutDuration,
  onTimeout
}: {
  timeoutDuration: number;
  onTimeout: () => void;
}) => {
  // Use a ref to store the timeout ID for cleanup
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Track if the component is still mounted
  const isMountedRef = useRef<boolean>(true);

  // Clear the timeout on unmount
  useEffect(() => {
    return () => {
      // Mark component as unmounted
      isMountedRef.current = false;
      
      // Clear any existing timeout
      if (timeoutRef.current) {
        global.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  // Start a new timeout
  const startTimeout = () => {
    // Clear any existing timeout first
    if (timeoutRef.current) {
      global.clearTimeout(timeoutRef.current);
    }
    
    // Set a new timeout
    timeoutRef.current = setTimeout(() => {
      // Only call onTimeout if the component is still mounted
      if (isMountedRef.current) {
        onTimeout();
      }
      timeoutRef.current = null;
    }, timeoutDuration);
  };

  // Clear the current timeout
  const clearTimeoutRef = () => {
    if (timeoutRef.current) {
      global.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return {
    startTimeout,
    clearTimeout: clearTimeoutRef,
    isMountedRef
  };
};
