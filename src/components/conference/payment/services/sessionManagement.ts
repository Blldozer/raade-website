
/**
 * Utilities for managing Stripe checkout sessions and preventing conflicts
 */

/**
 * Generate a unique session identifier to ensure request isolation
 * Combines timestamp with random values for uniqueness
 */
export const generateUniqueSessionId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  const uniqueId = `${timestamp}-${random}`;
  return uniqueId;
};

/**
 * Clears any existing checkout session data from browser storage
 * Should be called when starting a new checkout or when navigating back
 */
export const clearExistingSessionData = (): void => {
  try {
    // Clear any checkout session IDs
    sessionStorage.removeItem("checkoutSessionId");
    sessionStorage.removeItem("registrationEmail");
    
    // Also clear any payment intent related data for clean transition
    sessionStorage.removeItem("paymentIntentId");
    
    console.log("Successfully cleared existing session data");
  } catch (error) {
    console.warn("Failed to clear session data:", error);
  }
};

/**
 * Saves checkout session ID to session storage
 * @param sessionId - The Stripe checkout session ID
 * @param email - The customer's email address
 */
export const saveCheckoutSession = (sessionId: string, email: string): void => {
  try {
    sessionStorage.setItem("checkoutSessionId", sessionId);
    sessionStorage.setItem("registrationEmail", email);
    console.log("Saved checkout session ID to session storage");
  } catch (error) {
    console.warn("Failed to save session data:", error);
  }
};

/**
 * Checks if a checkout session already exists
 * @returns boolean indicating if there's an existing session
 */
export const hasExistingCheckoutSession = (): boolean => {
  try {
    const sessionId = sessionStorage.getItem("checkoutSessionId");
    return !!sessionId;
  } catch (error) {
    console.warn("Error checking for existing session:", error);
    return false;
  }
};

/**
 * Detect back navigation from Stripe
 * Uses performance navigation timing API when available
 * @returns boolean indicating if user navigated back
 */
export const detectBackNavigation = (): boolean => {
  try {
    if (window.performance && window.performance.getEntriesByType) {
      const navEntries = window.performance.getEntriesByType('navigation');
      if (navEntries.length > 0 && 'type' in navEntries[0]) {
        // Check if navigation type is 'back_forward'
        return (navEntries[0] as any).type === 'back_forward';
      }
    }
    
    // Fallback: check for Stripe-related URL parameters or referrer
    const hasStripeParams = window.location.search.includes('session_id') || 
                          window.location.search.includes('payment_intent');
    const fromStripe = document.referrer.includes('checkout.stripe.com');
    
    return hasStripeParams || fromStripe;
  } catch (error) {
    console.warn("Error detecting navigation type:", error);
    return false;
  }
};

/**
 * Register event listeners to handle page history events
 * Ensures session is properly cleaned up when navigating
 * @param cleanupCallback - Function to call when navigation is detected
 */
export const setupNavigationListeners = (cleanupCallback: () => void): () => void => {
  const handlePageShow = (event: PageTransitionEvent) => {
    if (event.persisted) {
      // Page is being restored from the bfcache (back navigation)
      console.log("Detected browser back navigation");
      clearExistingSessionData();
      cleanupCallback();
    }
  };
  
  const handleVisibilityChange = () => {
    // Additional check when page becomes visible again after being hidden
    if (document.visibilityState === "visible" && detectBackNavigation()) {
      console.log("Detected page visibility change after navigation");
      clearExistingSessionData();
      cleanupCallback();
    }
  };

  window.addEventListener("pageshow", handlePageShow);
  document.addEventListener("visibilitychange", handleVisibilityChange);
  
  // Return a cleanup function to remove the listeners
  return () => {
    window.removeEventListener("pageshow", handlePageShow);
    document.addEventListener("visibilitychange", handleVisibilityChange);
  };
};
