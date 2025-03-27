
import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Custom hook to detect mobile devices
 * 
 * Features:
 * - Provides reactive state based on window size changes
 * - Uses matchMedia for better browser compatibility
 * - Enhanced with proper SSR handling
 */
export function useIsMobile() {
  // Initialize with a safe default for SSR
  const [isMobile, setIsMobile] = useState(false);

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
  }, []);

  return isMobile;
}
