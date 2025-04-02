
/**
 * Session management utilities for payment checkout flow
 * Handles:
 * - Generating unique session IDs
 * - Storing and retrieving session data
 * - Clearing session data
 * - Session conflict detection
 * - Tracking attempts and enforcing limits
 */

// Constants
const MAX_PAYMENT_ATTEMPTS = 3;
const PAYMENT_COOLDOWN_MS = 15000; // 15 seconds cooldown between attempts

// Storage keys
const SESSION_ID_KEY = 'checkoutSessionId';
const EMAIL_KEY = 'registrationEmail';
const ATTEMPT_COUNT_KEY = 'paymentAttemptCount';
const LAST_ATTEMPT_TIME_KEY = 'lastPaymentAttemptTime';
const NAVIGATION_MARKER_KEY = 'navigationMarker';

/**
 * Generates a unique ID for session tracking
 */
export const generateUniqueSessionId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
};

/**
 * Saves checkout session data to storage
 */
export const saveCheckoutSession = (
  sessionId: string,
  email: string
): void => {
  sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  sessionStorage.setItem(EMAIL_KEY, email);
  
  // Track this attempt
  incrementAttemptCount();
  updateLastAttemptTime();
};

/**
 * Clears all existing session data from storage
 */
export const clearExistingSessionData = (): void => {
  sessionStorage.removeItem(SESSION_ID_KEY);
  sessionStorage.removeItem(EMAIL_KEY);
  // Don't clear attempt counts to enforce limits across sessions
};

/**
 * Increments the payment attempt counter
 */
export const incrementAttemptCount = (): void => {
  const currentCount = getAttemptCount();
  sessionStorage.setItem(ATTEMPT_COUNT_KEY, String(currentCount + 1));
};

/**
 * Gets the current attempt count
 */
export const getAttemptCount = (): number => {
  return parseInt(sessionStorage.getItem(ATTEMPT_COUNT_KEY) || '0', 10);
};

/**
 * Updates the timestamp of the last payment attempt
 */
export const updateLastAttemptTime = (): void => {
  sessionStorage.setItem(LAST_ATTEMPT_TIME_KEY, Date.now().toString());
};

/**
 * Gets the timestamp of the last payment attempt
 */
export const getLastAttemptTime = (): number => {
  return parseInt(sessionStorage.getItem(LAST_ATTEMPT_TIME_KEY) || '0', 10);
};

/**
 * Checks if the user has exceeded the maximum number of payment attempts
 */
export const hasExceededMaxAttempts = (): boolean => {
  return getAttemptCount() >= MAX_PAYMENT_ATTEMPTS;
};

/**
 * Checks if the user is within the payment cooldown period
 */
export const isInPaymentCooldown = (): boolean => {
  const lastAttemptTime = getLastAttemptTime();
  const currentTime = Date.now();
  return currentTime - lastAttemptTime < PAYMENT_COOLDOWN_MS;
};

/**
 * Gets diagnostic information about the current session
 */
export const getSessionDiagnostics = () => {
  return {
    sessionId: sessionStorage.getItem(SESSION_ID_KEY),
    email: sessionStorage.getItem(EMAIL_KEY),
    attemptCount: getAttemptCount(),
    lastAttemptTime: new Date(getLastAttemptTime()).toISOString(),
    isInCooldown: isInPaymentCooldown(),
    exceededMaxAttempts: hasExceededMaxAttempts(),
  };
};

/**
 * Detects if the user has navigated back from another page
 */
export const detectBackNavigation = (): boolean => {
  const marker = sessionStorage.getItem(NAVIGATION_MARKER_KEY);
  
  // Set a marker for future navigation checks
  sessionStorage.setItem(NAVIGATION_MARKER_KEY, 'true');
  
  // If the marker already existed, this is likely a back navigation
  return marker === 'true';
};

/**
 * Resets the attempt counter (for testing or admin use)
 */
export const resetAttemptCounter = (): void => {
  sessionStorage.removeItem(ATTEMPT_COUNT_KEY);
  sessionStorage.removeItem(LAST_ATTEMPT_TIME_KEY);
};
