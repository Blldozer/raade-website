import { useState } from "react";

// Minimum time between payment intent creation attempts (ms)
const REQUEST_DEBOUNCE_TIME = 2000; // 2 seconds

/**
 * Custom hook to handle debouncing of payment intent creation requests
 * 
 * Prevents multiple rapid payment intent creation requests by
 * tracking the timestamp of the last request and enforcing a minimum delay
 * 
 * @returns Functions and state for request debouncing
 */
export const usePaymentIntentDebounce = () => {
  // Track last request timestamp to prevent rapid sequential requests
  const [lastRequestTime, setLastRequestTime] = useState<number>(0);

  /**
   * Check if a request should be debounced
   * @returns False if request should proceed, or timestamp (number) if it should be debounced
   */
  const shouldDebounceRequest = (): false | number => {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    
    // If enough time has passed, allow the request (return false)
    if (timeSinceLastRequest >= REQUEST_DEBOUNCE_TIME) {
      return false;
    }
    
    // Otherwise return the timestamp of the last request
    return lastRequestTime;
  };

  /**
   * Update the last request timestamp to now
   */
  const updateRequestTimestamp = (): void => {
    setLastRequestTime(Date.now());
  };

  return {
    shouldDebounceRequest,
    updateRequestTimestamp,
    lastRequestTime
  };
};
