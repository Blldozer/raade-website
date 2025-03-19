
import { PaymentProvider } from "./PaymentContext";
import PaymentContentBody from "./PaymentContentBody";

/**
 * PaymentContent Component Props
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

/**
 * PaymentContent Component
 * 
 * Main container for payment flow that:
 * - Provides payment context to child components
 * - Renders the payment form body
 * - Passes success/error callbacks
 */
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
  // Create context value from props
  const contextValue = {
    email,
    amount,
    currency,
    isGroupRegistration,
    groupSize,
    requestId
  };

  return (
    <PaymentProvider value={contextValue}>
      <PaymentContentBody 
        clientSecret={clientSecret}
        onSuccess={onSuccess}
        onError={onError}
      />
    </PaymentProvider>
  );
};

export default PaymentContent;
