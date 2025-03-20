
import { useRef } from "react";
import { StripeError } from "@stripe/stripe-js";
import { PaymentMessageHandlers } from "../types";

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
): PaymentMessageHandlers & { isProcessingRef: React.RefObject<boolean> } => {
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
  const handleError = (error: StripeError | Error) => {
    isProcessingRef.current = false;
    
    // Check if it's a stripe error with type
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
