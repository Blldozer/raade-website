import { useState } from 'react';
import { useResponsive } from '../useResponsive';

/**
 * Custom hook to handle the About page initialization
 * 
 * Features:
 * - Simplified to provide immediate content rendering without delays
 * - Maintains error handling for robustness
 * - No artificial loading states that would block content visibility
 * - Consistent with the behavior of other pages on the site
 */
export const usePageInitialization = () => {
  // Always set to initialized state immediately
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [pageInitialized, setPageInitialized] = useState(true);
  const { isMobile } = useResponsive();
  
  // Function to set up error handling
  const setupErrorHandling = (isMounted: boolean) => {
    const handleGlobalError = (event: ErrorEvent) => {
      console.error("Captured global error:", event.error);
      
      if (isMounted) {
        setHasError(true);
      }
      
      // Prevent the error from causing a white screen
      event.preventDefault();
      return true;
    };
    
    window.addEventListener('error', handleGlobalError);
    
    // Return cleanup function for the event listener
    return () => {
      window.removeEventListener('error', handleGlobalError);
    };
  };

  return {
    isLoading,
    setIsLoading,
    hasError,
    setHasError,
    pageInitialized,
    setPageInitialized,
    isMobile,
    setupErrorHandling
  };
};
