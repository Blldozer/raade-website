
import { useEffect } from 'react';

/**
 * Custom hook to handle progressive section loading
 * 
 * Features:
 * - Manages revealing sections gradually based on device type
 * - Includes safety timeout to prevent infinite loading state
 * - Optimized for mobile performance with staggered loading
 * - Provides clear logging for debugging
 * - Handles component unmounting gracefully
 */
export const useProgressiveSections = (
  isMobile: boolean,
  isMounted: { current: boolean },
  setActiveSection: (updater: ((prev: number) => number) | number) => void,
  setIsLoading: (isLoading: boolean) => void,
  setPageInitialized: (isInitialized: boolean) => void
) => {
  useEffect(() => {
    console.log("useProgressiveSections effect running with isMobile:", isMobile);
    
    // Safety timeout to ensure loading state doesn't get stuck - reduced from 5s to 3s
    const safetyTimeout = setTimeout(() => {
      if (!isMounted.current) return;
      
      console.log("Safety timeout triggered - forcing loading complete");
      setIsLoading(false);
      setPageInitialized(true);
      setActiveSection(5); // Show all sections
    }, 3000); // Reduced from 5000ms to 3000ms
    
    // Normal initialization with minimal delay - reduced from 500ms to 100ms
    const timer = setTimeout(() => {
      if (!isMounted.current) return;
      
      console.log("Initial loading complete, isMobile:", isMobile);
      setIsLoading(false);
      setPageInitialized(true);
      
      // On mobile, we'll progressively reveal sections
      if (isMobile) {
        console.log("Mobile detected, using progressive section loading");
        
        // Start revealing sections in parallel with shorter delays
        // Instead of sequential loading, we'll load sections with staggered timeouts
        setTimeout(() => {
          if (!isMounted.current) return;
          setActiveSection(1);
        }, 50); // First section almost immediately
        
        setTimeout(() => {
          if (!isMounted.current) return;
          setActiveSection(2);
        }, 150); // Second section after 150ms
        
        setTimeout(() => {
          if (!isMounted.current) return;
          setActiveSection(3);
        }, 300); // Third section after 300ms
        
        setTimeout(() => {
          if (!isMounted.current) return;
          setActiveSection(4);
        }, 450); // Fourth section after 450ms
        
        setTimeout(() => {
          if (!isMounted.current) return;
          setActiveSection(5);
        }, 600); // Last section after 600ms
      } else {
        // On desktop, show all sections immediately
        console.log("Desktop detected, showing all sections");
        setActiveSection(5);
      }
    }, 100); // Reduced from 500ms to 100ms
    
    // Cleanup function to clear all timers
    return () => {
      clearTimeout(timer);
      clearTimeout(safetyTimeout);
    };
  }, [isMobile, isMounted, setActiveSection, setIsLoading, setPageInitialized]);
};
