
import { useState, useEffect } from 'react';
import { useResponsive } from '../useResponsive';

/**
 * Custom hook to handle the About page initialization and loading state
 * Manages progressive section loading and error handling
 */
export const usePageInitialization = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [pageInitialized, setPageInitialized] = useState(false);
  const { isMobile } = useResponsive();
  
  // Function to set up error handling
  const setupErrorHandling = (isMounted: boolean) => {
    const handleGlobalError = (event: ErrorEvent) => {
      console.error("Captured global error:", event.error);
      
      if (isMounted) {
        setHasError(true);
        
        // Allow the page to still render content
        if (isLoading) {
          setIsLoading(false);
        }
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
