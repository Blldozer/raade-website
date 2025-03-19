
import { useState } from "react";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { useStripePaymentConfirmation } from "./useStripePaymentConfirmation";

interface UsePaymentSubmissionProps {
  stripe: Stripe | null;
  elements: StripeElements | null;
  email: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  setMessage: (message: string | null) => void;
  requestId?: string | null;
}

/**
 * Custom hook to handle payment submission logic
 * 
 * Manages:
 * - Form submission and payment processing
 * - Loading and processing states
 * - Timeout handling
 * - Error reporting
 * - Success callback protection
 */
export const usePaymentSubmission = ({
  stripe,
  elements,
  email,
  onSuccess,
  onError,
  setMessage,
  requestId
}: UsePaymentSubmissionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Use Stripe payment confirmation hook
  const { 
    isProcessing, 
    handleConfirmPayment 
  } = useStripePaymentConfirmation({
    stripe,
    elements,
    email,
    onSuccess,
    onError,
    setMessage,
    requestId
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    if (isProcessing) {
      console.log("Payment already processing, ignoring duplicate submission");
      return;
    }

    setIsLoading(true);
    
    try {
      await handleConfirmPayment();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isProcessing,
    handleSubmit
  };
};
