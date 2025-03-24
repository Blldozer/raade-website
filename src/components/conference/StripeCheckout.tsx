
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
  groupEmails?: Array<string | { value: string } | null>;
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
 * to Stripe's hosted checkout page.
 * 
 * Enhanced with:
 * - Fixed CORS header handling for cross-domain requests
 * - Improved error handling with specific error messages
 * - Better request validation and sanitization
 * - Detailed logging for easier troubleshooting
 * - Proper dark mode support for all devices
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
      
      // Validate required fields before proceeding
      if (!email || !fullName || !ticketType) {
        throw new Error("Missing required information. Please complete all fields.");
      }
      
      // Generate the success and cancel URLs
      const successUrl = `${window.location.origin}/conference/success?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${window.location.origin}/conference/register`;
      
      // Log the checkout attempt with more details for debugging
      console.log("Starting checkout process:", { 
        ticketType, 
        email, 
        fullName, 
        groupSize: typeof groupSize === 'number' ? groupSize : parseInt(String(groupSize) || '0'),
        totalEmails: groupEmails.length,
        requestId,
        attempt: retryCount + 1
      });
      
      // Process email list to ensure all values are valid
      const sanitizedGroupEmails = groupEmails
        .filter((email): email is (string | { value: string }) => {
          // Filter out null and undefined values
          return email !== null && email !== undefined;
        })
        .map(emailItem => {
          if (typeof emailItem === 'object' && emailItem.value !== undefined) {
            // Extract value from object format
            return emailItem.value;
          }
          // Return string directly
          return String(emailItem);
        })
        .filter(email => email.length > 0); // Filter out empty strings
      
      // Set timeout to catch long-running requests
      const timeoutId = setTimeout(() => {
        console.warn(`Checkout request taking longer than expected (${retryCount + 1})...`);
      }, 8000);
      
      // Use Supabase client to call the edge function with retry tracking
      const { data, error } = await supabase.functions.invoke(
        "create-checkout-session",
        {
          body: {
            ticketType,
            email,
            fullName,
            groupSize: typeof groupSize === 'number' ? groupSize : parseInt(String(groupSize) || '0'),
            groupEmails: sanitizedGroupEmails,
            organization,
            role,
            specialRequests,
            successUrl,
            cancelUrl,
            requestId,
            retryCount,
            timestamp: Date.now()
          }
        }
      );
      
      clearTimeout(timeoutId);
      
      if (error) {
        console.error(`Checkout error (Attempt ${retryCount + 1}, Request ID: ${requestId}):`, error);
        
        // Check if error is due to a previous session
        if (error.message?.includes('session') || 
            error.message?.includes('already exists') || 
            error.message?.includes('conflict')) {
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
            setTimeout(() => handleCheckout(), 1500);
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
      
      // Provide user-friendly error message based on error type
      let errorMessage = error.message || "There was an error starting the checkout process. Please try again.";
      
      // For network errors, suggest refreshing
      if (errorMessage.includes("network") || errorMessage.includes("connection")) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      }
      
      // For timeout errors, suggest trying again
      if (errorMessage.includes("timeout")) {
        errorMessage = "The request took too long to complete. Please try again.";
      }
      
      // Show error toast
      toast({
        title: "Checkout Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      onError(errorMessage);
    }
  };

  return (
    <div className="mt-6">
      <Button
        onClick={handleCheckout}
        disabled={isLoading}
        className="w-full bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white font-lora
          dark:bg-[#FBB03B] dark:hover:bg-[#FBB03B]/80 dark:text-white
          transition-colors duration-300"
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
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
        You'll be redirected to Stripe's secure payment page
      </p>
    </div>
  );
};

export default StripeCheckout;
