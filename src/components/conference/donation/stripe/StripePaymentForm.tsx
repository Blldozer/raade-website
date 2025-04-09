
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { AlertCircle } from "lucide-react";

interface StripePaymentFormProps {
  isSubmitting: boolean;
  error: string | null;
}

/**
 * StripePaymentForm Component
 * 
 * Displays a Stripe card element for payment processing:
 * - Captures credit card details securely
 * - Validates card information client-side
 * - Displays appropriate error states
 * - Returns card completion status to parent
 */
const StripePaymentForm: React.FC<StripePaymentFormProps> = ({ 
  isSubmitting,
  error
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardComplete, setCardComplete] = useState(false);
  
  // Handle card element changes to detect completion and errors
  const handleCardChange = (event: any) => {
    setCardComplete(event.complete);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Card Details
      </label>
      <div className={`p-4 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'} ${isSubmitting ? 'opacity-50' : ''}`}>
        {/* Removed the disabled prop as it's not supported by CardElement */}
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#32325d',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                '::placeholder': {
                  color: '#a0aec0',
                },
              },
              invalid: {
                color: '#e53e3e',
                iconColor: '#e53e3e',
              },
            },
            hidePostalCode: true,
          }}
          onChange={handleCardChange}
        />
      </div>
      
      {error && (
        <div className="mt-2 text-sm text-red-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          <span>{error}</span>
        </div>
      )}
      
      <div className="mt-2 text-xs text-gray-500">
        <p>Your payment information is securely processed by Stripe.</p>
        <p>We do not store your full card details on our servers.</p>
      </div>
    </div>
  );
};

export default StripePaymentForm;
