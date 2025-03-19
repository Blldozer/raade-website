
import React from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  AddressElement
} from "@stripe/react-stripe-js";

interface PaymentFormElementsProps {
  email: string;
}

/**
 * PaymentFormElements Component
 * 
 * Renders the Stripe form elements:
 * - Link Authentication Element
 * - Payment Element
 * - Address Element
 * 
 * @param email - User's email to prefill in form elements
 */
const PaymentFormElements: React.FC<PaymentFormElementsProps> = ({ email }) => {
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

export default PaymentFormElements;
