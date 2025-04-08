
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../PaymentForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { TICKET_TYPES_ENUM, calculateTotalPrice } from "../../RegistrationFormTypes";

// Initialize Stripe with the publishable key
const stripePromise = loadStripe(
  "pk_test_51OigB4EXKZmTl3KPeCVZAsmUJeJgkWVHZRF90cJHnjxjCRBazwWJhwYKLHO45Qp12wZGXPEY9LdC7C3Wl5G0rgb200b5kVNZtu"
);

interface SimpleStripeProviderProps {
  ticketType: string;
  email: string;
  fullName: string;
  groupSize?: number;
  groupEmails?: string[];
  organization?: string;
  role?: string;
  specialRequests?: string;
  referralSource?: string;
  couponCode?: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

/**
 * SimpleStripeProvider Component
 * 
 * Provides a simplified Stripe payment integration:
 * - Sets up Stripe Elements context
 * - Creates payment intent with appropriate amount
 * - Handles payment intent creation errors
 * - Includes coupon code information in payment intent
 */
const SimpleStripeProvider = ({
  ticketType,
  email,
  fullName,
  groupSize,
  groupEmails = [],
  organization,
  role,
  specialRequests,
  referralSource,
  couponCode,
  onSuccess,
  onError
}: SimpleStripeProviderProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("usd");
  const [isGroupRegistration, setIsGroupRegistration] = useState<boolean>(false);
  const [isLoadingIntent, setIsLoadingIntent] = useState<boolean>(true);
  const [requestId, setRequestId] = useState<string | null>(null);
  const { toast } = useToast();

  // Create payment intent when component mounts
  useEffect(() => {
    const createIntent = async () => {
      setIsLoadingIntent(true);
      // Generate a unique request ID for tracking
      const reqId = `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      setRequestId(reqId);
      
      try {
        console.log(`Creating payment intent (${reqId}):`, {
          ticketType,
          email,
          couponCode: couponCode || 'none'
        });
        
        const { data, error } = await supabase.functions.invoke("create-payment-intent", {
          body: {
            ticketType,
            email,
            fullName,
            groupSize: ticketType === TICKET_TYPES_ENUM.STUDENT_GROUP ? groupSize : undefined,
            couponCode,
            requestId: reqId
          }
        });
        
        if (error) {
          console.error(`Payment intent creation error (${reqId}):`, error);
          throw new Error(error.message || "Failed to create payment intent");
        }
        
        // Check for client secret in the response for standard payments
        if (!data?.clientSecret && !data?.freeRegistration) {
          console.error(`Invalid payment intent response (${reqId}):`, data);
          throw new Error("Invalid payment intent response from server");
        }
        
        console.log(`Payment intent response received (${reqId}):`, {
          amount: data.amount,
          freeRegistration: data.freeRegistration || false,
          hasClientSecret: !!data.clientSecret
        });
        
        // Set amount, currency and other details from the response
        setAmount(data.amount);
        setCurrency(data.currency || "usd");
        setIsGroupRegistration(data.isGroupRegistration);
        
        setIsLoadingIntent(false);
      } catch (err) {
        console.error(`Payment intent creation failed (${reqId}):`, err);
        setIsLoadingIntent(false);
        
        // Format a user-friendly error message
        const errorMessage = err instanceof Error 
          ? err.message 
          : "An unknown error occurred while setting up payment";
        
        // Show error toast
        toast({
          title: "Payment setup failed",
          description: errorMessage,
          variant: "destructive",
        });
        
        // Call error callback
        onError(errorMessage);
      }
    };
    
    createIntent();
  }, [ticketType, email, fullName, groupSize, couponCode, onError, toast]);

  // Loading state while creating payment intent
  if (isLoadingIntent) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse text-gray-500 dark:text-gray-400 text-center">
          <svg
            className="animate-spin h-8 w-8 text-[#FBB03B] mx-auto mb-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p>Setting up payment...</p>
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        email={email}
        onSuccess={onSuccess}
        onError={onError}
        amount={amount}
        currency={currency}
        isGroupRegistration={isGroupRegistration}
        groupSize={groupSize}
        requestId={requestId}
      />
    </Elements>
  );
};

export default SimpleStripeProvider;
