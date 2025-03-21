
import { useState, useEffect } from "react";

/**
 * A simplified responsive hook for essential device detection
 * 
 * Features:
 * - Minimal dependencies to avoid initialization errors
 * - Sync initial state for immediate device detection  
 * - Handles SSR and React initialization issues gracefully
 */
export function useSimpleResponsive() {
  // Direct check for initial value with safe fallback
  const getInitialState = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  };
  
  const [isMobile, setIsMobile] = useState(getInitialState);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    // Function to check screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set up event listener
    window.addEventListener('resize', checkMobile);
    // Check immediately to ensure correct initial state
    checkMobile();
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Safe detection method that works even without hooks
  const isMobileUserAgent = typeof navigator !== 'undefined' && 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  return {
    isMobile,
    isMobileUserAgent,
    isTablet: typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: typeof window !== 'undefined' && window.innerWidth >= 1024
  };
}

export default useSimpleResponsive;
