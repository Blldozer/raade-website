
import { useState, useEffect } from "react";
import { 
  CardElement, 
  useStripe, 
  useElements,
  Elements
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Load stripe outside of components to avoid recreating it
const stripePromise = loadStripe("pk_live_51QzaGsJCmIJg645X8x5sPqhMAiH4pXBh2e6mbgdxxwgqqsCfM8N7SiOvv98N2l5kVeoAlJj3ab08VG4c6PtgVg4d004QXy2W3m");

interface StripeCheckoutProps {
  donationValues: {
    amount: string;
    customAmount?: string;
    fullName: string;
    email: string;
    message?: string;
    makeAnonymous?: boolean;
  };
  onPaymentSuccess: (values: any) => void;
  onPaymentError: (error: string) => void;
}

// Wrapper component that provides Stripe context
export const StripeCheckoutProvider: React.FC<StripeCheckoutProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <StripeCheckoutForm {...props} />
    </Elements>
  );
};

// Inner component that handles payment processing
const StripeCheckoutForm: React.FC<StripeCheckoutProps> = ({
  donationValues,
  onPaymentSuccess,
  onPaymentError
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Calculate donation amount in cents
  const getDonationAmountInCents = (): number => {
    if (donationValues.amount === "custom" && donationValues.customAmount) {
      return Math.round(parseFloat(donationValues.customAmount) * 100);
    }
    return parseInt(donationValues.amount) * 100;
  };

  // Initialize payment intent when component mounts
  useEffect(() => {
    const createPaymentIntent = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      
      try {
        const amountInCents = getDonationAmountInCents();
        
        if (isNaN(amountInCents) || amountInCents < 100) {
          throw new Error("Invalid donation amount. Minimum donation is $1.");
        }
        
        // Call our Supabase edge function to create a payment intent
        const { data, error } = await supabase.functions.invoke('process-donation', {
          body: {
            amount: amountInCents,
            email: donationValues.email,
            fullName: donationValues.fullName,
            makeAnonymous: donationValues.makeAnonymous,
            message: donationValues.message || "",
          }
        });
        
        if (error) {
          console.error("Donation processing error:", error);
          throw new Error(error.message || "Failed to process donation");
        }
        
        if (!data || !data.clientSecret) {
          throw new Error("No payment details returned from server");
        }
        
        setClientSecret(data.clientSecret);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        setErrorMessage(errorMessage);
        onPaymentError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    
    createPaymentIntent();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements || !clientSecret) {
      // Stripe.js has not loaded yet or client secret is missing
      return;
    }
    
    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      setErrorMessage("Card element not found. Please refresh the page and try again.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Confirm the card payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: donationValues.fullName,
            email: donationValues.email,
          },
        },
      });
      
      if (error) {
        throw error;
      }
      
      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment succeeded
        onPaymentSuccess(donationValues);
      } else {
        // Payment is processing or requires further action
        setErrorMessage("Your payment is being processed. Please do not close this page.");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      setErrorMessage(error.message || "An error occurred during payment processing");
      onPaymentError(error.message || "Payment failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Card Information</p>
          <div className={`p-3 border rounded-md ${errorMessage ? 'border-red-500' : 'border-gray-300'}`}>
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
            />
          </div>
          
          {errorMessage && (
            <div className="flex items-center text-red-500 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
        
        <Button 
          type="submit" 
          disabled={!stripe || isLoading || !clientSecret}
          className="w-full bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Donate ${donationValues.amount === "custom" && donationValues.customAmount 
              ? `$${parseFloat(donationValues.customAmount).toFixed(2)}` 
              : `$${donationValues.amount}`
            }`
          )}
        </Button>
        
        <div className="text-xs text-gray-500 mt-2">
          <p>Your payment information is securely processed by Stripe.</p>
          <p className="mt-1">We do not store your card details on our servers.</p>
        </div>
      </form>
    </div>
  );
};

export default StripeCheckoutProvider;
