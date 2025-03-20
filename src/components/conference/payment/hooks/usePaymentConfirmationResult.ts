
import { useState } from "react";
import { PaymentIntent, StripeError } from "@stripe/stripe-js";

type PaymentConfirmationResult = {
  success: boolean;
  reason?: string;
  paymentIntent?: PaymentIntent;
  error?: StripeError | Error;
};

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
   * @param error - Error object
   * @returns Formatted error result
   */
  const buildErrorResult = (
    reason: string, 
    error?: StripeError | Error
  ): PaymentConfirmationResult => {
    return { 
      success: false, 
      reason, 
      error 
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

export type { PaymentConfirmationResult };
