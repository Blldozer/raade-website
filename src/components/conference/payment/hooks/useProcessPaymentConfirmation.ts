
import { Stripe, StripeElements, PaymentIntent, StripeError } from "@stripe/stripe-js";
import { confirmStripePayment } from "../services/paymentConfirmationService";
import { usePaymentConfirmationResult } from "./usePaymentConfirmationResult";
import { usePaymentConfirmationState } from "./usePaymentConfirmationState";

// Export the PaymentConfirmationResult type
export interface PaymentConfirmationResult {
  success: boolean;
  reason?: string;
  paymentIntent?: PaymentIntent;
  error?: StripeError | Error;
}

interface UseProcessPaymentConfirmationProps {
  stripe: Stripe | null;
  elements: StripeElements | null;
  email: string;
}

/**
 * Custom hook for processing a payment confirmation
 * 
 * Handles the core logic of confirming a payment with Stripe
 * and processing the result
 * 
 * @param props - Hook configuration props
 * @returns Functions and state for handling payment confirmation
 */
export const useProcessPaymentConfirmation = ({
  stripe,
  elements,
  email
}: UseProcessPaymentConfirmationProps) => {
  const { 
    isProcessing,
    startProcessing,
    stopProcessing,
    buildSuccessResult,
    buildErrorResult 
  } = usePaymentConfirmationResult();
  
  const { isMountedRef } = usePaymentConfirmationState();

  /**
   * Process a payment confirmation 
   * @returns Promise with the payment confirmation result
   */
  const processPaymentConfirmation = async (): Promise<PaymentConfirmationResult> => {
    if (!stripe || !elements) {
      return buildErrorResult("stripe-not-loaded");
    }

    if (isProcessing) {
      console.log("Payment already processing, ignoring duplicate submission");
      return buildErrorResult("already-processing");
    }

    startProcessing();

    try {
      const { error, paymentIntent } = await confirmStripePayment(stripe, elements, email);
      
      if (!isMountedRef.current) return buildErrorResult("unmounted");

      if (error) {
        console.error("Payment error:", error.type, error.message);
        return buildErrorResult("payment-error", error);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        return buildSuccessResult(paymentIntent);
      } else if (paymentIntent) {
        console.log("Payment intent is in state:", paymentIntent.status);
        return buildErrorResult("requires-action", paymentIntent as any);
      } else {
        console.warn("No payment intent or error returned");
        return buildErrorResult("no-response");
      }
    } catch (unexpectedError) {
      if (!isMountedRef.current) return buildErrorResult("unmounted");
      
      console.error("Unexpected error during payment:", unexpectedError);
      
      const errorMessage = unexpectedError instanceof Error ? 
        unexpectedError.message : 
        "An unexpected error occurred: Unknown error";
        
      return buildErrorResult(
        "unexpected-error", 
        unexpectedError instanceof Error ? unexpectedError : new Error(String(unexpectedError))
      );
    } finally {
      if (isMountedRef.current) {
        stopProcessing();
      }
    }
  };

  return {
    isProcessing,
    processPaymentConfirmation
  };
};
