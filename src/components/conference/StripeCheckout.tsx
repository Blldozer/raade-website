
import { useState, useEffect } from "react";
import { usePaymentIntent } from "./payment/usePaymentIntent";
import PaymentInitializer from "./payment/PaymentInitializer";
import LoadingIndicator from "./payment/LoadingIndicator";
import ErrorDisplay from "./payment/ErrorDisplay";

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
 * Handles payment processing through Stripe by:
 * - Creating a payment intent via our Supabase Edge Function
 * - Supporting Apple Pay and Google Pay payment methods
 * - Managing payment state and error handling
 * - Supporting retry functionality for failed payment intents
 */
const StripeCheckout = ({ 
  ticketType, 
  email,
  fullName,
  groupSize,
  onSuccess,
  onError 
}: StripeCheckoutProps) => {
  // Use the payment intent hook
  const {
    clientSecret,
    isLoading,
    amount,
    currency,
    isGroupRegistration,
    errorDetails,
    handleRetry
  } = usePaymentIntent({
    ticketType,
    email,
    fullName,
    groupSize,
    onError
  });

  // Loading state
  if (isLoading) {
    return <LoadingIndicator />;
  }

  // Error state
  if (errorDetails) {
    return (
      <ErrorDisplay 
        title="Payment Error" 
        details={errorDetails} 
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
    <PaymentInitializer
      clientSecret={clientSecret}
      email={email}
      onSuccess={onSuccess}
      onError={onError}
      amount={amount}
      currency={currency}
      isGroupRegistration={isGroupRegistration}
      groupSize={groupSize}
    />
  );
};

export default StripeCheckout;
