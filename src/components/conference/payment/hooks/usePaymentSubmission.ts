
import { useState } from "react";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { useStripePaymentConfirmation } from "./useStripePaymentConfirmation";

interface UsePaymentSubmissionProps {
  stripe: Stripe | null;
  elements: StripeElements | null;
  email: string;
  getClientSecret: () => string | null;
  onSuccess: () => void;
  onError: (error: string) => void;
  setMessage: (message: string | null) => void;
  requestId?: string | null;
}

/**
 * Custom hook to handle payment submission
 * 
 * Manages the state and callbacks for the payment submission process
 */
export const usePaymentSubmission = ({
  stripe,
  elements,
  email,
  getClientSecret,
  onSuccess,
  onError,
  setMessage,
  requestId
}: UsePaymentSubmissionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Get payment confirmation handler
  const { 
    isProcessing,
    handleConfirmPayment, 
    successCalledRef
  } = useStripePaymentConfirmation({
    stripe,
    elements,
    email,
    getClientSecret,
    onSuccess,
    onError,
    setMessage,
    requestId
  });
  
  /**
   * Handle form submission
   * Prevents default form submission and processes payment
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (successCalledRef.current) {
      console.log("Payment already succeeded, ignoring submission");
      return;
    }
    
    if (!stripe || !elements) {
      console.error("Stripe not initialized", { stripe: !!stripe, elements: !!elements });
      setMessage("Please wait while we connect to the payment service");
      return;
    }
    
    const clientSecret = getClientSecret();
    if (!clientSecret) {
      console.error("Missing client secret for payment");
      setMessage("Payment configuration error. Please refresh the page and try again.");
      onError("Missing payment configuration. Please try again.");
      return;
    }
    
    setIsLoading(true);
    setMessage("Processing your payment...");
    
    try {
      console.log(`Starting payment confirmation (${requestId || 'unknown'})`);
      await handleConfirmPayment();
    } catch (error) {
      console.error(`Unexpected error in payment submission (${requestId || 'unknown'}):`, error);
      setMessage("An unexpected error occurred. Please try again.");
      
      // Call onError if it hasn't been called yet by the confirmation process
      if (!successCalledRef.current) {
        onError("An unexpected error occurred during payment. Please try again.");
      }
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
