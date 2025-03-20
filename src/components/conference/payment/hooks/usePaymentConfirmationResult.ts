
import { useState } from "react";
import { PaymentIntent, StripeError } from "@stripe/stripe-js";

// Use the exported type from useProcessPaymentConfirmation
import { PaymentConfirmationResult } from "./useProcessPaymentConfirmation";

/**
 * Custom hook for handling payment confirmation results
 * 
 * Provides a standardized way to process payment confirmation outcomes
 * with proper error handling and status reporting
 * 
 * @returns Functions and state for managing payment confirmation results
 */
export const usePaymentConfirmationResult = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  /**
   * Update processing state to indicate payment is in progress
   */
  const startProcessing = () => {
    setIsProcessing(true);
  };
  
  /**
   * Update processing state to indicate payment is complete
   */
  const stopProcessing = () => {
    setIsProcessing(false);
  };
  
  /**
   * Build a success result object
   * @param paymentIntent - The successful payment intent
   * @returns Formatted success result
   */
  const buildSuccessResult = (paymentIntent: PaymentIntent): PaymentConfirmationResult => {
    return { 
      success: true, 
      paymentIntent 
    };
  };
  
  /**
   * Build an error result object
   * @param reason - Reason code for the failure
   * @param error - Error object (either standard Error or StripeError)
   * @returns Formatted error result
   */
  const buildErrorResult = (
    reason: string, 
    error?: Error | StripeError
  ): PaymentConfirmationResult => {
    return { 
      success: false, 
      reason, 
      error: error as Error // Type assertion for compatibility
    };
  };

  return {
    isProcessing,
    startProcessing,
    stopProcessing,
    buildSuccessResult,
    buildErrorResult
  };
};

// No need to export the type here anymore as we're now importing it
