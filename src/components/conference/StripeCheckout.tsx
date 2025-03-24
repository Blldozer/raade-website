
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import LoadingIndicator from "./payment/LoadingIndicator";
import ErrorDisplay from "./payment/ErrorDisplay";
import { useToast } from "@/hooks/use-toast";

interface StripeCheckoutProps {
  ticketType: string;
  email: string;
  fullName: string;
  groupSize?: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

/**
 * StripeCheckout Component using Stripe Checkout
 * 
 * Replaces the previous Elements-based implementation with a simpler
 * redirect flow to Stripe Checkout page:
 * - Creates a checkout session via Supabase Edge Function
 * - Redirects user to Stripe-hosted checkout page
 * - Provides better mobile experience and broader payment method support
 */
const StripeCheckout = ({ 
  ticketType, 
  email,
  fullName,
  groupSize,
  onSuccess,
  onError 
}: StripeCheckoutProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Create and redirect to Stripe Checkout
  const handleCheckout = useCallback(async () => {
    setIsLoading(true);
    setErrorDetails(null);
    
    try {
      // Get the origin for success/cancel URLs
      const origin = window.location.origin;
      const successUrl = `${origin}/conference/registration/success?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${origin}/conference/registration`;
      
      console.log("Creating checkout session for:", { ticketType, email, fullName, groupSize });
      
      // Call the Supabase Edge Function to create a checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          ticketType,
          email,
          fullName,
          groupSize,
          successUrl,
          cancelUrl
        }
      });
      
      if (error) {
        console.error("Error creating checkout session:", error);
        setErrorDetails(`Failed to initialize payment: ${error.message || "Unknown error"}`);
        onError(error.message || "Failed to initialize payment");
        return;
      }
      
      // Save the request ID for error reporting
      if (data.requestId) {
        setRequestId(data.requestId);
      }
      
      // Check if we got a valid checkout URL
      if (!data.url) {
        console.error("No checkout URL returned:", data);
        setErrorDetails("Payment system returned an invalid response. Please try again later.");
        onError("Payment system returned an invalid response");
        return;
      }
      
      // Store registration data in session storage to retrieve after payment
      sessionStorage.setItem('conference_registration', JSON.stringify({
        email,
        fullName,
        ticketType,
        groupSize,
        timestamp: new Date().toISOString()
      }));
      
      // Redirect to Stripe Checkout
      console.log("Redirecting to Stripe Checkout:", data.url);
      window.location.href = data.url;
      
    } catch (error) {
      console.error("Unexpected error during checkout:", error);
      setErrorDetails(`An unexpected error occurred: ${error.message || "Unknown error"}`);
      onError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [ticketType, email, fullName, groupSize, onError]);
  
  // Handle retry when there's an error
  const handleRetry = useCallback(() => {
    setErrorDetails(null);
    setRequestId(null);
    handleCheckout();
  }, [handleCheckout]);
  
  // In case of errors, show error display with retry button
  if (errorDetails) {
    const errorWithRequestId = requestId 
      ? `${errorDetails} (Request ID: ${requestId})` 
      : errorDetails;
      
    return (
      <ErrorDisplay 
        title="Payment Error" 
        details={errorWithRequestId} 
        onRetry={handleRetry} 
      />
    );
  }
  
  // Show loading indicator while creating session
  if (isLoading) {
    return <LoadingIndicator message="Preparing checkout..." />;
  }
  
  // Show checkout button when ready
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 mb-4">
        You'll be redirected to Stripe's secure payment page to complete your registration.
      </p>
      
      <Button
        onClick={handleCheckout}
        className="w-full bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white font-medium"
      >
        Proceed to Secure Checkout
      </Button>
    </div>
  );
};

export default StripeCheckout;
