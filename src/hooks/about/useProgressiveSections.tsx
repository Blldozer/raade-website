
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
    
    // Safety timeout to ensure loading state doesn't get stuck
    const safetyTimeout = setTimeout(() => {
      if (!isMounted.current) return;
      
      console.log("Safety timeout triggered - forcing loading complete");
      setIsLoading(false);
      setPageInitialized(true);
      setActiveSection(5); // Show all sections
    }, 5000); // 5-second maximum wait time
    
    // Normal initialization with short delay
    const timer = setTimeout(() => {
      if (!isMounted.current) return;
      
      console.log("Initial loading complete, isMobile:", isMobile);
      setIsLoading(false);
      setPageInitialized(true);
      
      // On mobile, we'll progressively reveal sections
      if (isMobile) {
        console.log("Mobile detected, using progressive section loading");
        
        // Start revealing sections one by one
        const sectionTimer = setInterval(() => {
          if (!isMounted.current) {
            clearInterval(sectionTimer);
            return;
          }
          
          setActiveSection(prev => {
            const nextSection = prev + 1;
            console.log(`Activating section ${nextSection}`);
            
            if (nextSection >= 5) {
              console.log("All sections activated, clearing interval");
              clearInterval(sectionTimer);
            }
            return nextSection;
          });
        }, 800); // Delay between sections for better performance on mobile
        
        return () => {
          clearInterval(sectionTimer);
        };
      } else {
        // On desktop, show all sections immediately
        console.log("Desktop detected, showing all sections");
        setActiveSection(5);
      }
    }, 500);
    
    // Cleanup function to clear all timers
    return () => {
      clearTimeout(timer);
      clearTimeout(safetyTimeout);
    };
  }, [isMobile, isMounted, setActiveSection, setIsLoading, setPageInitialized]);
};
