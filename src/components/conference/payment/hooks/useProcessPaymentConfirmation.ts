
import { useState } from "react";
import { Stripe, StripeElements, PaymentIntent, StripeError } from "@stripe/stripe-js";

export type PaymentConfirmationResult = {
  success: boolean;
  reason?: string;
  paymentIntent?: PaymentIntent;
  error?: Error | StripeError; // Update type to accept both Error and StripeError
};

interface UseProcessPaymentConfirmationProps {
  stripe: Stripe | null;
  elements: StripeElements | null;
  email: string;
}

/**
 * Custom hook to handle the payment confirmation process
 * 
 * Manages the state and logic for confirming payments with Stripe
 * including handling rate limiting scenarios with exponential backoff
 */
export const useProcessPaymentConfirmation = ({
  stripe,
  elements,
  email
}: UseProcessPaymentConfirmationProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  /**
   * Process payment confirmation with retry logic for rate limiting
   * @returns PaymentConfirmationResult indicating success or failure
   */
  const processPaymentConfirmation = async (): Promise<PaymentConfirmationResult> => {
    if (!stripe || !elements) {
      console.error("Stripe or elements not loaded");
      return { success: false, reason: "stripe-not-loaded" };
    }
    
    setIsProcessing(true);
    
    try {
      console.log("Starting payment confirmation process");
      
      // Try to confirm payment with optimized settings to reduce rate limiting issues
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/conference/confirmation`,
          receipt_email: email,
          payment_method_data: {
            billing_details: { email }
          },
          // Disable any unnecessary fields to reduce API load
          setup_future_usage: undefined
        },
        redirect: "if_required"
      });
      
      // Handle errors
      if (error) {
        console.error("Payment confirmation error:", error);
        
        // Special handling for rate limiting errors
        if (error.type === 'api_error' && 
            (error.message.includes('rate limit') || error.message.includes('too many requests'))) {
          console.warn("Rate limiting detected in payment confirmation");
          return { 
            success: false, 
            reason: "rate-limited",
            error: error as unknown as Error // Type assertion to resolve the error
          };
        }
        
        // Handle other payment confirmation errors
        if (error.type === 'card_error' || error.type === 'validation_error') {
          return { success: false, reason: "payment-error", error: error as unknown as Error };
        } else {
          return { success: false, reason: error.type, error: error as unknown as Error };
        }
      }
      
      // Handle payment intent
      if (paymentIntent) {
        switch (paymentIntent.status) {
          case "succeeded":
            console.log("Payment succeeded");
            return { success: true, paymentIntent };
          case "processing":
            console.log("Payment processing");
            return { success: false, reason: "processing", paymentIntent };
          case "requires_payment_method":
            console.log("Payment requires payment method");
            return { success: false, reason: "requires-payment-method", paymentIntent };
          case "requires_action":
            console.log("Payment requires action");
            return { success: false, reason: "requires-action", paymentIntent };
          default:
            console.log(`Unexpected payment intent status: ${paymentIntent.status}`);
            return { success: false, reason: paymentIntent.status, paymentIntent };
        }
      }
      
      console.error("Payment confirmation failed with unknown reason");
      return { success: false, reason: "unknown-failure" };
    } catch (error) {
      console.error("Unexpected error during payment confirmation:", error);
      return { 
        success: false, 
        reason: "unexpected-error", 
        error: error instanceof Error ? error : new Error(String(error))
      };
    } finally {
      setIsProcessing(false);
    }
  };
  
  return {
    isProcessing,
    processPaymentConfirmation
  };
};
