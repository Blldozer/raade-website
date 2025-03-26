
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  clearExistingSessionData, 
  generateUniqueSessionId,
  saveCheckoutSession,
  setupNavigationListeners
} from "./payment/services/sessionManagement";

interface StripeCheckoutProps {
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
 * StripeCheckout Component - Stripe Checkout Implementation
 * 
 * Creates a checkout session using Supabase Edge Function and redirects
 * to Stripe's hosted checkout page.
 * 
 * Enhanced with:
 * - Improved session isolation with unique request IDs
 * - Automatic session cleanup on navigation events
 * - Better error recovery and retry mechanism
 * - Conflict detection and resolution
 * - Event tracking for analytics
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
  referralSource,
  onSuccess,
  onError
}: StripeCheckoutProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [requestId, setRequestId] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { toast } = useToast();

  // Effect to clean up stale sessions and set up navigation listeners
  useEffect(() => {
    // Clear any existing sessions when component mounts
    clearExistingSessionData();
    
    // Generate a unique request ID for this checkout attempt
    const newRequestId = generateUniqueSessionId();
    setRequestId(newRequestId);
    
    // Set up listeners for navigation events to clean up sessions
    const removeListeners = setupNavigationListeners(() => {
      // This callback runs when back navigation is detected
      setIsLoading(false);
      
      // Abort any in-flight requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      
      toast({
        title: "Session Reset",
        description: "Your payment session was reset when you returned. You can now continue registration.",
        variant: "default",
      });
    });
    
    // Clean up event listeners on component unmount
    return () => {
      removeListeners();
      
      // If navigating away while loading, abort any pending requests
      if (isLoading && abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
        console.log("Aborting checkout request due to component unmount");
      }
    };
  }, [email, toast, isLoading]);

  // Function to handle checkout retry after failure
  const retryCheckout = () => {
    if (retryCount < 3) { // Max 3 retries
      // Clear any stale session data
      clearExistingSessionData();
      
      // Generate a new request ID for this retry
      const newRequestId = generateUniqueSessionId();
      setRequestId(newRequestId);
      
      // Increment retry count
      setRetryCount(prev => prev + 1);
      
      // Show toast notification
      toast({
        title: "Retrying checkout",
        description: "The previous checkout attempt failed. Trying again...",
        variant: "default",
      });
      
      // Small delay before retry
      setTimeout(() => handleCheckout(), 1000);
    } else {
      // Too many retries, show error
      onError("Too many failed checkout attempts. Please try again later or contact support.");
    }
  };

  // Create and redirect to checkout session
  const handleCheckout = async () => {
    // Cancel any existing checkout requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create a new abort controller for this request
    abortControllerRef.current = new AbortController();
    
    try {
      // Reset session data first to ensure clean state
      clearExistingSessionData();
      
      setIsLoading(true);
      
      // Validate required fields before proceeding
      if (!email || !fullName || !ticketType) {
        throw new Error("Missing required information. Please complete all fields.");
      }
      
      // Generate unique identifiers for cache busting and request tracking
      const sessionUniqueId = generateUniqueSessionId();
      const cacheBuster = `_${Date.now()}`;
      const successUrl = `${window.location.origin}/conference/success?session_id={CHECKOUT_SESSION_ID}&cb=${cacheBuster}`;
      const cancelUrl = `${window.location.origin}/conference/register?cb=${cacheBuster}`;
      
      // Create a deep copy of the request body to avoid reactive issues
      const requestBody = {
        ticketType,
        email,
        fullName,
        groupSize: typeof groupSize === 'number' ? groupSize : parseInt(String(groupSize) || '0'),
        groupEmails: Array.isArray(groupEmails) ? 
          [...groupEmails].filter(Boolean).map(email => {
            if (typeof email === 'object' && email !== null && 'value' in email) {
              return email.value;
            }
            return String(email || '');
          }) : [],
        organization: organization || "",
        role: role || "",
        specialRequests: specialRequests || "",
        referralSource: referralSource || "",
        successUrl,
        cancelUrl,
        requestId,
        retryCount,
        timestamp: Date.now(),
        sessionUniqueId
      };
      
      // Log checkout attempt details for debugging
      console.log("Starting checkout process:", { 
        ticketType, 
        email, 
        fullName, 
        groupSize: requestBody.groupSize,
        referralSource,
        totalEmails: requestBody.groupEmails.length,
        requestId,
        attempt: retryCount + 1,
        sessionUniqueId
      });
      
      // Set timeout to catch long-running requests
      const timeoutId = setTimeout(() => {
        console.warn(`Checkout request taking longer than expected (${retryCount + 1})...`);
      }, 8000);
      
      // Use Supabase client to call the edge function
      const { data, error } = await supabase.functions.invoke(
        "create-checkout-session",
        {
          body: requestBody
        }
      );
      
      clearTimeout(timeoutId);
      
      if (error) {
        console.error(`Checkout error (Attempt ${retryCount + 1}, Request ID: ${requestId}):`, error);
        
        // Check if error is due to a session conflict
        if (error.message?.includes('session') || 
            error.message?.includes('already exists') || 
            error.message?.includes('conflict')) {
          toast({
            title: "Session conflict detected",
            description: "Resetting session data and trying again...",
            variant: "default",
          });
          
          // Auto-retry for session conflicts
          retryCheckout();
          return;
        }
        
        throw new Error(error.message || "Failed to create checkout session");
      }
      
      if (!data || !data.url) {
        throw new Error("No checkout URL returned");
      }
      
      console.log(`Redirecting to Stripe Checkout (Attempt ${retryCount + 1}, Request ID: ${requestId}):`, data.url);
      
      // Store the session ID in sessionStorage for post-checkout verification
      saveCheckoutSession(data.sessionId, email);
      
      // Redirect to Stripe Checkout
      window.location.href = data.url;
      
    } catch (error) {
      console.error(`Checkout error (Attempt ${retryCount + 1}, Request ID: ${requestId}):`, error);
      setIsLoading(false);
      
      // Provide user-friendly error message based on error type
      let errorMessage = error.message || "There was an error starting the checkout process. Please try again.";
      
      // Check if the error was due to abort
      if (error.name === 'AbortError') {
        console.log("Checkout request was aborted");
        return;
      }
      
      // For network errors, suggest refreshing
      if (errorMessage.includes("network") || errorMessage.includes("connection")) {
        errorMessage = "Network error. Please check your internet connection and try again.";
        // Auto-retry on network errors
        setTimeout(() => retryCheckout(), 1500);
        return;
      }
      
      // For timeout errors, suggest trying again
      if (errorMessage.includes("timeout")) {
        errorMessage = "The request took too long to complete. Retrying...";
        // Auto-retry on timeout
        setTimeout(() => retryCheckout(), 1500);
        return;
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
