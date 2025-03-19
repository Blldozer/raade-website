
import StripeElementsProvider from "./StripeElementsProvider";
import PaymentForm from "./PaymentForm";

/**
 * PaymentContent Component
 * 
 * Handles the display of the payment form with Stripe Elements:
 * - Sets up Stripe context with client secret
 * - Renders payment form with proper configuration
 * - Handles success and error callbacks
 */
interface PaymentContentProps {
  clientSecret: string;
  email: string;
  amount: number;
  currency: string;
  isGroupRegistration: boolean;
  groupSize?: number;
  requestId: string | null;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const PaymentContent: React.FC<PaymentContentProps> = ({
  clientSecret,
  email,
  amount,
  currency,
  isGroupRegistration,
  groupSize,
  requestId,
  onSuccess,
  onError
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
          requestId={requestId}
        />
      </StripeElementsProvider>
    </div>
  );
};

export default PaymentContent;
