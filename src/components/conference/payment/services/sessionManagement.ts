
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
    // Store original values for logging
    const originalSessionId = sessionStorage.getItem("checkoutSessionId");
    const originalEmail = sessionStorage.getItem("registrationEmail");
    
    // Clear any checkout session IDs
    sessionStorage.removeItem("checkoutSessionId");
    sessionStorage.removeItem("registrationEmail");
    
    // Also clear any payment intent related data for clean transition
    sessionStorage.removeItem("paymentIntentId");
    
    // Log the operation for debugging
    console.log("Session data cleared:", { 
      hadSessionId: !!originalSessionId,
      sessionIdPrefix: originalSessionId ? originalSessionId.substring(0, 8) + '...' : null, 
      email: originalEmail ? originalEmail.substring(0, 3) + '***' : null
    });
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
    // Check if we're overwriting an existing session
    const existingSessionId = sessionStorage.getItem("checkoutSessionId");
    if (existingSessionId) {
      console.warn("Overwriting existing checkout session:", {
        old: existingSessionId.substring(0, 8) + '...',
        new: sessionId.substring(0, 8) + '...'
      });
    }
    
    sessionStorage.setItem("checkoutSessionId", sessionId);
    sessionStorage.setItem("registrationEmail", email);
    console.log("Saved checkout session ID to session storage:", {
      sessionIdPrefix: sessionId.substring(0, 8) + '...',
      email: email.substring(0, 3) + '***'
    });
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
  
  const handleBeforeUnload = () => {
    // Log the session state before page unload
    const sessionId = sessionStorage.getItem("checkoutSessionId");
    if (sessionId) {
      console.log("Page unloading with active session:", sessionId.substring(0, 8) + '...');
    }
  };

  window.addEventListener("pageshow", handlePageShow);
  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("beforeunload", handleBeforeUnload);
  
  // Return a cleanup function to remove the listeners
  return () => {
    window.removeEventListener("pageshow", handlePageShow);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
};

/**
 * Gets diagnostics info about the current session state
 * Useful for debugging session-related issues
 */
export const getSessionDiagnostics = (): Record<string, any> => {
  try {
    return {
      hasSessionId: !!sessionStorage.getItem("checkoutSessionId"),
      sessionIdPrefix: sessionStorage.getItem("checkoutSessionId")?.substring(0, 8) + '...',
      hasEmail: !!sessionStorage.getItem("registrationEmail"),
      browserType: navigator.userAgent,
      hasServiceWorker: 'serviceWorker' in navigator,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.warn("Error getting session diagnostics:", error);
    return { error: String(error) };
  }
};
