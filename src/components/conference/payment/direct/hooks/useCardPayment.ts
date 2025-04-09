
import { useState } from "react";
import { useStripe, useElements, StripeCardElementChangeEvent } from "@stripe/react-stripe-js";
import { supabase } from "@/integrations/supabase/client";

interface UseCardPaymentProps {
  ticketType: string;
  email: string;
  fullName: string;
  groupSize?: number;
  groupEmails?: string[];
  organization?: string;
  role?: string;
  specialRequests?: string;
  referralSource?: string;
  couponCode?: string;  // Add couponCode prop
  couponDiscount?: { type: 'percentage' | 'fixed'; amount: number } | null;  // Add couponDiscount prop
  onSuccess: () => void;
  onError: (error: string) => void;
  attemptId: string;
}

export const useCardPayment = ({
  ticketType,
  email,
  fullName,
  groupSize,
  groupEmails = [],
  organization = "",
  role = "",
  specialRequests = "",
  referralSource = "",
  couponCode = "",  // Add default value
  couponDiscount = null,  // Add default value
  onSuccess,
  onError,
  attemptId
}: UseCardPaymentProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);

  const handleCardChange = (event: StripeCardElementChangeEvent) => {
    setCardError(event.error ? event.error.message : null);
  };

  const resetCardError = () => {
    setCardError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      onError("Stripe not loaded yet. Please try again.");
      return;
    }

    if (!cardComplete) {
      setCardError("Please complete card information");
      return;
    }

    setIsLoading(true);
    setCardError(null);

    try {
      // Call our create-direct-payment-intent function
      const { data, error } = await supabase.functions.invoke('create-direct-payment-intent', {
        body: {
          ticketType,
          email,
          fullName,
          groupSize,
          groupEmails,
          organization,
          role,
          specialRequests,
          referralSource,
          couponCode,  // Pass couponCode to the edge function
          couponDiscount,  // Pass couponDiscount to the edge function
          attemptId
        }
      });

      if (error || !data?.clientSecret) {
        console.error("Payment intent creation error:", error || "No client secret returned");
        onError(error?.message || "Failed to create payment intent. Please try again.");
        setIsLoading(false);
        return;
      }

      const cardElement = elements.getElement('card');
      if (!cardElement) {
        onError("Card element not found. Please refresh and try again.");
        setIsLoading(false);
        return;
      }

      // Confirm the card payment
      const { error: paymentError } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: fullName,
            email: email
          }
        }
      });

      if (paymentError) {
        console.error("Payment confirmation error:", paymentError);
        setCardError(paymentError.message || "Payment failed. Please try again.");
        onError(paymentError.message || "Payment failed. Please try again.");
      } else {
        console.log("Payment succeeded!");
        onSuccess();
      }
    } catch (err) {
      console.error("Unexpected payment error:", err);
      setCardError("An unexpected error occurred. Please try again.");
      onError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmit,
    isLoading,
    cardError,
    handleCardChange,
    setCardComplete,
    resetCardError
  };
};
