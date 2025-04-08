
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PaymentTotal from "./PaymentTotal";
import PaymentStatus from "./PaymentStatus";
import PaymentFormButtons from "./PaymentFormButtons";
import { usePaymentElements } from "./hooks/usePaymentElements";
import { usePaymentSubmission } from "./hooks/usePaymentSubmission";
import { useStripePaymentIntentCheck } from "./hooks/useStripePaymentIntentCheck";
import PaymentFormElements from "./PaymentFormElements";

interface PaymentFormProps {
  email: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  amount: number;
  currency: string;
  isGroupRegistration?: boolean;
  groupSize?: number;
  requestId?: string | null;
}

/**
 * PaymentForm Component
 * 
 * Displays Stripe payment form with proper pricing information:
 * - For group registrations, shows both per-person and total cost
 * - For individual registrations, shows single ticket price
 * - Handles payment submission and error reporting
 * - Implements timeouts and automatic recovery
 * - Prevents duplicate success/error callbacks
 */
const PaymentForm = ({
  email,
  onSuccess,
  onError,
  amount,
  currency,
  isGroupRegistration,
  groupSize,
  requestId
}: PaymentFormProps) => {
  const [message, setMessage] = useState<string | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const isMountedRef = useRef(true);
  const successCalledRef = useRef(false);
  const errorCalledRef = useRef(false); // Track if error callback has been called
  
  // Store client secret in window for access by the payment confirmation process
  useEffect(() => {
    // This is a hack to pass the client secret to the confirmation process
    // A better approach would be to refactor to pass it directly
    if (typeof window !== 'undefined' && amount > 0) {
      console.log(`Setting up payment form for $${amount} (${requestId || 'unknown'})`);
    }
  }, [amount, requestId]);
  
  // Use custom hooks to manage Stripe elements and payment submission
  const { elements, stripe, isElementsLoading } = usePaymentElements();
  
  const { 
    isLoading, 
    isProcessing,
    handleSubmit 
  } = usePaymentSubmission({
    stripe,
    elements,
    email,
    onSuccess: () => {
      setMessage("Payment succeeded!");
      setPaymentCompleted(true);
      if (!successCalledRef.current) {
        successCalledRef.current = true;
        console.log(`Payment completed successfully (${requestId || 'unknown'})`);
        onSuccess();
      }
    },
    onError: (errorMsg) => {
      if (!errorCalledRef.current) {
        errorCalledRef.current = true;
        console.error(`Payment error (${requestId || 'unknown'}): ${errorMsg}`);
        onError(errorMsg);
        // Reset error called flag after a short delay to allow retries
        setTimeout(() => {
          errorCalledRef.current = false;
        }, 2000);
      }
    },
    setMessage,
    requestId
  });

  // Check for payment intent in URL (for redirect flow)
  useStripePaymentIntentCheck(
    stripe,
    () => {
      setMessage("Payment succeeded!");
      setPaymentCompleted(true);
      if (!successCalledRef.current) {
        successCalledRef.current = true;
        console.log(`Payment completed via redirect (${requestId || 'unknown'})`);
        onSuccess();
      }
    },
    () => setMessage("Your payment is processing."),
    (errorMsg) => {
      setMessage(errorMsg);
      if (!errorCalledRef.current) {
        errorCalledRef.current = true;
        console.error(`Payment error from redirect (${requestId || 'unknown'}): ${errorMsg}`);
        onError(errorMsg);
        // Reset error called flag after a short delay
        setTimeout(() => {
          errorCalledRef.current = false;
        }, 2000);
      }
    },
    isMountedRef,
    successCalledRef
  );

  // Clean up on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      console.log(`Payment form unmounting (${requestId || 'unknown'})`);
    };
  }, []);

  if (isElementsLoading) {
    return <div className="text-center p-4">Loading payment form...</div>;
  }

  return (
    <Card className="w-full mt-4">
      <CardContent className="pt-6">
        <PaymentTotal 
          amount={amount}
          currency={currency}
          isGroupRegistration={isGroupRegistration}
          groupSize={groupSize}
        />
        
        <form id="payment-form" onSubmit={handleSubmit}>
          <PaymentFormElements email={email} />
          
          <PaymentFormButtons 
            isLoading={isLoading}
            isDisabled={!stripe || !elements || isProcessing}
            paymentCompleted={paymentCompleted}
          />
          
          <PaymentStatus message={message} />
          
          {/* Add debugging info if requestId is available */}
          {requestId && (
            <div className="mt-2 text-xs text-gray-400 text-right">
              Request ID: {requestId}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
