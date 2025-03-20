
import { useRef } from "react";

/**
 * Custom hook to handle payment result messages and status
 * 
 * Manages the payment completion message state and provides
 * helper functions to set appropriate messages based on payment status
 * 
 * @param setMessage - Function to update message display
 * @returns Functions to handle different payment statuses
 */
export const usePaymentResultHandler = (
  setMessage: (message: string | null) => void
) => {
  // Track if payment is in processing state
  const isProcessingRef = useRef(false);

  /**
   * Handle successful payment result
   */
  const handleSuccess = () => {
    setMessage("Payment succeeded!");
    isProcessingRef.current = false;
  };

  /**
   * Handle payment error
   * @param error - Error message or object
   */
  const handleError = (error: any) => {
    isProcessingRef.current = false;
    
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "An unexpected error occurred");
    } else {
      const errorMessage = `Payment error (${error.type}): ${error.message}`;
      console.error(errorMessage);
      setMessage("An unexpected error occurred");
    }
  };

  /**
   * Handle other payment statuses
   * @param status - Payment intent status
   */
  const handlePaymentStatus = (status: string) => {
    isProcessingRef.current = status === "processing";
    
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

  return {
    handleSuccess,
    handleError,
    handlePaymentStatus,
    isProcessingRef
  };
};
