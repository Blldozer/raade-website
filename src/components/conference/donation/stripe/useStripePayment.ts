
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { supabase } from "@/integrations/supabase/client";

interface StripePaymentHookProps {
  donationAmount: number;
  email: string;
  fullName: string;
  message?: string;
  makeAnonymous?: boolean;
}

/**
 * Custom hook for handling Stripe payments
 * 
 * Manages the entire payment process:
 * - Creates payment intent via edge function
 * - Processes card payment with Stripe
 * - Handles loading states and errors
 * - Returns payment status and actions
 */
export const useStripePayment = ({
  donationAmount,
  email,
  fullName,
  message,
  makeAnonymous
}: StripePaymentHookProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Process the payment
  const processPayment = async () => {
    if (!stripe || !elements) {
      setError("Stripe hasn't loaded yet. Please try again.");
      return false;
    }

    // Get the card element
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card element not found. Please refresh the page.");
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 1. Create a payment intent through our edge function
      const amountInCents = Math.round(donationAmount * 100); // Convert to cents for Stripe
      
      console.log("Creating payment intent for", {
        amount: amountInCents,
        email,
        fullName,
        makeAnonymous,
        message
      });
      
      const { data, error: intentError } = await supabase.functions.invoke("process-donation", {
        body: {
          amount: amountInCents,
          email,
          fullName,
          makeAnonymous,
          message
        }
      });

      if (intentError || !data || !data.clientSecret) {
        console.error("Payment intent creation failed:", intentError || "No client secret returned");
        throw new Error(intentError?.message || "Failed to initialize payment. Please try again.");
      }

      // 2. Confirm the card payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: fullName,
              email
            }
          }
        }
      );

      if (stripeError) {
        console.error("Stripe payment confirmation error:", stripeError);
        throw new Error(stripeError.message || "Payment failed. Please try again.");
      }

      if (paymentIntent?.status !== "succeeded") {
        throw new Error(`Payment ${paymentIntent?.status || "failed"}. Please try again.`);
      }

      console.log("Payment succeeded:", paymentIntent);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      console.error("Payment processing error:", err);
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    processPayment,
    isLoading,
    error,
    setError
  };
};
