
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PaymentTotal from "./PaymentTotal";
import PaymentStatus from "./PaymentStatus";
import PaymentFormButtons from "./PaymentFormButtons";
import { usePaymentElements } from "./hooks/usePaymentElements";
import { usePaymentSubmission } from "./hooks/usePaymentSubmission";

import {
  PaymentElement,
  LinkAuthenticationElement,
  AddressElement
} from "@stripe/react-stripe-js";

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
      onSuccess();
    },
    onError,
    setMessage,
    requestId
  });

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
          <UseStripeElements 
            email={email} 
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

/**
 * UseStripeElements Component
 * 
 * Renders the Stripe form elements:
 * - Link Authentication Element
 * - Payment Element
 * - Address Element
 */
const UseStripeElements = ({ email }: { email: string }) => {
  return (
    <>
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
    </>
  );
};

export default PaymentForm;
