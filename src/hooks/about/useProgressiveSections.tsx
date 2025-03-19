import { useEffect } from 'react';

/**
 * Custom hook to handle progressive section loading
 * 
 * Features:
 * - Loads all sections immediately on desktop
 * - Uses short, parallel loading for mobile to ensure all content appears quickly
 * - Avoids the previous issue where content was being cut off
 * - Includes improved logging for debugging
 * - Ensures all sections are visible regardless of device or network conditions
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
      // IMMEDIATE LOADING: Set sections visible right away
      console.log("[DEBUG] Setting initial states immediately to ensure content visibility");
      setIsLoading(false);
      setPageInitialized(true);
      setActiveSection(5); // Force all sections to be visible
    } else {
      // Safety timeout to ensure loading state doesn't get stuck - just 1.5s now
      const safetyTimeout = setTimeout(() => {
        if (!isMounted.current) return;
        
        console.log("Safety timeout triggered - ensuring all sections are visible");
        setIsLoading(false);
        setPageInitialized(true);
        setActiveSection(5); // Show all sections - critical to ensure full page is visible
      }, 1500); // Reduced from 3000ms to 1500ms
      
      // Normal initialization with minimal delay - just 50ms now
      const timer = setTimeout(() => {
        if (!isMounted.current) return;
        
        console.log("Initial loading complete, showing all sections immediately");
        setIsLoading(false);
        setPageInitialized(true);
        
        // Important change: Load ALL sections immediately regardless of device
        // This ensures nothing is missing from the page
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
