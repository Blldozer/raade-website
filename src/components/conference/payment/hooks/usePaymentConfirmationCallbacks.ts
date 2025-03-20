
import { PaymentIntent, StripeError } from "@stripe/stripe-js";
import { usePaymentConfirmationState } from "./usePaymentConfirmationState";
import { usePaymentConfirmationMessages } from "./usePaymentConfirmationMessages";

interface UsePaymentConfirmationCallbacksProps {
  onSuccess: () => void;
  onError: (error: string) => void;
  setMessage: (message: string | null) => void;
  requestId?: string | null;
}

/**
 * Custom hook for handling payment confirmation callbacks
 * 
 * Ensures callbacks are called only once and with proper error handling
 * 
 * @param props - Hook configuration props
 * @returns Functions to handle different payment outcomes
 */
export const usePaymentConfirmationCallbacks = ({
  onSuccess,
  onError,
  setMessage,
  requestId
}: UsePaymentConfirmationCallbacksProps) => {
  const { successCalledRef } = usePaymentConfirmationState();
  const { 
    setSuccessMessage, 
    setErrorMessage, 
    setStatusMessage 
  } = usePaymentConfirmationMessages(setMessage);
  
  /**
   * Handle successful payment result
   * @param paymentIntent - Successful payment intent
   */
  const handleSuccess = (paymentIntent: PaymentIntent) => {
    setSuccessMessage();
    
    if (!successCalledRef.current) {
      successCalledRef.current = true;
      onSuccess();
    }
  };
  
  /**
   * Handle payment error
   * @param error - Error message or object
   */
  const handleError = (error: string | Error | StripeError) => {
    // Convert string errors to Error objects
    const errorObject = typeof error === 'string' ? new Error(error) : error;
    
    // Set the appropriate error message
    setErrorMessage(errorObject);
    
    // Include request ID in error message if available
    const errorMessage = typeof error === 'string' 
      ? error 
      : 'message' in error ? error.message : 'Unknown error';
      
    const errorWithRequestId = requestId 
      ? `${errorMessage} (Request ID: ${requestId})`
      : errorMessage;
    
    onError(errorWithRequestId);
  };
  
  /**
   * Handle payment status update
   * @param status - Payment status from Stripe
   */
  const handlePaymentStatus = (status: string) => {
    setStatusMessage(status);
    
    // If payment succeeded, call success callback
    if (status === 'succeeded' && !successCalledRef.current) {
      successCalledRef.current = true;
      onSuccess();
    }
  };
  
  return {
    handleSuccess,
    handleError,
    handlePaymentStatus
  };
};
