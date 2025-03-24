import { useState, useEffect } from 'react';
import { useResponsive } from '../useResponsive';

/**
 * Custom hook to handle the About page initialization and loading state
 * 
 * Features:
 * - Manages progressive section loading and error handling
 * - Provides failsafe mechanisms to prevent UI getting stuck
 * - Handles edge cases like slow network connections
 * - Properly tracks component lifecycle to prevent memory leaks
 */
export const usePageInitialization = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [pageInitialized, setPageInitialized] = useState(false);
  const { isMobile } = useResponsive();
  
  // Ultimate failsafe - ensure page renders eventually even if other mechanisms fail
  // Reduced from 8 seconds to 4 seconds
  useEffect(() => {
    const ultimateTimeout = setTimeout(() => {
      if (isLoading) {
        console.warn("Ultimate failsafe triggered - forcing render after timeout");
        setIsLoading(false);
        setPageInitialized(true);
      }
    }, 4000); // Reduced from 8000ms to 4000ms
    
    return () => clearTimeout(ultimateTimeout);
  }, [isLoading]);
  
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
