
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  clearExistingSessionData, 
  generateUniqueSessionId,
  setupNavigationListeners
} from "../services/sessionManagement";

/**
 * Custom hook to manage checkout state and lifecycle
 * 
 * Handles:
 * - Loading state and retry mechanism
 * - Session management and cleanup
 * - Navigation event handling
 * - Request abort controller management
 */
export const useCheckoutState = () => {
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
  }, [toast, isLoading]);

  const resetCheckoutState = () => {
    // Clear any existing checkout requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create a new abort controller for this request
    abortControllerRef.current = new AbortController();
  };

  return {
    isLoading,
    setIsLoading,
    retryCount,
    setRetryCount,
    requestId,
    setRequestId,
    abortControllerRef,
    resetCheckoutState
  };
};
