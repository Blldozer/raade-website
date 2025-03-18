
import React from "react";
import StripeElementsProvider from "./StripeElementsProvider";
import PaymentForm from "../PaymentForm";

interface PaymentInitializerProps {
  clientSecret: string;
  email: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  amount: number;
  currency: string;
  isGroupRegistration?: boolean;
  groupSize?: number;
}

/**
 * PaymentInitializer Component
 * 
 * Initializes Stripe payment form:
 * - Sets up Stripe Elements provider with client secret
 * - Renders payment form with necessary props
 * - Handles success and error callbacks
 */
const PaymentInitializer: React.FC<PaymentInitializerProps> = ({
  clientSecret,
  email,
  onSuccess,
  onError,
  amount,
  currency,
  isGroupRegistration,
  groupSize
}) => {
  return (
    <div className="mt-4">
      <StripeElementsProvider clientSecret={clientSecret}>
        <PaymentForm 
          email={email}
          onSuccess={onSuccess}
          onError={onError}
          amount={amount}
          currency={currency}
          isGroupRegistration={isGroupRegistration}
          groupSize={isGroupRegistration ? groupSize : undefined}
        />
      </StripeElementsProvider>
    </div>
  );
};

export default PaymentInitializer;
