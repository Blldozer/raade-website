
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
 * Handles PaymentIntents that might be returned in the URL:
 * - Checks URL for payment_intent and payment_intent_client_secret params
 * - Retrieves existing payments that may be returning from redirect flows
 * - Manages success/error states for completed payments
 */
const PaymentIntentHandler = ({ 
  onSuccess, 
  onError,
  setMessage 
}: PaymentIntentHandlerProps) => {
  const stripe = useStripe();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Extract the client secret from URL query parameters
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    // If no client secret was found, exit
    if (!clientSecret) {
      return;
    }

    // Retrieve the PaymentIntent to check its status
    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        if (!paymentIntent) {
          return;
        }

        // Handle different PaymentIntent statuses
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            onSuccess();
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            onError("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong with your payment.");
            onError("Something went wrong with your payment.");
            break;
        }
      });
  }, [stripe, onSuccess, onError, setMessage]);

  return null;
};

export default PaymentIntentHandler;
