
import { useEffect } from 'react';

/**
 * Custom hook to handle progressive section loading
 * Manages revealing sections gradually based on device type
 */
export const useProgressiveSections = (
  isMobile: boolean,
  isMounted: { current: boolean },
  setActiveSection: (updater: ((prev: number) => number) | number) => void,
  setIsLoading: (isLoading: boolean) => void,
  setPageInitialized: (isInitialized: boolean) => void
) => {
  useEffect(() => {
    // Initialize with a clearer approach - use a delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (!isMounted.current) return;
      
      console.log("Initial loading complete");
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
        }, 800); // Increased delay between sections for better performance on mobile
        
        return () => {
          clearInterval(sectionTimer);
        };
      } else {
        // On desktop, show all sections immediately
        console.log("Desktop detected, showing all sections");
        setActiveSection(5);
      }
    }, 500); // Increased initial delay for better reliability
    
    return () => {
      clearTimeout(timer);
    };
  }, [isMobile, isMounted, setActiveSection, setIsLoading, setPageInitialized]);
};
