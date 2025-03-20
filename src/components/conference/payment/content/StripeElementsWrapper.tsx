
import React from "react";
import StripeElementsProvider from "../StripeElementsProvider";
import PaymentForm from "../PaymentForm";
import { usePaymentContext } from "./PaymentContext";

/**
 * StripeElementsWrapper Component Props
 */
interface StripeElementsWrapperProps {
  clientSecret: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

/**
 * StripeElementsWrapper Component
 * 
 * Wraps the Stripe payment form with:
 * - Stripe Elements Provider context
 * - Payment context data
 * - Success/error callbacks
 * 
 * @param clientSecret - Stripe client secret for the payment intent
 * @param onSuccess - Success callback
 * @param onError - Error callback
 */
const StripeElementsWrapper: React.FC<StripeElementsWrapperProps> = ({
  clientSecret,
  onSuccess,
  onError
}) => {
  // Get payment data from context
  const {
    email,
    amount,
    currency,
    isGroupRegistration,
    groupSize,
    requestId
  } = usePaymentContext();

  // Debug payment intent initialization
  React.useEffect(() => {
    console.log("StripeElementsWrapper mounted with client secret:", clientSecret ? "present" : "missing");
    console.log("Payment context values:", { email, amount, currency, isGroupRegistration, groupSize });
  }, [clientSecret, email, amount, currency, isGroupRegistration, groupSize]);

  return (
    <StripeElementsProvider clientSecret={clientSecret}>
      <PaymentForm 
        email={email}
        onSuccess={onSuccess}
        onError={onError}
        amount={amount}
        currency={currency}
        isGroupRegistration={isGroupRegistration}
        groupSize={groupSize}
        requestId={requestId}
      />
    </StripeElementsProvider>
  );
};

export default StripeElementsWrapper;
