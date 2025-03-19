
import { useState, useEffect, useRef } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
  AddressElement
} from "@stripe/react-stripe-js";

import { Card, CardContent } from "@/components/ui/card";
import PaymentTotal from "./payment/PaymentTotal";
import PaymentStatus from "./payment/PaymentStatus";
import PaymentFormButtons from "./payment/PaymentFormButtons";

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
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Use refs to track if callbacks have been fired to prevent duplicates
  const successCalledRef = useRef(false);
  const errorCalledRef = useRef(false);
  // Track if component is mounted
  const isMountedRef = useRef(true);

  // Set a timeout for card processing
  const PAYMENT_PROCESSING_TIMEOUT = 30000; // 30 seconds
  // Track the current payment timeout
  const paymentTimeoutRef = useRef<number | null>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      // Clear any pending timeouts
      if (paymentTimeoutRef.current) {
        clearTimeout(paymentTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    // When returning from a redirect, check payment status
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!isMountedRef.current) return;
      
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          if (!successCalledRef.current) {
            successCalledRef.current = true;
            setPaymentCompleted(true);
            onSuccess();
          }
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, onSuccess]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    if (isProcessing) {
      console.log("Payment already processing, ignoring duplicate submission");
      return;
    }

    setIsLoading(true);
    setIsProcessing(true);
    
    // Set a timeout for the payment processing
    if (paymentTimeoutRef.current) {
      clearTimeout(paymentTimeoutRef.current);
    }
    
    const timeoutId = setTimeout(() => {
      if (isMountedRef.current) {
        console.warn("Payment processing timed out after", PAYMENT_PROCESSING_TIMEOUT, "ms");
        setMessage("The payment is taking longer than expected. Please check your card details and try again.");
        setIsLoading(false);
        setIsProcessing(false);
        
        if (!errorCalledRef.current) {
          errorCalledRef.current = true;
          onError("Payment processing timed out. Please try again with a different payment method.");
        }
      }
    }, PAYMENT_PROCESSING_TIMEOUT);
    
    paymentTimeoutRef.current = timeoutId as unknown as number;

    try {
      console.log("Starting payment confirmation...");
      
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
          receipt_email: email,
          payment_method_data: {
            billing_details: { email }
          }
        },
        redirect: "if_required"
      });
      
      // Clear the timeout since we got a response
      if (paymentTimeoutRef.current) {
        clearTimeout(paymentTimeoutRef.current);
        paymentTimeoutRef.current = null;
      }
      
      if (!isMountedRef.current) return;

      if (error) {
        // This point will only be reached if there's an immediate error when confirming the payment.
        console.error("Payment error:", error.type, error.message);
        
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message || "An unexpected error occurred");
          
          if (!errorCalledRef.current) {
            errorCalledRef.current = true;
            onError(error.message || "An unexpected error occurred");
          }
        } else {
          const errorMessage = `Payment error (${error.type}): ${error.message}`;
          console.error(errorMessage);
          setMessage("An unexpected error occurred");
          
          if (!errorCalledRef.current) {
            errorCalledRef.current = true;
            // Include request ID if available
            const errorWithRequestId = requestId 
              ? `${errorMessage} (Request ID: ${requestId})` 
              : errorMessage;
            onError(errorWithRequestId);
          }
        }
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // The payment has been processed!
        setMessage("Payment succeeded!");
        setPaymentCompleted(true);
        
        if (!successCalledRef.current) {
          successCalledRef.current = true;
          onSuccess();
        }
      } else if (paymentIntent) {
        // Payment requires additional actions or is in another state
        console.log("Payment intent is in state:", paymentIntent.status);
        switch (paymentIntent.status) {
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          case "requires_action":
            setMessage("Additional verification required. Please follow the prompts.");
            break;
          default:
            setMessage(`Payment status: ${paymentIntent.status}`);
        }
      } else {
        // Shouldn't normally get here
        console.warn("No payment intent or error returned");
        setMessage("Something went wrong with your payment. Please try again.");
        
        if (!errorCalledRef.current) {
          errorCalledRef.current = true;
          onError("Payment failed: No payment confirmation received");
        }
      }
    } catch (unexpectedError) {
      // Clear the timeout
      if (paymentTimeoutRef.current) {
        clearTimeout(paymentTimeoutRef.current);
        paymentTimeoutRef.current = null;
      }
      
      if (!isMountedRef.current) return;
      
      console.error("Unexpected error during payment:", unexpectedError);
      setMessage("An unexpected error occurred during payment processing");
      
      if (!errorCalledRef.current) {
        errorCalledRef.current = true;
        onError("An unexpected error occurred: " + (unexpectedError.message || "Unknown error"));
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
        setIsProcessing(false);
      }
    }
  };

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
          <LinkAuthenticationElement 
            id="link-authentication-element"
            options={{
              defaultValues: { email }
            }}
          />
          
          <PaymentElement 
            id="payment-element" 
            options={{
              layout: "tabs",
              defaultValues: {
                billingDetails: {
                  email: email
                }
              }
            }}
            className="mb-6 mt-4"
          />
          
          <AddressElement 
            options={{
              mode: 'billing',
              fields: {
                phone: 'always',
              },
              validation: {
                phone: {
                  required: 'always',
                },
              },
            }}
            className="mb-6"
          />
          
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
