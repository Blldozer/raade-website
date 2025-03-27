
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  clearExistingSessionData, 
  generateUniqueSessionId,
  saveCheckoutSession
} from "../services/sessionManagement";

interface CheckoutRequestBody {
  ticketType: string;
  email: string;
  fullName: string;
  groupSize?: number;
  groupEmails?: Array<string>;
  organization?: string;
  role?: string;
  specialRequests?: string;
  referralSource?: string;
  successUrl: string;
  cancelUrl: string;
  requestId: string | null;
  retryCount: number;
  timestamp: number;
  sessionUniqueId: string;
}

interface CheckoutSubmissionOptions {
  retryCount: number;
  setRetryCount: (value: React.SetStateAction<number>) => void;
  requestId: string | null;
  setIsLoading: (value: React.SetStateAction<boolean>) => void;
  abortControllerRef: React.MutableRefObject<AbortController | null>;
  onSuccess: () => void;
  onError: (error: string) => void;
}

/**
 * Custom hook to handle checkout submission logic
 * 
 * Handles:
 * - Checkout request preparation and submission
 * - Error handling and retries
 * - Session data management
 */
export const useCheckoutSubmission = ({
  retryCount,
  setRetryCount,
  requestId,
  setIsLoading,
  abortControllerRef,
  onSuccess,
  onError
}: CheckoutSubmissionOptions) => {
  const { toast } = useToast();

  // Function to handle checkout retry after failure
  const retryCheckout = (handleCheckout: () => Promise<void>) => {
    if (retryCount < 3) { // Max 3 retries
      // Clear any stale session data
      clearExistingSessionData();
      
      // Generate a new request ID for this retry
      const newRequestId = generateUniqueSessionId();
      
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

  // Function to prepare checkout request body
  const prepareRequestBody = (
    ticketType: string,
    email: string,
    fullName: string,
    groupSize?: number,
    groupEmails?: Array<string | { value: string } | null>,
    organization?: string,
    role?: string,
    specialRequests?: string,
    referralSource?: string
  ): CheckoutRequestBody => {
    // Generate unique identifiers for cache busting and request tracking
    const sessionUniqueId = generateUniqueSessionId();
    const cacheBuster = `_${Date.now()}`;
    const successUrl = `${window.location.origin}/conference/success?session_id={CHECKOUT_SESSION_ID}&cb=${cacheBuster}`;
    const cancelUrl = `${window.location.origin}/conference/register?cb=${cacheBuster}`;
    
    // Process group emails to ensure they're in the correct format
    const processedGroupEmails = Array.isArray(groupEmails) ? 
      [...groupEmails].filter(Boolean).map(email => {
        if (typeof email === 'object' && email !== null && 'value' in email) {
          return email.value;
        }
        return String(email || '');
      }) : [];
    
    // Return the formatted request body
    return {
      ticketType,
      email,
      fullName,
      groupSize: typeof groupSize === 'number' ? groupSize : parseInt(String(groupSize) || '0'),
      groupEmails: processedGroupEmails,
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
  };

  // Main function to handle checkout submission
  const submitCheckout = async (
    ticketType: string,
    email: string,
    fullName: string,
    groupSize?: number,
    groupEmails?: Array<string | { value: string } | null>,
    organization?: string,
    role?: string,
    specialRequests?: string,
    referralSource?: string
  ) => {
    try {
      // Reset session data first to ensure clean state
      clearExistingSessionData();
      
      setIsLoading(true);
      
      // Validate required fields before proceeding
      if (!email || !fullName || !ticketType) {
        throw new Error("Missing required information. Please complete all fields.");
      }
      
      // Prepare request body
      const requestBody = prepareRequestBody(
        ticketType,
        email,
        fullName,
        groupSize,
        groupEmails,
        organization,
        role,
        specialRequests,
        referralSource
      );
      
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
        sessionUniqueId: requestBody.sessionUniqueId
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
          retryCheckout(async () => await submitCheckout(
            ticketType, email, fullName, groupSize, groupEmails,
            organization, role, specialRequests, referralSource
          ));
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
        setTimeout(() => retryCheckout(async () => await submitCheckout(
          ticketType, email, fullName, groupSize, groupEmails,
          organization, role, specialRequests, referralSource
        )), 1500);
        return;
      }
      
      // For timeout errors, suggest trying again
      if (errorMessage.includes("timeout")) {
        errorMessage = "The request took too long to complete. Retrying...";
        // Auto-retry on timeout
        setTimeout(() => retryCheckout(async () => await submitCheckout(
          ticketType, email, fullName, groupSize, groupEmails,
          organization, role, specialRequests, referralSource
        )), 1500);
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

  return { submitCheckout, retryCheckout };
};
