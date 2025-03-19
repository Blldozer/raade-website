
import { useRef } from "react";

/**
 * Custom hook to handle payment errors
 * 
 * Provides consistent error handling and prevents duplicate error callbacks
 * by using refs to track if callbacks have been called
 * 
 * @param onError - Error callback function to be called once
 * @param requestId - Optional request ID for error tracking
 */
export const usePaymentErrorHandling = (
  onError: (error: string) => void,
  requestId?: string | null
) => {
  // Track if error callback has been fired to prevent duplicates
  const errorCalledRef = useRef(false);

  const handleError = (error: string | Error) => {
    if (errorCalledRef.current) {
      console.log("Error already reported, ignoring duplicate");
      return;
    }

    errorCalledRef.current = true;
    
    // Convert Error objects to string messages
    const errorMessage = error instanceof Error ? error.message : error;
    
    // Include request ID if available
    const errorWithRequestId = requestId 
      ? `${errorMessage} (Request ID: ${requestId})` 
      : errorMessage;
    
    console.error("Payment error:", errorWithRequestId);
    onError(errorWithRequestId);
  };

  const resetErrorState = () => {
    errorCalledRef.current = false;
  };

  return {
    handleError,
    resetErrorState,
    errorCalledRef
  };
};
