
import { useRef } from "react";

interface PaymentIntentTimeoutHookProps {
  timeoutDuration: number;
  onTimeout: (errorMessage: string) => void;
}

/**
 * Custom hook to handle payment intent timeout management
 * 
 * Provides functions for setting, clearing, and handling payment intent timeouts
 * Cleans up timeouts on unmount to prevent memory leaks
 * 
 * @param timeoutDuration - Time in milliseconds before timeout occurs
 * @param onTimeout - Callback function when timeout is triggered
 */
export const usePaymentIntentTimeout = ({
  timeoutDuration,
  onTimeout
}: PaymentIntentTimeoutHookProps) => {
  // Use ref to track the timeout ID
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Set a timeout for the payment intent creation
  const startTimeout = () => {
    // Clear any existing timeout first
    if (timeoutRef.current) {
      clearTimeoutRef();
    }
    
    timeoutRef.current = setTimeout(() => {
      onTimeout(`Payment intent request timed out after ${timeoutDuration}ms`);
    }, timeoutDuration);
  };
  
  // Clear the payment timeout
  const clearTimeoutRef = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  
  return {
    startTimeout,
    clearTimeout: clearTimeoutRef,
  };
};
