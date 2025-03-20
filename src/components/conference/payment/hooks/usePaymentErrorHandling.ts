
import { useRef } from "react";
import { StripeError } from "@stripe/stripe-js";
import { PaymentError } from "../types";

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
  const errorCalledRef = useRef<boolean>(false);

  const handleError = (error: string | Error | StripeError | PaymentError) => {
    if (errorCalledRef.current) {
      console.log("Error already reported, ignoring duplicate");
      return;
    }

    errorCalledRef.current = true;
    
    // Convert Error objects to string messages
    let errorMessage: string;
    
    if (typeof error === 'string') {
      errorMessage = error;
    } else if ('message' in error && typeof error.message === 'string') {
      errorMessage = error.message;
    } else {
      errorMessage = "Unknown error occurred";
    }
    
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
