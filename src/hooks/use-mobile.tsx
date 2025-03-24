
import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Custom hook to detect mobile devices
 * 
 * Features:
 * - Provides immediate initial value based on window.innerWidth
 * - Updates reactively when window size changes
 * - Uses matchMedia for better browser compatibility
 * - Handles SSR scenarios where window is undefined
 */
export function useIsMobile() {
  // Start with a definite value based on current window width if available
  const getInitialState = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < MOBILE_BREAKPOINT;
  };
  
  const [isMobile, setIsMobile] = useState(getInitialState());

  useEffect(() => {
    // Ensure we're in a browser environment
    if (typeof window === 'undefined') return;
    
    // Create the media query list
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    // Define the change handler
    const handleChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Set up the event listener - use the modern approach
    if (mql.addEventListener) {
      mql.addEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mql.addListener(handleChange);
    }
    
    // Set the initial value explicitly again to ensure consistency
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
  }, []);

  return isMobile;
}
