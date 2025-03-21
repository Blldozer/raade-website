
import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Custom hook to detect mobile devices
 * 
 * Features:
 * - Provides immediate initial value based on window.innerWidth
 * - Updates reactively when window size changes
 * - Uses matchMedia for better browser compatibility
 * - Enhanced error handling for React initialization issues
 * - Improved handling of SSR scenarios where window is undefined
 */
export function useIsMobile() {
  // Safely check window existence
  const windowExists = typeof window !== 'undefined';
  
  // Start with a definite value based on current window width if available
  const getInitialState = () => {
    if (!windowExists) return false;
    try {
      return window.innerWidth < MOBILE_BREAKPOINT;
    } catch (e) {
      console.warn("Error accessing window.innerWidth:", e);
      return false;
    }
  };
  
  // Use state with error handling
  const [isMobile, setIsMobile] = React.useState(getInitialState);

  React.useEffect(() => {
    try {
      // Ensure we're in a browser environment
      if (!windowExists) return;
      
      // Function to safely check mobile state
      const updateMobileState = () => {
        try {
          setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        } catch (e) {
          console.warn("Error updating mobile state:", e);
        }
      };
      
      // Safely create media query
      let mql;
      try {
        mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
      } catch (e) {
        console.warn("matchMedia not supported:", e);
      }
      
      // Define the change handler with error protection
      const onChange = () => {
        try {
          updateMobileState();
        } catch (e) {
          console.error("Error in resize handler:", e);
        }
      };
      
      // Safely add event listener
      if (mql) {
        try {
          mql.addEventListener("change", onChange);
        } catch (e) {
          // Fallback for older browsers
          try {
            window.addEventListener('resize', onChange);
          } catch (e2) {
            console.warn("Error setting up resize listeners:", e2);
          }
        }
      } else {
        // Fallback to resize if matchMedia failed
        try {
          window.addEventListener('resize', onChange);
        } catch (e) {
          console.warn("Error setting up resize listener:", e);
        }
      }
      
      // Set the initial value explicitly again to ensure consistency
      updateMobileState();
      
      // Cleanup on unmount
      return () => {
        try {
          if (mql) {
            mql.removeEventListener("change", onChange);
          } else {
            window.removeEventListener('resize', onChange);
          }
        } catch (e) {
          console.warn("Error removing event listener:", e);
        }
      };
    } catch (error) {
      console.error("Critical error in useIsMobile hook:", error);
      return undefined;
    }
  }, [windowExists]);

  return isMobile;
}
