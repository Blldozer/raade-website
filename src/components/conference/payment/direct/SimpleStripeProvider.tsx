
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../PaymentForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { TICKET_TYPES_ENUM, calculateTotalPrice } from "../../RegistrationFormTypes";
import { AlertCircle, Loader2 } from "lucide-react";

// Initialize Stripe with the production publishable key
const stripePromise = loadStripe(
  "pk_live_51QzaGsJCmIJg645X8x5sPqhMAiH4pXBh2e6mbgdxxwgqqsCfM8N7SiOvv98N2l5kVeoAlJj3ab08VG4c6PtgVg4d004QXy2W3m"
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
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [intentError, setIntentError] = useState<string | null>(null);
  const { toast } = useToast();

  // Create payment intent when component mounts
  useEffect(() => {
    const createIntent = async () => {
      setIsLoadingIntent(true);
      setIntentError(null);
      
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
          setIntentError(error.message || "Failed to create payment intent");
          throw new Error(error.message || "Failed to create payment intent");
        }
        
        // Check for client secret in the response for standard payments
        if (!data?.clientSecret && !data?.freeRegistration) {
          console.error(`Invalid payment intent response (${reqId}):`, data);
          setIntentError("Invalid payment intent response from server");
          throw new Error("Invalid payment intent response from server");
        }
        
        console.log(`Payment intent response received (${reqId}):`, {
          amount: data.amount,
          freeRegistration: data.freeRegistration || false,
          hasClientSecret: !!data.clientSecret
        });
        
        // Save client secret state
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          // Also save in window object for the payment confirmation process to use
          (window as any).__stripeClientSecret = data.clientSecret;
        }
        
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
        
        setIntentError(errorMessage);
        
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
          <Loader2
            className="animate-spin h-8 w-8 text-[#FBB03B] mx-auto mb-2"
          />
          <p>Setting up payment...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (intentError) {
    return (
      <div className="p-4 border rounded bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300">
        <div className="flex items-center space-x-2 mb-2">
          <AlertCircle className="h-5 w-5" />
          <h3 className="font-medium">Payment Setup Failed</h3>
        </div>
        <p>{intentError}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-white dark:bg-slate-800 border border-red-300 dark:border-red-700 rounded-md text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Success state but with no client secret (should not happen)
  if (!clientSecret && !intentError) {
    return (
      <div className="p-4 border rounded bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300">
        <div className="flex items-center space-x-2 mb-2">
          <AlertCircle className="h-5 w-5" />
          <h3 className="font-medium">Payment System Error</h3>
        </div>
        <p>The payment system returned an invalid response. Unable to create payment session.</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-white dark:bg-slate-800 border border-red-300 dark:border-red-700 rounded-md text-sm"
        >
          Try Again
        </button>
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
