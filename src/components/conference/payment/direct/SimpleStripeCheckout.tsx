
import { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SimpleStripeCheckoutProps {
  ticketType: string;
  email: string;
  fullName: string;
  groupSize?: number;
  groupEmails?: Array<string | { value: string } | null>;
  organization?: string;
  role?: string;
  specialRequests?: string;
  referralSource?: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

/**
 * SimpleStripeCheckout Component
 * 
 * A streamlined Stripe checkout that directly processes payments in the page:
 * - Uses Stripe Elements for card input
 * - Processes payment without redirects
 * - Provides real-time feedback to users
 * - Reduces complexity with fewer moving parts
 */
const SimpleStripeCheckout = ({
  ticketType,
  email,
  fullName,
  groupSize,
  groupEmails = [],
  organization,
  role,
  specialRequests,
  referralSource,
  onSuccess,
  onError
}: SimpleStripeCheckoutProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [cardError, setCardError] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  
  // Process emails to handle array of objects or strings
  const processedGroupEmails = Array.isArray(groupEmails) 
    ? groupEmails
        .filter(Boolean) // Remove nullish values
        .map(email => {
          if (typeof email === 'object' && email !== null && 'value' in email) {
            return typeof email.value === 'string' ? email.value : '';
          }
          return String(email || '');
        })
        .filter(email => email.length > 0) // Remove empty strings
    : [];

  // Fetch payment amount when component mounts
  useEffect(() => {
    const calculateAmount = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("calculate-payment-amount", {
          body: { 
            ticketType,
            groupSize: groupSize || 0
          }
        });
        
        if (error) {
          console.error("Error calculating payment amount:", error);
          return;
        }
        
        if (data?.amount) {
          setPaymentAmount(data.amount);
        }
      } catch (err) {
        console.error("Failed to calculate payment amount:", err);
      }
    };
    
    calculateAmount();
  }, [ticketType, groupSize]);

  // Handle card element changes to show validation errors
  const handleCardChange = (event: any) => {
    setCardError(event.error ? event.error.message : null);
  };
  
  // Process the payment when user submits
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      toast({
        title: "Payment system not ready",
        description: "Please try again in a moment",
        variant: "destructive",
      });
      return;
    }
    
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast({
        title: "Card input not found",
        description: "Please refresh the page and try again",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Step 1: Create payment intent
      const { data: intentData, error: intentError } = await supabase.functions.invoke("create-direct-payment-intent", {
        body: {
          ticketType,
          email,
          fullName,
          groupSize,
          organization,
          role,
          specialRequests,
          referralSource,
          groupEmails: processedGroupEmails
        }
      });
      
      if (intentError || !intentData?.clientSecret) {
        throw new Error(intentError?.message || "Failed to create payment intent");
      }
      
      // Step 2: Confirm card payment
      const { error: stripeError } = await stripe.confirmCardPayment(intentData.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: fullName,
            email: email,
          },
        },
      });
      
      if (stripeError) {
        throw new Error(stripeError.message || "Payment failed");
      }
      
      // Success! Payment is complete
      toast({
        title: "Payment successful!",
        description: "Your registration is complete",
        variant: "default",
      });
      
      // Call the success callback
      onSuccess();
    } catch (error) {
      console.error("Payment error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      
      toast({
        title: "Payment failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Payment Information</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {ticketType === "student" ? "Student Ticket" : 
             ticketType === "professional" ? "Professional Ticket" : 
             "Group Registration"} - ${paymentAmount > 0 ? (paymentAmount / 100).toFixed(2) : "..."} USD
          </p>
          
          <div className="p-4 border rounded-md bg-white dark:bg-gray-800">
            <CardElement 
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#32325d',
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a',
                  },
                },
              }}
              onChange={handleCardChange}
              className="py-2"
            />
          </div>
          
          {cardError && (
            <p className="text-sm text-red-500">{cardError}</p>
          )}
        </div>
        
        <Button
          type="submit"
          disabled={isLoading || !stripe || !elements || paymentAmount <= 0}
          className="w-full bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white font-lora 
            dark:bg-[#FBB03B] dark:hover:bg-[#FBB03B]/80 dark:text-white
            transition-colors duration-300"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing Payment...
            </>
          ) : (
            <>Complete Payment</>
          )}
        </Button>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Secure payment processed by Stripe. Your card information is never stored on our servers.
        </p>
      </form>
    </div>
  );
};

export default SimpleStripeCheckout;
