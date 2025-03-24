
import { useState } from "react";
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
  const { toast } = useToast();

  // Create and redirect to checkout session
  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      
      // Generate the success and cancel URLs
      const successUrl = `${window.location.origin}/conference/success?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${window.location.origin}/conference/register`;
      
      // Log the checkout attempt
      console.log("Starting checkout process for:", { ticketType, email, fullName });
      
      // Use Supabase client to call the edge function instead of direct fetch
      const { data, error } = await supabase.functions.invoke(
        "create-checkout-session",
        {
          body: {
            ticketType,
            email,
            fullName,
            groupSize,
            groupEmails,
            organization,
            role,
            specialRequests,
            successUrl,
            cancelUrl
          }
        }
      );
      
      if (error) {
        console.error("Checkout error:", error);
        throw new Error(error.message || "Failed to create checkout session");
      }
      
      if (!data || !data.url) {
        throw new Error("No checkout URL returned");
      }
      
      console.log("Redirecting to Stripe Checkout:", data.url);
      
      // Store the session ID in sessionStorage for post-checkout verification
      sessionStorage.setItem("checkoutSessionId", data.sessionId);
      sessionStorage.setItem("registrationEmail", email);
      
      // Redirect to Stripe Checkout
      window.location.href = data.url;
      
    } catch (error) {
      console.error("Checkout error:", error);
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
