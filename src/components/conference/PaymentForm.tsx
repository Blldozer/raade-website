
import { useState, useEffect } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface PaymentFormProps {
  email: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  amount: number;
  currency: string;
}

const PaymentForm = ({ email, onSuccess, onError, amount, currency }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
          break;
      }
    });
  }, [stripe, onSuccess]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
        receipt_email: email,
      },
      redirect: "if_required"
    });

    if (error) {
      // This point will only be reached if there's an immediate error when confirming the payment.
      // For example, a declined card or incorrect CVC.
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "An unexpected error occurred");
        onError(error.message || "An unexpected error occurred");
      } else {
        setMessage("An unexpected error occurred");
        onError("An unexpected error occurred");
      }
    } else {
      // The payment has been processed!
      setMessage("Payment succeeded!");
      onSuccess();
    }

    setIsLoading(false);
  };

  return (
    <Card className="w-full mt-4">
      <CardContent className="pt-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-medium">Payment Details</h3>
          <p className="text-gray-500 text-sm">
            Total: {amount.toFixed(2)} {currency}
          </p>
        </div>
        
        <form id="payment-form" onSubmit={handleSubmit}>
          <LinkAuthenticationElement 
            id="link-authentication-element"
            options={{
              defaultValues: { email }
            }}
          />
          
          <PaymentElement 
            id="payment-element" 
            options={{
              layout: "tabs"
            }}
            className="mb-6 mt-4"
          />
          
          <Button
            disabled={isLoading || !stripe || !elements}
            className="w-full bg-raade-navy hover:bg-raade-navy/90 text-white"
            type="submit"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>Complete Payment</>
            )}
          </Button>
          
          {message && <div className="text-center mt-4 text-red-500">{message}</div>}
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
