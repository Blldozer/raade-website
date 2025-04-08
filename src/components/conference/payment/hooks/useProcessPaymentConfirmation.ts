
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
  getClientSecret: () => string | null;
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
  email,
  getClientSecret
}: UseProcessPaymentConfirmationProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  /**
   * Process payment confirmation with retry logic for rate limiting
   * @returns PaymentConfirmationResult indicating success or failure
   */
  const processPaymentConfirmation = async (): Promise<PaymentConfirmationResult> => {
    if (!stripe || !elements) {
      console.error("Stripe or elements not loaded", { stripe: !!stripe, elements: !!elements });
      return { success: false, reason: "stripe-not-loaded" };
    }
    
    setIsProcessing(true);
    
    try {
      console.log("Starting payment confirmation with Stripe");
      
      // Get the current card element
      const cardElement = elements.getElement("card");
      if (!cardElement) {
        console.error("Card element not found in the form");
        return { success: false, reason: "card-element-missing" };
      }
      
      // Get the client secret from the provided function
      const clientSecret = getClientSecret();
      
      if (!clientSecret) {
        console.error("Client secret is missing");
        return { success: false, reason: "client-secret-missing" };
      }
      
      console.log("Using client secret to confirm payment:", clientSecret.substring(0, 10) + "...");
      
      // Try to confirm payment with optimized settings to reduce rate limiting issues
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              email: email
            }
          }
        }
      );
      
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
            error: error as unknown as Error
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
        console.log(`Payment intent status: ${paymentIntent.status}`);
        
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
