
import { useCallback } from "react";
import LoadingIndicator from "./payment/LoadingIndicator";
import ErrorDisplay from "./payment/ErrorDisplay";
import PaymentContent from "./payment/PaymentContent";
import PaymentSuccessHandler from "./payment/PaymentSuccessHandler";
import { usePaymentIntent } from "./payment/hooks/usePaymentIntent";

interface StripeCheckoutProps {
  ticketType: string;
  email: string;
  fullName: string;
  groupSize?: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

/**
 * StripeCheckout Component
 * 
 * Orchestrates the payment flow by:
 * - Creating a payment intent via Supabase Edge Function
 * - Managing different states of the payment process
 * - Providing error handling and retry capabilities
 */
const StripeCheckout = ({ 
  ticketType, 
  email,
  fullName,
  groupSize,
  onSuccess,
  onError 
}: StripeCheckoutProps) => {
  // Use the payment intent hook for managing intent creation
  const {
    clientSecret,
    isLoading,
    amount,
    currency,
    isGroupRegistration,
    errorDetails,
    requestId,
    handleRetry
  } = usePaymentIntent({
    ticketType,
    email,
    fullName,
    groupSize,
    onSuccess,
    onError
  });

  // Handle payment error with retry capability
  const handlePaymentError = useCallback((error: string) => {
    // Only forward the error to parent if not already in error state
    if (!errorDetails) {
      onError(error);
    }
  }, [errorDetails, onError]);

  // Loading state
  if (isLoading) {
    return <LoadingIndicator />;
  }

  // Error state
  if (errorDetails) {
    // Include request ID in error if available
    const errorWithRequestId = requestId 
      ? `${errorDetails} (Request ID: ${requestId})` 
      : errorDetails;
      
    return (
      <ErrorDisplay 
        title="Payment Error" 
        details={errorWithRequestId} 
        onRetry={handleRetry} 
      />
    );
  }

  // Missing client secret state
  if (!clientSecret) {
    return (
      <ErrorDisplay 
        title="Payment Setup Failed" 
        details="We couldn't initialize the payment process. Please try again later." 
        onRetry={handleRetry} 
      />
    );
  }

  // Ready state - show payment form
  return (
    <PaymentSuccessHandler onSuccess={onSuccess}>
      {(handleSuccess) => (
        <PaymentContent 
          clientSecret={clientSecret}
          email={email}
          amount={amount}
          currency={currency}
          isGroupRegistration={isGroupRegistration}
          groupSize={groupSize}
          requestId={requestId}
          onSuccess={handleSuccess}
          onError={handlePaymentError}
        />
      )}
    </PaymentSuccessHandler>
  );
};

export default StripeCheckout;
