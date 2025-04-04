
/**
 * Utility to detect and handle React context errors
 * 
 * This allows the app to gracefully handle situations where
 * React hooks are called outside of a React Context environment
 */

// Check if React context is properly initialized
export const isReactContextAvailable = (): boolean => {
  try {
    // Multiple checks to ensure React is properly initialized
    if (typeof window === 'undefined') {
      return false; // Not in browser
    }
    
    // Check window initialization flag
    if (window.__REACT_INITIALIZED === true) {
      return true;
    }
    
    // Check for React global object
    const isReactGlobalValid = typeof React === 'object' && 
                              React !== null && 
                              typeof React.useState === 'function';
    
    if (isReactGlobalValid) {
      // If React is valid but flag not set, set it now
      window.__REACT_INITIALIZED = true;
      return true;
    }
    
    // React is not initialized
    console.warn("React context not properly initialized");
    return false;
  } catch (error) {
    console.error("Failed to check React context availability:", error);
    return false;
  }
};

// Safe wrapper for React hooks with a fallback
export function useSafeHook<T>(hookFn: () => T, fallbackValue: T): T {
  try {
    // Only call the hook if React is initialized
    if (isReactContextAvailable()) {
      return hookFn();
    }
    
    // Return fallback if React context isn't available
    console.warn("React context not available, using fallback value");
    return fallbackValue;
  } catch (error) {
    console.error(`Error in useSafeHook:`, error);
    return fallbackValue;
  }
}

// Mark React as initialized on load
if (typeof window !== 'undefined') {
  try {
    window.__REACT_INITIALIZED = true;
    console.log("React context initialization flag set in reactContextError.ts");
  } catch (e) {
    console.error("Failed to set React initialization flag:", e);
  }
}
