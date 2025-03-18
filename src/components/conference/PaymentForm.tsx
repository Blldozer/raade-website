
import { useState, useEffect } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
  AddressElement
} from "@stripe/react-stripe-js";

import { Card, CardContent } from "@/components/ui/card";
import PaymentTotal from "./payment/PaymentTotal";
import PaymentStatus from "./payment/PaymentStatus";
import PaymentFormButtons from "./payment/PaymentFormButtons";
import DigitalWalletPayment from "./payment/DigitalWalletPayment";
import PaymentIntentHandler from "./payment/PaymentIntentHandler";
import { usePaymentSubmission } from "./payment/usePaymentSubmission";

interface PaymentFormProps {
  email: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  amount: number;
  currency: string;
  isGroupRegistration?: boolean;
  groupSize?: number;
}

/**
 * PaymentForm Component
 * 
 * Displays Stripe payment form with proper pricing information:
 * - Supports digital wallet payments (Apple Pay, Google Pay)
 * - For group registrations, shows both per-person and total cost
 * - For individual registrations, shows single ticket price
 * - Handles payment submission and error reporting
 */
const PaymentForm = ({ 
  email, 
  onSuccess, 
  onError, 
  amount, 
  currency,
  isGroupRegistration,
  groupSize
}: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Get client secret from URL if available when component mounts
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get("payment_intent_client_secret");
    if (secret) {
      setClientSecret(secret);
    }
  }, []);

  // Use custom hook for payment submission
  const {
    isLoading,
    message,
    paymentCompleted,
    handleSubmit,
    handlePaymentSuccess,
    setMessage
  } = usePaymentSubmission({
    stripe,
    elements,
    email,
    onSuccess,
    onError
  });

  return (
    <Card className="w-full mt-4">
      <CardContent className="pt-6">
        <PaymentTotal 
          amount={amount}
          currency={currency}
          isGroupRegistration={isGroupRegistration}
          groupSize={groupSize}
        />
        
        {/* Payment Intent Handler - checks for existing payment in URL */}
        <PaymentIntentHandler 
          onSuccess={handlePaymentSuccess}
          onError={onError}
          setMessage={setMessage}
        />
        
        {/* Digital Wallet Payment Options - Apple Pay / Google Pay */}
        <DigitalWalletPayment
          stripe={stripe}
          amount={amount}
          currency={currency}
          clientSecret={clientSecret}
          isGroupRegistration={isGroupRegistration}
          groupSize={groupSize}
          email={email}
          onSuccess={handlePaymentSuccess}
          onError={onError}
        />
        
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
              layout: "tabs",
              defaultValues: {
                billingDetails: {
                  email: email
                }
              }
            }}
            className="mb-6 mt-4"
          />
          
          <AddressElement 
            options={{
              mode: 'billing',
              fields: {
                phone: 'always',
              },
              validation: {
                phone: {
                  required: 'always',
                },
              },
            }}
            className="mb-6"
          />
          
          <PaymentFormButtons 
            isLoading={isLoading}
            isDisabled={!stripe || !elements}
            paymentCompleted={paymentCompleted}
          />
          
          <PaymentStatus message={message} />
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
