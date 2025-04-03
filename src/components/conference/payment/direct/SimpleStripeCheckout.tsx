
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { usePaymentAmount } from "./hooks/usePaymentAmount";
import { useCardPayment } from "./hooks/useCardPayment";
import CardForm from "./components/CardForm";
import PaymentSuccess from "./components/PaymentSuccess";

interface SimpleStripeCheckoutProps {
  ticketType: string;
  email: string;
  fullName: string;
  groupSize?: number;
  groupEmails?: Array<string | { value: string } | null>;
  organization?: string;
  role?: string;
  specialRequests?: string;
  referralSource?: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

/**
 * SimpleStripeCheckout Component
 * 
 * A streamlined Stripe checkout that directly processes payments:
 * - Uses custom hooks for payment processing logic
 * - Separates UI components for better maintainability
 * - Handles success and error states
 */
const SimpleStripeCheckout = (props: SimpleStripeCheckoutProps) => {
  const [cardError, setCardError] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();
  
  // Get payment amount based on ticket type and group size
  const { paymentAmount } = usePaymentAmount(props.ticketType, props.groupSize);
  
  // Set up card payment processing
  const { isLoading, successState, handleSubmit } = useCardPayment(props, props.onSuccess, props.onError);

  // Handle card element changes to show validation errors
  const handleCardChange = (event: any) => {
    setCardError(event.error ? event.error.message : null);
  };

  // If success state is true, show success component
  if (successState) {
    return <PaymentSuccess onContinue={props.onSuccess} />;
  }

  return (
    <div className="w-full">
      <CardForm 
        paymentAmount={paymentAmount}
        ticketType={props.ticketType}
        isLoading={isLoading}
        disabled={!stripe || !elements || paymentAmount <= 0}
        cardError={cardError}
        onCardChange={handleCardChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default SimpleStripeCheckout;
