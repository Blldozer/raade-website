
import { useState, useEffect, useRef } from "react";
import { Stripe, StripeElements } from "@stripe/stripe-js";

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
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Use refs to track if callbacks have been fired to prevent duplicates
  const successCalledRef = useRef(false);
  const errorCalledRef = useRef(false);
  // Track if component is mounted
  const isMountedRef = useRef(true);

  // Set a timeout for card processing
  const PAYMENT_PROCESSING_TIMEOUT = 30000; // 30 seconds
  // Track the current payment timeout
  const paymentTimeoutRef = useRef<number | null>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      // Clear any pending timeouts
      if (paymentTimeoutRef.current) {
        clearTimeout(paymentTimeoutRef.current);
      }
    };
  }, []);

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
    setIsProcessing(true);
    
    // Set a timeout for the payment processing
    if (paymentTimeoutRef.current) {
      clearTimeout(paymentTimeoutRef.current);
    }
    
    const timeoutId = setTimeout(() => {
      if (isMountedRef.current) {
        console.warn("Payment processing timed out after", PAYMENT_PROCESSING_TIMEOUT, "ms");
        setMessage("The payment is taking longer than expected. Please check your card details and try again.");
        setIsLoading(false);
        setIsProcessing(false);
        
        if (!errorCalledRef.current) {
          errorCalledRef.current = true;
          onError("Payment processing timed out. Please try again with a different payment method.");
        }
      }
    }, PAYMENT_PROCESSING_TIMEOUT);
    
    paymentTimeoutRef.current = timeoutId as unknown as number;

    try {
      console.log("Starting payment confirmation...");
      
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
          receipt_email: email,
          payment_method_data: {
            billing_details: { email }
          }
        },
        redirect: "if_required"
      });
      
      // Clear the timeout since we got a response
      if (paymentTimeoutRef.current) {
        clearTimeout(paymentTimeoutRef.current);
        paymentTimeoutRef.current = null;
      }
      
      if (!isMountedRef.current) return;

      if (error) {
        // This point will only be reached if there's an immediate error when confirming the payment.
        console.error("Payment error:", error.type, error.message);
        
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message || "An unexpected error occurred");
          
          if (!errorCalledRef.current) {
            errorCalledRef.current = true;
            onError(error.message || "An unexpected error occurred");
          }
        } else {
          const errorMessage = `Payment error (${error.type}): ${error.message}`;
          console.error(errorMessage);
          setMessage("An unexpected error occurred");
          
          if (!errorCalledRef.current) {
            errorCalledRef.current = true;
            // Include request ID if available
            const errorWithRequestId = requestId 
              ? `${errorMessage} (Request ID: ${requestId})` 
              : errorMessage;
            onError(errorWithRequestId);
          }
        }
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // The payment has been processed!
        setMessage("Payment succeeded!");
        
        if (!successCalledRef.current) {
          successCalledRef.current = true;
          onSuccess();
        }
      } else if (paymentIntent) {
        // Payment requires additional actions or is in another state
        console.log("Payment intent is in state:", paymentIntent.status);
        switch (paymentIntent.status) {
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          case "requires_action":
            setMessage("Additional verification required. Please follow the prompts.");
            break;
          default:
            setMessage(`Payment status: ${paymentIntent.status}`);
        }
      } else {
        // Shouldn't normally get here
        console.warn("No payment intent or error returned");
        setMessage("Something went wrong with your payment. Please try again.");
        
        if (!errorCalledRef.current) {
          errorCalledRef.current = true;
          onError("Payment failed: No payment confirmation received");
        }
      }
    } catch (unexpectedError) {
      // Clear the timeout
      if (paymentTimeoutRef.current) {
        clearTimeout(paymentTimeoutRef.current);
        paymentTimeoutRef.current = null;
      }
      
      if (!isMountedRef.current) return;
      
      console.error("Unexpected error during payment:", unexpectedError);
      setMessage("An unexpected error occurred during payment processing");
      
      if (!errorCalledRef.current) {
        errorCalledRef.current = true;
        onError("An unexpected error occurred: " + (unexpectedError.message || "Unknown error"));
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
        setIsProcessing(false);
      }
    }
  };

  return {
    isLoading,
    isProcessing,
    handleSubmit
  };
};
