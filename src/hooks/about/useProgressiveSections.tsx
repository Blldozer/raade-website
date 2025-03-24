import { useEffect } from 'react';

/**
 * Custom hook for immediate section loading with no delay
 * 
 * Features:
 * - Sets all sections visible immediately
 * - No artificial delays or progressive loading
 * - Matches behavior of other site pages
 * - Prevents jerky scrolling and UI flashes
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
    // Log for debugging
    console.log("[DEBUG] useProgressiveSections with immediate display");
    
    // Immediately display all sections
    setIsLoading(false);
    setPageInitialized(true);
    setActiveSection(5); 
    
    // No timers or delayed loads needed
  }, [setIsLoading, setPageInitialized, setActiveSection]);
};
