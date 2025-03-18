
import { useEffect } from "react";
import { useStripe } from "@stripe/react-stripe-js";

interface PaymentIntentHandlerProps {
  onSuccess: () => void;
  onError: (error: string) => void;
  setMessage: (message: string | null) => void;
}

/**
 * PaymentIntentHandler Component
 * 
 * Checks for existing payment in URL:
 * - Retrieves payment intent from URL parameters
 * - Handles different payment statuses
 * - Updates payment status accordingly
 */
const PaymentIntentHandler: React.FC<PaymentIntentHandlerProps> = ({ 
  onSuccess,
  onError,
  setMessage
}) => {
  const stripe = useStripe();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          onSuccess();
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          onError("Payment status unknown");
          break;
      }
    });
  }, [stripe, onSuccess, setMessage, onError]);

  // This component doesn't render anything
  return null;
};

export default PaymentIntentHandler;
