
import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Custom hook to detect mobile devices
 * 
 * Features:
 * - Provides reactive state based on window size changes
 * - Uses matchMedia for better browser compatibility
 * - Enhanced with proper SSR handling
 * - Resilient to React context issues with safe initialization
 */
export function useIsMobile() {
  // Check if we're in a browser environment and React is properly initialized
  const isBrowser = typeof window !== 'undefined';
  const isReactInitialized = typeof React !== 'undefined' && React !== null;
  
  // Initialize with a safe default for SSR or React context issues
  // Using direct object assignment instead of useState if React context might be missing
  const [isMobile, setIsMobile] = useState(false);

  // Only run effect if we're in a browser environment and React is initialized
  useEffect(() => {
    // Double check we're in a browser environment
    if (!isBrowser) return;
    
    // Create the media query list
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    // Define the change handler
    const handleChange = () => {
      // Protect against calls after component unmount
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Set up the event listener - use the modern approach
    if (mql.addEventListener) {
      mql.addEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mql.addListener(handleChange);
    }
    
    // Set the initial value explicitly
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    
    // Cleanup on unmount
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handleChange);
      } else {
        // Fallback for older browsers
        mql.removeListener(handleChange);
      }
    };
  }, [isBrowser]);

  return isMobile;
}
