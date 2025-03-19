
import * as React from "react"

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
  
  const [isMobile, setIsMobile] = React.useState(getInitialState);

  React.useEffect(() => {
    // Ensure we're in a browser environment
    if (typeof window === 'undefined') return;
    
    // Create the media query list
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    // Define the change handler
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Set up the event listener
    mql.addEventListener("change", onChange);
    
    // Set the initial value explicitly again to ensure consistency
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    
    // Cleanup on unmount
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
