
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
   * @returns Boolean indicating if the request should be debounced
   */
  const shouldDebounceRequest = (): boolean => {
    const now = Date.now();
    return now - lastRequestTime < REQUEST_DEBOUNCE_TIME;
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
