/**
 * Session management utilities for payment processing
 * 
 * Handles session data, storage cleanup, and navigation detection
 * to prevent duplicate payments and improve error recovery
 */

// Key for storing payment session ID in session storage
const CHECKOUT_SESSION_ID_KEY = "checkoutSessionId";
// Key for storing email in session storage for retrieving confirmation
const REGISTRATION_EMAIL_KEY = "registrationEmail";
// Key for tracking payment attempts to prevent duplicates
const PAYMENT_ATTEMPTS_KEY = "paymentAttempts";
// Key for storing the last payment timestamp to prevent rapid re-submissions
const LAST_PAYMENT_TIMESTAMP = "lastPaymentTimestamp";

/**
 * Clear all payment session data from storage
 */
export function clearExistingSessionData(): void {
  sessionStorage.removeItem(CHECKOUT_SESSION_ID_KEY);
  sessionStorage.removeItem(REGISTRATION_EMAIL_KEY);
  sessionStorage.removeItem(PAYMENT_ATTEMPTS_KEY);
  // We keep the timestamp to enforce cooldown between attempts
}

/**
 * Store checkout session details
 * 
 * @param sessionId Stripe checkout session ID
 * @param email User's email for confirmation
 */
export function storeCheckoutSession(sessionId: string, email: string): void {
  sessionStorage.setItem(CHECKOUT_SESSION_ID_KEY, sessionId);
  sessionStorage.setItem(REGISTRATION_EMAIL_KEY, email);
  sessionStorage.setItem(LAST_PAYMENT_TIMESTAMP, Date.now().toString());
  
  // Track payment attempt count
  const attempts = getPaymentAttemptCount();
  sessionStorage.setItem(PAYMENT_ATTEMPTS_KEY, (attempts + 1).toString());
}

/**
 * Check if we're within the payment cooldown period to prevent rapid re-submission
 * 
 * @returns true if we need to enforce cooldown (too many attempts)
 */
export function isWithinPaymentCooldown(): boolean {
  const lastTimestamp = sessionStorage.getItem(LAST_PAYMENT_TIMESTAMP);
  if (!lastTimestamp) return false;
  
  const now = Date.now();
  const lastAttempt = parseInt(lastTimestamp);
  const timeDiff = now - lastAttempt;
  
  // Enforce a 5 second cooldown between payment attempts
  return timeDiff < 5000;
}

/**
 * Get the current payment attempt count
 * 
 * @returns Number of payment attempts in this session
 */
export function getPaymentAttemptCount(): number {
  const attempts = sessionStorage.getItem(PAYMENT_ATTEMPTS_KEY);
  return attempts ? parseInt(attempts) : 0;
}

/**
 * Check if we've exceeded the maximum number of payment attempts
 * 
 * @returns true if we've exceeded the maximum attempts
 */
export function hasExceededMaxAttempts(): boolean {
  return getPaymentAttemptCount() >= 2; // Max 2 attempts
}

/**
 * Reset the payment attempt counter
 */
export function resetPaymentAttempts(): void {
  sessionStorage.removeItem(PAYMENT_ATTEMPTS_KEY);
}

/**
 * Detect if the user is navigating back from a payment screen
 * 
 * @returns true if back navigation is detected
 */
export function detectBackNavigation(): boolean {
  if (typeof window === "undefined" || !window.performance) return false;
  
  const navigation = window.performance.getEntriesByType("navigation");
  if (navigation.length > 0 && navigation[0].type === "back_forward") {
    return true;
  }
  
  return false;
}

/**
 * Get diagnostics about the current session state
 * 
 * @returns Object with session diagnostics
 */
export function getSessionDiagnostics(): Record<string, any> {
  return {
    hasCheckoutSession: !!sessionStorage.getItem(CHECKOUT_SESSION_ID_KEY),
    hasEmail: !!sessionStorage.getItem(REGISTRATION_EMAIL_KEY),
    paymentAttempts: getPaymentAttemptCount(),
    lastPaymentTime: sessionStorage.getItem(LAST_PAYMENT_TIMESTAMP) || "none",
    cooldownActive: isWithinPaymentCooldown(),
    exceedsMaxAttempts: hasExceededMaxAttempts(),
    backNavigation: detectBackNavigation()
  };
}
