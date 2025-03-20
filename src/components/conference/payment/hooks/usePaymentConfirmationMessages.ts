
import { StripeError } from "@stripe/stripe-js";

/**
 * Custom hook for handling payment confirmation messages
 * 
 * Centralizes message logic for different payment states and errors
 * 
 * @param setMessage - Function to update message display
 * @returns Functions to set appropriate messages
 */
export const usePaymentConfirmationMessages = (
  setMessage: (message: string | null) => void
) => {
  /**
   * Set success message
   */
  const setSuccessMessage = () => {
    setMessage("Payment succeeded!");
  };
  
  /**
   * Set processing message
   */
  const setProcessingMessage = () => {
    setMessage("Your payment is processing.");
  };
  
  /**
   * Set error message based on error type
   * @param error - Error object or message
   */
  const setErrorMessage = (error: StripeError | Error) => {
    // Check if it's a Stripe error with type
    if ('type' in error && (error.type === "card_error" || error.type === "validation_error")) {
      setMessage(error.message || "An unexpected error occurred");
    } else {
      const errorType = 'type' in error ? error.type : 'unknown';
      const errorMessage = `Payment error (${errorType}): ${error.message}`;
      console.error(errorMessage);
      setMessage("An unexpected error occurred");
    }
  };
  
  /**
   * Set message based on payment status
   * @param status - Payment intent status
   */
  const setStatusMessage = (status: string) => {
    switch (status) {
      case "processing":
        setMessage("Your payment is processing.");
        break;
      case "requires_payment_method":
        setMessage("Your payment was not successful, please try again.");
        break;
      case "requires_action":
        setMessage("Additional verification required. Please follow the prompts.");
        break;
      default:
        setMessage(`Payment status: ${status}`);
    }
  };
  
  /**
   * Set generic error message
   * @param errorMessage - Error message to display
   */
  const setGenericErrorMessage = (errorMessage: string) => {
    setMessage(errorMessage);
  };
  
  /**
   * Clear all messages
   */
  const clearMessage = () => {
    setMessage(null);
  };
  
  return {
    setSuccessMessage,
    setProcessingMessage,
    setErrorMessage,
    setStatusMessage,
    setGenericErrorMessage,
    clearMessage
  };
};
