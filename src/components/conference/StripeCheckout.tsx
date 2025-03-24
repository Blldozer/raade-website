
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface StripeCheckoutProps {
  ticketType: string;
  email: string;
  fullName: string;
  groupSize?: number;
  groupEmails?: string[];
  organization?: string;
  role?: string;
  specialRequests?: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

/**
 * StripeCheckout Component - Stripe Checkout Implementation
 * 
 * Creates a checkout session using Supabase Edge Function and redirects
 * to Stripe's hosted checkout page rather than using Stripe Elements.
 * 
 * This approach:
 * - Simplifies implementation and reduces frontend code
 * - Provides a consistent, optimized checkout experience
 * - Supports more payment methods out of the box
 * - Handles mobile responsiveness automatically
 */
const StripeCheckout = ({
  ticketType,
  email,
  fullName,
  groupSize,
  groupEmails = [],
  organization,
  role,
  specialRequests,
  onSuccess,
  onError
}: StripeCheckoutProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [requestId, setRequestId] = useState<string | null>(null);
  const { toast } = useToast();

  // Effect to clear session storage on component mount
  // This helps prevent stale session data issues when users return
  useEffect(() => {
    // Clear any stale checkout session data from previous attempts
    if (sessionStorage.getItem("checkoutSessionId")) {
      console.log("Clearing stale checkout session data");
      sessionStorage.removeItem("checkoutSessionId");
      sessionStorage.removeItem("registrationEmail");
    }
    
    // Generate unique request ID for this checkout attempt
    const newRequestId = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setRequestId(newRequestId);
    
    return () => {
      // Cleanup function to check if we're navigating away
      if (isLoading) {
        console.log("Component unmounting while loading - possible navigation away from checkout");
      }
    };
  }, []);

  // Create and redirect to checkout session
  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      
      // Generate the success and cancel URLs
      const successUrl = `${window.location.origin}/conference/success?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${window.location.origin}/conference/register`;
      
      // Log the checkout attempt with more details for group registrations
      if (ticketType === "student-group") {
        console.log("Starting group checkout process:", { 
          ticketType, 
          email, 
          fullName, 
          groupSize,
          totalEmails: groupEmails.length,
          groupEmails,
          requestId,
          attempt: retryCount + 1
        });
      } else {
        console.log("Starting checkout process for:", { 
          ticketType, 
          email, 
          fullName,
          requestId,
          attempt: retryCount + 1 
        });
      }
      
      // Prepare sanitized group emails (ensure they're all strings)
      // Fixed: Add proper null checks and type guards
      const sanitizedGroupEmails = groupEmails
        .filter((emailItem): emailItem is string | { value: string } => {
          // Filter out null and undefined values
          return emailItem !== null && emailItem !== undefined;
        })
        .map(emailItem => {
          if (typeof emailItem === 'object' && emailItem !== null) {
            // If it's an object with a value property, extract the value safely
            return typeof emailItem.value === 'string' ? emailItem.value : '';
          }
          // If it's a string or can be converted to string safely
          return String(emailItem || '');
        })
        .filter(email => email.length > 0); // Filter out empty strings
      
      // Use Supabase client to call the edge function with retry tracking
      const { data, error } = await supabase.functions.invoke(
        "create-checkout-session",
        {
          body: {
            ticketType,
            email,
            fullName,
            groupSize,
            groupEmails: sanitizedGroupEmails,
            organization,
            role,
            specialRequests,
            successUrl,
            cancelUrl,
            requestId,
            retryCount
          }
        }
      );
      
      if (error) {
        console.error(`Checkout error (Attempt ${retryCount + 1}, Request ID: ${requestId}):`, error);
        
        // Check if error is due to a previous session
        if (error.message?.includes('session') || error.message?.includes('already exists')) {
          toast({
            title: "Previous checkout session detected",
            description: "Resetting session data and trying again...",
            variant: "default",
          });
          
          // Increment retry count and try again if under max retries
          if (retryCount < 2) { // Max 3 attempts (0, 1, 2)
            setRetryCount(prev => prev + 1);
            setIsLoading(false);
            // Short delay before retry
            setTimeout(() => handleCheckout(), 1000);
            return;
          }
        }
        
        throw new Error(error.message || "Failed to create checkout session");
      }
      
      if (!data || !data.url) {
        throw new Error("No checkout URL returned");
      }
      
      console.log(`Redirecting to Stripe Checkout (Attempt ${retryCount + 1}, Request ID: ${requestId}):`, data.url);
      
      // Store the session ID in sessionStorage for post-checkout verification
      sessionStorage.setItem("checkoutSessionId", data.sessionId);
      sessionStorage.setItem("registrationEmail", email);
      
      // Redirect to Stripe Checkout
      window.location.href = data.url;
      
    } catch (error) {
      console.error(`Checkout error (Attempt ${retryCount + 1}, Request ID: ${requestId}):`, error);
      setIsLoading(false);
      
      // Show error toast
      toast({
        title: "Checkout Failed",
        description: error.message || "There was an error starting the checkout process. Please try again.",
        variant: "destructive",
      });
      
      onError(error.message || "Checkout failed");
    }
  };

  return (
    <div className="mt-6">
      <Button
        onClick={handleCheckout}
        disabled={isLoading}
        className="w-full bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white font-lora"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Preparing Checkout...
          </>
        ) : (
          <>Proceed to Checkout</>
        )}
      </Button>
      <p className="text-xs text-gray-500 mt-2 text-center">
        You'll be redirected to Stripe's secure payment page
      </p>
    </div>
  );
};

export default StripeCheckout;
