
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
import { AlertCircle } from "lucide-react";

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
  const [clientSecretError, setClientSecretError] = useState<boolean>(false);
  const isMountedRef = useRef(true);
  const successCalledRef = useRef(false);
  const errorCalledRef = useRef(false); // Track if error callback has been called
  
  // Get client secret from window object
  const getClientSecret = () => {
    const secret = (window as any).__stripeClientSecret;
    if (!secret) {
      console.error("Client secret is missing, cannot process payment");
      setClientSecretError(true);
      return null;
    }
    return secret;
  };
  
  // Check for client secret on component mount
  useEffect(() => {
    const clientSecret = getClientSecret();
    if (clientSecret) {
      console.log(`Payment form initialized with client secret (${requestId || 'unknown'})`);
    } else {
      console.error(`Missing client secret in payment form (${requestId || 'unknown'})`);
      
      // Check if we can recover the client secret from the URL (Stripe redirect flow)
      const urlParams = new URLSearchParams(window.location.search);
      const paymentIntentParam = urlParams.get('payment_intent');
      const clientSecretParam = urlParams.get('payment_intent_client_secret');
      
      if (paymentIntentParam && clientSecretParam) {
        console.log(`Recovered client secret from URL parameters (${requestId || 'unknown'})`);
        (window as any).__stripeClientSecret = clientSecretParam;
        return;
      }
      
      if (!errorCalledRef.current) {
        errorCalledRef.current = true;
        onError("Payment system configuration error. Please try again.");
      }
    }
  }, [requestId, onError]);
  
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
    getClientSecret,
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

  if (clientSecretError) {
    return (
      <div className="p-4 border rounded bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300">
        <div className="flex items-center space-x-2 mb-2">
          <AlertCircle className="h-5 w-5" />
          <h3 className="font-medium">Payment System Error</h3>
        </div>
        <p>The payment system could not be initialized. Missing payment authorization.</p>
        <p className="mt-2 text-sm">This could be due to browser security restrictions. Try using a different browser or disabling extensions.</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-white dark:bg-slate-800 border border-red-300 dark:border-red-700 rounded-md text-sm"
        >
          Try Again
        </button>
      </div>
    );
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
