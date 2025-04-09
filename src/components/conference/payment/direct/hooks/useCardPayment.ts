
import { useState } from "react";
import { StripeError } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

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
  onSuccess: () => void;
  onError: (message: string) => void;
  attemptId?: string;
}

/**
 * Custom hook for handling card payments
 * 
 * Manages the card payment process including:
 * - Payment submission
 * - Card validation
 * - Error handling
 * - Status updates
 */
export const useCardPayment = ({
  ticketType,
  email,
  fullName,
  groupSize,
  groupEmails,
  organization,
  role,
  specialRequests,
  referralSource,
  onSuccess,
  onError,
  attemptId
}: UseCardPaymentProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [successState, setSuccessState] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);

  const resetCardError = () => {
    setCardError(null);
  };

  /**
   * Handle card changes and validation
   */
  const handleCardChange = (event: any) => {
    setCardError(event.error ? event.error.message : null);
  };

  /**
   * Handle card payment submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      onError("Stripe has not initialized. Please try again later.");
      return;
    }

    // Get CardElement
    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      onError("Card element not found. Please reload the page and try again.");
      return;
    }
    
    // Don't allow submission if the card isn't complete
    if (!cardComplete) {
      setCardError("Please complete your card details");
      return;
    }

    setIsLoading(true);
    resetCardError();

    try {
      // Create payment intent via edge function
      const createIntent = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticketType,
          email,
          fullName,
          groupSize,
          groupEmails,
          organization,
          role,
          specialRequests,
          referralSource,
          attemptId
        }),
      });
      
      if (!createIntent.ok) {
        const errorData = await createIntent.json();
        throw new Error(errorData.message || 'Failed to create payment intent');
      }
      
      const intentData = await createIntent.json();
      
      if (!intentData.clientSecret) {
        throw new Error('No client secret received');
      }
      
      // Use the client secret to confirm payment
      const paymentResult = await stripe.confirmCardPayment(intentData.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: fullName,
            email: email,
          },
        },
      });
      
      if (paymentResult.error) {
        throw paymentResult.error;
      }
      
      // Payment succeeded
      setSuccessState(true);
      onSuccess();
      
    } catch (error) {
      console.error('Payment error:', error);
      
      // Handle Stripe errors
      if ((error as StripeError).type) {
        const stripeError = error as StripeError;
        setCardError(stripeError.message || 'Payment failed. Please try again.');
      } else {
        // Handle other errors
        setCardError((error as Error).message || 'Something went wrong. Please try again.');
      }
      
      onError((error as Error).message || 'Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    successState,
    cardError,
    handleCardChange,
    setCardComplete,
    resetCardError,
    handleSubmit
  };
};
