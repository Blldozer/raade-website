
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
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
 * Handles direct card payment processing:
 * - Creates a payment intent using edge function
 * - Processes card payment through Stripe
 * - Prevents duplicate submissions
 * - Handles error cases gracefully
 */
const SimpleStripeCheckout = ({
  ticketType,
  email,
  fullName,
  groupSize,
  groupEmails,
  organization,
  role,
  specialRequests,
  referralSource,
  onSuccess,
  onError
}: SimpleStripeCheckoutProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();
  
  // Process group emails to ensure we have clean data
  const processedGroupEmails = Array.isArray(groupEmails) 
    ? groupEmails
        .filter(Boolean)
        .map(email => {
          if (typeof email === 'object' && email !== null && 'value' in email) {
            return typeof email.value === 'string' ? email.value : '';
          }
          return String(email || '');
        })
        .filter(email => email.length > 0)
    : [];
  
  // Calculate price based on ticket type and group size for display
  const getBasePrice = () => {
    const currentDate = new Date();
    const saleEndDate = new Date('2025-04-08T16:00:00-05:00');
    const isSaleActive = currentDate < saleEndDate;
    
    if (ticketType === "student") {
      return isSaleActive ? 2500 : 3500; // $25 or $35
    } else if (ticketType === "professional") {
      return isSaleActive ? 5000 : 6000; // $50 or $60
    } else if (ticketType === "student-group") {
      return (isSaleActive ? 2000 : 3000) * (groupSize || 3); // $20 or $30 per person
    }
    return 0;
  };
  
  const paymentAmount = getBasePrice();
  
  const handleCardChange = (event: any) => {
    // Show or clear error message based on card input validity
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError(null);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      onError("Payment system not available. Please try again later.");
      return;
    }
    
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      onError("Card input not found. Please refresh and try again.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log("Starting payment process for", ticketType);
      
      // 1. Calculate the payment amount using our edge function
      console.log("Calculating payment amount...");
      const { data: amountData, error: amountError } = await supabase.functions.invoke("calculate-payment-amount", {
        body: {
          ticketType,
          groupSize,
        }
      });
      
      if (amountError || !amountData) {
        console.error("Error calculating payment amount:", amountError);
        throw new Error(amountError?.message || "Failed to calculate payment amount");
      }
      
      console.log("Payment amount calculated:", amountData);
      
      // 2. Create payment intent
      console.log("Creating payment intent...");
      const { data: intentData, error: intentError } = await supabase.functions.invoke("create-payment-intent", {
        body: {
          ticketType,
          email,
          fullName,
          groupSize,
        }
      });
      
      if (intentError || !intentData?.clientSecret) {
        console.error("Payment intent creation error:", intentError);
        throw new Error(intentError?.message || "Failed to create payment intent");
      }
      
      console.log("Payment intent created");
      
      // 3. Confirm card payment
      console.log("Confirming card payment...");
      const confirmResult = await stripe.confirmCardPayment(intentData.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: fullName,
            email: email,
          },
        },
      });
      
      if (confirmResult.error) {
        console.error("Payment confirmation error:", confirmResult.error);
        throw new Error(confirmResult.error.message || "Payment failed");
      }
      
      // 4. Process success
      console.log("Payment successful:", confirmResult.paymentIntent?.id);
      
      // 5. Store registration data (optional, we can do this in the edge function too)
      try {
        await supabase.functions.invoke("store-registration", {
          body: {
            fullName,
            email,
            organization,
            role,
            ticketType,
            specialRequests,
            referralSource,
            groupSize,
            groupEmails: processedGroupEmails,
            paymentIntent: confirmResult.paymentIntent?.id,
            paymentComplete: true
          }
        });
        console.log("Registration data stored");
      } catch (registrationError) {
        console.error("Registration storage error:", registrationError);
        // Continue to success flow even if registration storage fails
      }
      
      onSuccess();
    } catch (error) {
      console.error("Payment processing error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full mt-4">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Payment Information</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {ticketType === "student" ? "Student Ticket" : 
               ticketType === "professional" ? "Professional Ticket" : 
              "Group Registration"} - ${paymentAmount / 100} USD
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
            
            <Button
              type="submit"
              disabled={isLoading || !stripe}
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
      </CardContent>
    </Card>
  );
};

export default SimpleStripeCheckout;
