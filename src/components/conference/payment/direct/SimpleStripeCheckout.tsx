
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
 * - Ensures registration data is stored in Supabase
 * - Now with improved error handling and recovery
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
  const [successState, setSuccessState] = useState<boolean>(false);
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
  
  // Store registration data in Supabase
  const storeRegistrationData = async () => {
    try {
      console.log("Storing registration data in Supabase");
      
      const { data, error } = await supabase.functions.invoke("store-registration", {
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
          paymentComplete: true
        }
      });
      
      if (error) {
        console.error("Error storing registration data:", error);
        // Don't block the success flow, but log the error
        return false;
      }
      
      console.log("Registration data stored successfully:", data);
      return true;
    } catch (err) {
      console.error("Failed to store registration data:", err);
      return false;
    }
  };
  
  // Process the payment when user submits
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      try {
        toast({
          title: "Payment system not ready",
          description: "Please try again in a moment",
          variant: "destructive",
        });
      } catch (toastError) {
        console.error("Toast error:", toastError);
        // Fallback alert if toast fails
        alert("Payment system not ready. Please try again in a moment.");
      }
      return;
    }
    
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      try {
        toast({
          title: "Card input not found",
          description: "Please refresh the page and try again",
          variant: "destructive",
        });
      } catch (toastError) {
        console.error("Toast error:", toastError);
        // Fallback alert if toast fails
        alert("Card input not found. Please refresh the page and try again.");
      }
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
        console.error("Payment intent creation error:", intentError);
        throw new Error(intentError?.message || "Failed to create payment intent");
      }
      
      // Step 2: Confirm card payment with proper error handling
      const confirmResult = await stripe.confirmCardPayment(intentData.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: fullName,
            email: email,
          },
        },
      }).catch(err => {
        console.error("Stripe confirmation error:", err);
        throw new Error(err.message || "Payment confirmation failed");
      });
      
      if (confirmResult.error) {
        console.error("Payment confirmation error:", confirmResult.error);
        throw new Error(confirmResult.error.message || "Payment failed");
      }
      
      // Verify payment intent status
      if (confirmResult.paymentIntent?.status !== 'succeeded') {
        throw new Error(`Payment status: ${confirmResult.paymentIntent?.status || 'unknown'}`);
      }
      
      // Payment is successful at this point
      // Mark success state first before any other operations
      setSuccessState(true);
      
      // Step 3: Store registration data in Supabase
      try {
        const registrationStored = await storeRegistrationData();
        if (!registrationStored) {
          console.warn("Registration data storage failed but payment was successful");
          // We still consider this a success since payment completed
        }
      } catch (registrationError) {
        console.error("Registration storage error:", registrationError);
        // Continue to success flow even if registration storage fails
      }
      
      // Success notification with error handling
      try {
        toast({
          title: "Payment successful!",
          description: "Your registration is complete",
        });
      } catch (toastError) {
        console.error("Toast notification error:", toastError);
        // Fallback if toast fails - registration is still successful
      }
      
      // Call the success callback after a small delay to ensure state updates
      setTimeout(() => {
        onSuccess();
      }, 100);
      
    } catch (error) {
      console.error("Payment error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      
      try {
        toast({
          title: "Payment failed",
          description: errorMessage,
          variant: "destructive",
        });
      } catch (toastError) {
        console.error("Toast error handling payment failure:", toastError);
        // Fallback alert if toast fails
        alert(`Payment failed: ${errorMessage}`);
      }
      
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // If success state is true but we're still showing this component
  // (likely due to a failure in the success callback), show a fallback success message
  if (successState) {
    return (
      <div className="w-full rounded-lg bg-green-50 dark:bg-green-900/20 p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-700/30 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">Payment Successful!</h3>
        <p className="text-green-700 dark:text-green-400 mb-4">Your registration is complete.</p>
        <Button 
          onClick={onSuccess}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold"
        >
          Continue
        </Button>
      </div>
    );
  }

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
