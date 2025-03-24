
import { useEffect } from 'react';

/**
 * Custom hook to handle progressive section loading
 * 
 * Features:
 * - Loads all sections immediately once the page is initialized
 * - Ensures all content is visible regardless of device or network conditions
 * - Simplified loading logic to prevent conflicts with navigation
 * - Improved debug logging for troubleshooting
 */
export const useProgressiveSections = (
  isMobile: boolean,
  isMounted: { current: boolean },
  setActiveSection: (updater: ((prev: number) => number) | number) => void,
  setIsLoading: (isLoading: boolean) => void,
  setPageInitialized: (isInitialized: boolean) => void,
  preloaded: boolean
) => {
  useEffect(() => {
    console.log("[DEBUG] useProgressiveSections effect running with isMobile:", isMobile);
    
    if (preloaded) {
      // IMMEDIATE LOADING: Set all sections visible right away
      console.log("[DEBUG] Preloaded: Setting initial states immediately");
      setIsLoading(false);
      setPageInitialized(true);
      
      // Set activeSection to 5 to ensure all sections can be scrolled to
      // This doesn't control rendering anymore (fixed in AboutSections.tsx)
      setActiveSection(5);
    } else {
      // Safety timeout to ensure loading state doesn't get stuck - just 1.5s now
      const safetyTimeout = setTimeout(() => {
        if (!isMounted.current) return;
        
        console.log("Safety timeout triggered - ensuring all sections are visible");
        setIsLoading(false);
        setPageInitialized(true);
        
        // Set to maximum value for complete navigation capability
        setActiveSection(5);
      }, 1500); // Reduced from 3000ms to 1500ms
      
      // Normal initialization with minimal delay - just 50ms now
      const timer = setTimeout(() => {
        if (!isMounted.current) return;
        
        console.log("Initial loading complete, enabling all sections");
        setIsLoading(false);
        setPageInitialized(true);
        
        // This is now safe since AboutSections will render ALL sections
        // regardless of activeSection value once pageInitialized is true
        setActiveSection(5);
        
      }, 50); // Minimal delay to ensure page is ready
      
      // Cleanup function to clear all timers
      return () => {
        clearTimeout(timer);
        clearTimeout(safetyTimeout);
      };
    }
  }, [isMobile, isMounted, setActiveSection, setIsLoading, setPageInitialized, preloaded]);
};
