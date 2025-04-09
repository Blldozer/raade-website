
import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Loader2, AlertCircle } from "lucide-react";

interface StripePaymentFormProps {
  isSubmitting: boolean;
  error: string | null;
}

/**
 * StripePaymentForm Component
 * 
 * Renders the Stripe Card Element for secure payment collection
 * - Handles credit card input validation
 * - Displays appropriate error messages
 * - Shows loading state during submission
 */
const StripePaymentForm: React.FC<StripePaymentFormProps> = ({ 
  isSubmitting,
  error
}) => {
  const stripe = useStripe();
  const elements = useElements();

  // Card element styling to match the rest of the form
  const cardElementOptions = {
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
  };

  return (
    <div className="space-y-4">
      <FormField
        name="cardElement"
        render={() => (
          <FormItem>
            <FormLabel>Payment Information</FormLabel>
            <FormControl>
              <div className={`p-3 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'} transition-colors`}>
                <CardElement 
                  options={cardElementOptions}
                  disabled={isSubmitting}
                />
              </div>
            </FormControl>
            {error && (
              <div className="flex items-center mt-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>{error}</span>
              </div>
            )}
          </FormItem>
        )}
      />
      
      {isSubmitting && (
        <div className="flex items-center justify-center py-2">
          <Loader2 className="w-5 h-5 animate-spin text-gray-500 mr-2" />
          <span className="text-sm text-gray-500">Processing payment...</span>
        </div>
      )}
      
      <div className="text-xs text-gray-500 mt-2">
        <p>Your payment information is securely processed by Stripe.</p>
        <p className="mt-1">We do not store your card details on our servers.</p>
      </div>
    </div>
  );
};

export default StripePaymentForm;
