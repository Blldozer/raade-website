
import { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { clearExistingSessionData, getPaymentAttemptCount, hasExceededMaxAttempts, isWithinPaymentCooldown, storeCheckoutSession } from "../services/sessionManagement";
import PaymentErrorHandler from "../PaymentErrorHandler";

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
 * - Prevents duplicate charges with multiple safeguards
 * - Provides real-time feedback to users
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
  const [processingError, setProcessingError] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  
  // Track submission to prevent duplicate charges
  const [hasSubmitted, setHasSubmitted] = useState(false);
  
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
          setProcessingError(`Failed to calculate payment amount: ${error.message}`);
          return;
        }
        
        if (data?.amount) {
          setPaymentAmount(data.amount);
        }
      } catch (err) {
        console.error("Failed to calculate payment amount:", err);
        setProcessingError(`Failed to calculate payment amount: ${err.message || "Unknown error"}`);
      }
    };
    
    // Clear any previous errors when component mounts
    setProcessingError(null);
    setCardError(null);
    setHasSubmitted(false);
    
    calculateAmount();
  }, [ticketType, groupSize]);

  // Handle card element changes to show validation errors
  const handleCardChange = (event: any) => {
    setCardError(event.error ? event.error.message : null);
  };
  
  // Store registration data in Supabase
  const storeRegistrationData = async (paymentIntentId: string) => {
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
          paymentComplete: true,
          paymentIntentId // Store the payment intent ID for reconciliation
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
    
    // Multiple submission prevention
    if (isLoading || hasSubmitted) {
      console.log("Payment already in progress or previously submitted");
      return;
    }
    
    // Check for payment cooldown
    if (isWithinPaymentCooldown()) {
      toast({
        title: "Please wait",
        description: "To prevent duplicate charges, please wait a few seconds before trying again.",
        variant: "default",
      });
      return;
    }
    
    // Check for too many attempts
    if (hasExceededMaxAttempts()) {
      toast({
        title: "Too many payment attempts",
        description: "For your security, we've limited the number of payment attempts. Please refresh the page to try again.",
        variant: "destructive",
      });
      return;
    }
    
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
    setHasSubmitted(true);
    setProcessingError(null);
    
    try {
      // Generate a unique payment ID to link attempts and prevent duplicates
      const uniquePaymentId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      setPaymentId(uniquePaymentId);
      
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
          groupEmails: processedGroupEmails,
          idempotencyKey: uniquePaymentId // Pass a unique ID to prevent duplicate charges
        }
      });
      
      if (intentError || !intentData?.clientSecret) {
        throw new Error(intentError?.message || "Failed to create payment intent");
      }
      
      // Track this checkout attempt
      storeCheckoutSession(uniquePaymentId, email);
      
      // Step 2: Confirm card payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(intentData.clientSecret, {
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
      
      // Step 3: Store registration data in Supabase
      await storeRegistrationData(paymentIntent?.id || uniquePaymentId);
      
      // Clear session data now that payment is complete
      clearExistingSessionData();
      
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
      
      // Store the error in state
      setProcessingError(errorMessage);
      
      // Also notify with toast
      toast({
        title: "Payment failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      onError(errorMessage);
      
      // Reset hasSubmitted to allow resubmission after error
      setHasSubmitted(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle retry after error
  const handleRetry = () => {
    setProcessingError(null);
    setHasSubmitted(false);
  };

  // Function to handle reset
  const handleReset = () => {
    onError("Payment cancelled - please start over");
  };

  return (
    <div className="w-full">
      {/* Show any processing errors */}
      {processingError && (
        <PaymentErrorHandler 
          error={processingError}
          onRetry={handleRetry}
          onReset={handleReset}
          attemptCount={getPaymentAttemptCount()}
        />
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Payment Information</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {ticketType === "student" ? "Student Ticket" : 
             ticketType === "professional" ? "Professional Ticket" : 
             ticketType === "special-bonus" ? "Special Bonus Ticket" :
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
          disabled={isLoading || !stripe || !elements || paymentAmount <= 0 || hasSubmitted || hasExceededMaxAttempts()}
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
