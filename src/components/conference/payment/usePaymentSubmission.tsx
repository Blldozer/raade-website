
import { useState } from "react";
import { StripePaymentElementOptions, StripeElements, Stripe } from "@stripe/stripe-js";
import { toast } from "@/hooks/use-toast";

interface UsePaymentSubmissionProps {
  stripe: Stripe | null;
  elements: StripeElements | null;
  email: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

/**
 * Custom hook that handles payment submission logic
 * 
 * Encapsulates:
 * - Payment form submission
 * - Error handling
 * - Loading states
 * - Success confirmation
 */
export const usePaymentSubmission = ({
  stripe,
  elements,
  email,
  onSuccess,
  onError
}: UsePaymentSubmissionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // Helper function to handle successful payments
  const handlePaymentSuccess = () => {
    setMessage("Payment succeeded!");
    setPaymentCompleted(true);
    onSuccess();
    toast({
      title: "Payment successful",
      description: "Your registration payment has been processed.",
      variant: "default",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
          receipt_email: email,
        },
        redirect: "if_required"
      });

      if (error) {
        console.error("Payment error:", error);
        // This point will only be reached if there's an immediate error when confirming the payment
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message || "An unexpected error occurred");
          onError(error.message || "An unexpected error occurred");
        } else {
          setMessage("An unexpected error occurred");
          onError("An unexpected error occurred");
        }
        
        // Show error toast
        toast({
          title: "Payment failed",
          description: error.message || "Your payment couldn't be processed. Please try again.",
          variant: "destructive",
        });
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // The payment has been processed!
        handlePaymentSuccess();
      }
    } catch (err) {
      console.error("Error during payment submission:", err);
      setMessage("An error occurred during payment processing");
      onError("An error occurred during payment processing");
      
      toast({
        title: "Payment error",
        description: "Something went wrong processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    message,
    paymentCompleted,
    handleSubmit,
    handlePaymentSuccess,
    setMessage // Explicitly export the setMessage function
  };
};
