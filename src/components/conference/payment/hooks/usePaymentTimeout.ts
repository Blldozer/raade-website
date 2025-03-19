
import { useRef, useEffect } from "react";

/**
 * Custom hook to manage payment timeouts
 * 
 * Sets up and manages timeouts for payment processing:
 * - Creates timeout for payment operations
 * - Handles cleanup on unmount
 * - Provides functions to start, clear, and reset timeouts
 * 
 * @param timeoutDuration - Duration in milliseconds before timeout
 * @param onTimeout - Callback function to execute when timeout occurs
 */
export const usePaymentTimeout = (
  timeoutDuration: number,
  onTimeout: () => void
) => {
  // Track the current payment timeout
  const timeoutRef = useRef<number | null>(null);
  // Track if component is mounted
  const isMountedRef = useRef(true);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      // Clear any pending timeouts
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startTimeout = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    
    // Set a new timeout
    const timeoutId = setTimeout(() => {
      if (isMountedRef.current) {
        console.warn("Payment processing timed out after", timeoutDuration, "ms");
        onTimeout();
      }
    }, timeoutDuration);
    
    timeoutRef.current = timeoutId as unknown as number;
  };

  const clearPaymentTimeout = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return {
    startTimeout,
    clearTimeout: clearPaymentTimeout,
    isMountedRef
  };
};
