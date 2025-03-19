
import PaymentHandler from "./PaymentSuccessHandler";
import StripeElementsWrapper from "./StripeElementsWrapper";

/**
 * PaymentContentBody Component Props
 */
interface PaymentContentBodyProps {
  clientSecret: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

/**
 * PaymentContentBody Component
 * 
 * Handles the main payment content rendering:
 * - Sets up success/error handling
 * - Renders the Stripe Elements wrapper
 * 
 * @param clientSecret - Stripe client secret
 * @param onSuccess - Success callback
 * @param onError - Error callback
 */
const PaymentContentBody: React.FC<PaymentContentBodyProps> = ({
  clientSecret,
  onSuccess,
  onError
}) => {
  return (
    <div className="mt-4">
      <PaymentHandler 
        onSuccess={onSuccess}
        onError={onError}
      >
        {({ handleSuccess, handleError }) => (
          <StripeElementsWrapper 
            clientSecret={clientSecret}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        )}
      </PaymentHandler>
    </div>
  );
};

export default PaymentContentBody;
