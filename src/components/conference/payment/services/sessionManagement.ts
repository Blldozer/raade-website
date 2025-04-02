
/**
 * Session Management Utilities
 * 
 * This file provides utility functions for managing payment session state:
 * - Generating unique session IDs
 * - Storing checkout data in session storage
 * - Loading checkout data from session storage
 * - Cleaning up session data
 * - Tracking payment attempts
 */

const SESSION_ID_KEY = "checkoutSessionId";
const REGISTRATION_EMAIL_KEY = "registrationEmail";
const PAYMENT_ATTEMPT_COUNT_KEY = "paymentAttemptCount";
const PAYMENT_COOLDOWN_KEY = "paymentCooldownTimestamp";
const MAX_PAYMENT_ATTEMPTS = 3;

/**
 * Generate a unique session ID for payment tracking
 * Uses a combination of timestamp and random characters
 * 
 * @returns Unique string ID
 */
export function generateUniqueSessionId(): string {
  const timestamp = Date.now();
  const randomChars = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${randomChars}`;
}

/**
 * Save checkout session data to session storage
 * 
 * @param sessionId Unique session identifier
 * @param email User's email address for verification
 */
export function saveCheckoutSession(sessionId: string, email: string): void {
  sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  sessionStorage.setItem(REGISTRATION_EMAIL_KEY, email);
}

/**
 * Store checkout session data in session storage
 * 
 * @param sessionId Unique session identifier 
 * @param email User's email address for verification
 */
export function storeCheckoutSession(sessionId: string, email: string): void {
  saveCheckoutSession(sessionId, email);
}

/**
 * Get the stored checkout session ID if it exists
 * 
 * @returns Session ID string or null if not found
 */
export function getCheckoutSessionId(): string | null {
  return sessionStorage.getItem(SESSION_ID_KEY);
}

/**
 * Get the stored registration email if it exists
 * 
 * @returns Registration email string or null if not found
 */
export function getRegistrationEmail(): string | null {
  return sessionStorage.getItem(REGISTRATION_EMAIL_KEY);
}

/**
 * Increment the payment attempt count
 * Used for limiting the number of attempts a user can make
 * 
 * @returns New attempt count
 */
export function incrementPaymentAttemptCount(): number {
  const currentCount = getPaymentAttemptCount();
  const newCount = currentCount + 1;
  sessionStorage.setItem(PAYMENT_ATTEMPT_COUNT_KEY, newCount.toString());
  return newCount;
}

/**
 * Get the current payment attempt count
 * 
 * @returns Current attempt count (default: 0)
 */
export function getPaymentAttemptCount(): number {
  const countStr = sessionStorage.getItem(PAYMENT_ATTEMPT_COUNT_KEY);
  return countStr ? parseInt(countStr, 10) : 0;
}

/**
 * Check if user has exceeded maximum payment attempts
 * 
 * @returns True if user has exceeded maximum attempts, false otherwise
 */
export function hasExceededMaxAttempts(): boolean {
  return getPaymentAttemptCount() >= MAX_PAYMENT_ATTEMPTS;
}

/**
 * Check if user is in payment cooldown period
 * 
 * @returns True if cooldown is active, false otherwise
 */
export function isInPaymentCooldown(): boolean {
  const cooldownTimestamp = sessionStorage.getItem(PAYMENT_COOLDOWN_KEY);
  if (!cooldownTimestamp) return false;
  
  const cooldownTime = parseInt(cooldownTimestamp, 10);
  const now = Date.now();
  
  // Cooldown period is active for 30 seconds
  return now - cooldownTime < 30000;
}

/**
 * Alias for isInPaymentCooldown to maintain compatibility with existing code
 */
export function isWithinPaymentCooldown(): boolean {
  return isInPaymentCooldown();
}

/**
 * Set payment cooldown timestamp
 */
export function setPaymentCooldown(): void {
  sessionStorage.setItem(PAYMENT_COOLDOWN_KEY, Date.now().toString());
}

/**
 * Clear all existing session data
 * Called after successful payment or when resetting the flow
 */
export function clearExistingSessionData(): void {
  sessionStorage.removeItem(SESSION_ID_KEY);
  sessionStorage.removeItem(REGISTRATION_EMAIL_KEY);
  sessionStorage.removeItem(PAYMENT_ATTEMPT_COUNT_KEY);
}

/**
 * Get diagnostic information about the current session state
 * Useful for debugging checkout flow issues
 * 
 * @returns Object with session state data
 */
export function getSessionDiagnostics() {
  return {
    hasSessionId: !!getCheckoutSessionId(),
    sessionId: getCheckoutSessionId(),
    registrationEmail: getRegistrationEmail(),
    attemptCount: getPaymentAttemptCount(),
    inCooldown: isInPaymentCooldown(),
    timestamp: new Date().toISOString()
  };
}

/**
 * Setup listeners for navigation events to clear session data when needed
 * Helps prevent abandoned checkout sessions
 */
export function setupNavigationListeners(): void {
  // When user navigates back (history.back), clear session
  window.addEventListener('popstate', () => {
    // Only clear if there's an active session
    if (getCheckoutSessionId()) {
      console.log("Navigation detected, cleaning up session");
      clearExistingSessionData();
    }
  });
  
  // When page is refreshed via reload
  window.addEventListener('beforeunload', () => {
    // Optionally clear data on page refresh
    // For now we keep it to support returning from Stripe
  });
}

/**
 * Detect if user navigated back from Stripe
 * 
 * @returns True if user appears to have navigated back, false otherwise
 */
export function detectBackNavigation(): boolean {
  // Check if we have performance navigation data
  if (window.performance && window.performance.getEntriesByType) {
    const navigationEntries = window.performance.getEntriesByType('navigation');
    
    if (navigationEntries && navigationEntries.length > 0) {
      const navEntry = navigationEntries[0] as any;
      
      // Check for back navigation
      if (navEntry && navEntry.type === 'back_forward') {
        return true;
      }
    }
  }
  
  // Check for session ID as fallback
  // If we have a session ID but no corresponding state in the current view,
  // it's likely a back navigation
  return !!getCheckoutSessionId();
}
