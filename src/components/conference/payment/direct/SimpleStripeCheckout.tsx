import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertCircle, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { clearExistingSessionData, hasExceededMaxAttempts, isInPaymentCooldown } from "../services/sessionManagement";
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
 * SimpleStripeCheckout Component - Streamlined Checkout Experience
 * 
 * A simplified version of our checkout flow that:
 * - Directly calls Supabase Edge Function to create checkout session
 * - Redirects user to Stripe's hosted checkout page
 * - Handles errors and provides user feedback
 * - Enforces rate limiting to prevent abuse
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
  onError,
}: SimpleStripeCheckoutProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    clearExistingSessionData();
    
    if (hasExceededMaxAttempts()) {
      setError("Too many payment attempts. Please try again later.");
    }
  }, []);

  const handleCheckout = async () => {
    setError(null);
    
    if (hasExceededMaxAttempts()) {
      setError("Too many payment attempts. Please try again later.");
      return;
    }
    
    if (isInPaymentCooldown()) {
      setError("Please wait a moment before trying again.");
      return;
    }

    setIsLoading(true);
    setAttemptCount(prev => prev + 1);

    try {
      const cacheBuster = `_${Date.now()}`;
      const successUrl = `${window.location.origin}/conference/success?cb=${cacheBuster}`;
      const cancelUrl = `${window.location.origin}/conference/register?cb=${cacheBuster}`;

      const processedEmails = groupEmails
        .filter(Boolean)
        .map(email => {
          if (typeof email === 'object' && email !== null && 'value' in email) {
            return email.value;
          }
          return String(email || '');
        })
        .filter(email => email.length > 0);

      const checkoutData = {
        ticketType,
        email,
        fullName,
        groupSize,
        groupEmails: processedEmails,
        organization,
        role,
        specialRequests,
        referralSource,
        successUrl,
        cancelUrl
      };

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(checkoutData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      onError(errorMessage);
      
      toast({
        variant: "destructive",
        title: "Checkout Error",
        description: errorMessage,
      });
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <PaymentErrorHandler
          error={error}
          onRetry={handleCheckout}
          onReset={() => {
            clearExistingSessionData();
            setError(null);
          }}
          attemptCount={attemptCount}
        />
      )}
      
      <Button
        onClick={handleCheckout}
        disabled={isLoading || hasExceededMaxAttempts()}
        className="w-full bg-[#274675] hover:bg-[#274675]/90 text-white font-lora
          dark:bg-[#274675] dark:hover:bg-[#274675]/80 dark:text-white
          transition-colors duration-300"
      >
        {isLoading ? (
          <>Processing...</>
        ) : (
          <>
            Proceed to Payment
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
      
      <div className="flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
        <HelpCircle className="h-3 w-3 mr-1" />
        <span>Secure payment via Stripe</span>
      </div>
    </div>
  );
};

export default SimpleStripeCheckout;
