
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { usePaymentAmount } from "./hooks/usePaymentAmount";
import CardForm from "./components/CardForm";
import { useCardPayment } from "./hooks/useCardPayment";
import PaymentError from "./components/PaymentError";

interface SimpleStripeCheckoutProps {
  ticketType: string;
  email: string;
  fullName: string;
  groupSize?: number;
  groupEmails?: string[];
  organization?: string;
  role?: string;
  specialRequests?: string;
  referralSource?: string;
  couponCode?: string;  // Add the couponCode prop
  couponDiscount?: { type: 'percentage' | 'fixed'; amount: number } | null;  // Add the couponDiscount prop
  onSuccess: () => void;
  onError: (error: string) => void;
}

/**
 * SimpleStripeCheckout Component
 * 
 * A streamlined checkout component for direct payment processing:
 * - Manages payment amount calculation
 * - Handles card payment processing
 * - Shows accurate pricing based on ticket type and sale status
 * - Provides clear error messages and retry options
 */
const SimpleStripeCheckout = ({
  ticketType,
  email,
  fullName,
  groupSize,
  groupEmails = [],
  organization = "",
  role = "",
  specialRequests = "",
  referralSource = "",
  couponCode = "",  // Add default value
  couponDiscount = null,  // Add default value
  onSuccess,
  onError
}: SimpleStripeCheckoutProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [attemptId] = useState<string>(`${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  
  // Get payment amount from the edge function
  const { 
    paymentAmount, 
    isLoading: isLoadingAmount, 
    error: amountError, 
    saleActive 
  } = usePaymentAmount(ticketType, groupSize);
  
  // Handle card payment logic
  const { 
    handleSubmit, 
    isLoading: isSubmitting, 
    cardError, 
    handleCardChange, 
    setCardComplete,
    resetCardError
  } = useCardPayment({
    ticketType,
    email,
    fullName,
    groupSize,
    groupEmails,
    organization,
    role,
    specialRequests,
    referralSource,
    couponCode,  // Pass couponCode to useCardPayment
    couponDiscount,  // Pass couponDiscount to useCardPayment
    onSuccess,
    onError: setErrorMessage,
    attemptId
  });
  
  // Forward error to parent component
  useEffect(() => {
    if (errorMessage) {
      onError(errorMessage);
    }
  }, [errorMessage, onError]);

  // Handle amount calculation error
  useEffect(() => {
    if (amountError) {
      setErrorMessage(`Error calculating payment amount: ${amountError}`);
    }
  }, [amountError]);
  
  if (isLoadingAmount) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-gray-500">Calculating payment amount...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <PaymentError 
        message={errorMessage}
        onRetry={() => {
          resetCardError();
          setErrorMessage(null);
        }}
      />
    );
  }
  
  if (paymentAmount === 0 && !isLoadingAmount && !amountError) {
    return <div className="text-red-500 p-4">Error loading payment information. Please try again later.</div>;
  }

  return (
    <CardForm
      paymentAmount={paymentAmount}
      ticketType={ticketType}
      isLoading={isSubmitting}
      disabled={paymentAmount === 0 || isSubmitting}
      cardError={cardError}
      onCardChange={(e) => {
        handleCardChange(e);
        setCardComplete(e.complete);
      }}
      onSubmit={handleSubmit}
      saleActive={saleActive}
    />
  );
};

export default SimpleStripeCheckout;
