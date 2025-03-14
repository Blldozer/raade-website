
import { useState, useEffect, useLayoutEffect } from 'react';
import { useResponsive } from './useResponsive';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook to manage the About page state and logic
 * Handles section loading, errors, and mobile-specific behavior
 */
export const useAboutPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [pageInitialized, setPageInitialized] = useState(false);
  const { isMobile } = useResponsive();
  const navigate = useNavigate();
  
  // Set the initial background to dark immediately for the hero section
  // This ensures light navbar (white text) against the dark hero background
  useLayoutEffect(() => {
    document.body.setAttribute('data-nav-background', 'dark');
  }, []);
  
  // Initialize the page and set up error handling
  useEffect(() => {
    // Set document attributes for navigation styling (dark = light navbar for hero)
    document.body.setAttribute('data-nav-background', 'dark');
    
    // Add debugging information
    console.log("About page mounted with isMobile:", isMobile);
    
    // Force a document title change to verify the page has loaded
    document.title = "About RAADE";
    
    // Add error handling for unhandled errors
    const handleGlobalError = (event: ErrorEvent) => {
      console.error("Captured global error:", event.error);
      setHasError(true);
      
      // Allow the page to still render content
      if (isLoading) {
        setIsLoading(false);
      }
      
      // Prevent the error from causing a white screen
      event.preventDefault();
      return true;
    };
    
    window.addEventListener('error', handleGlobalError);
    
    // Initialize with a clearer approach
    const timer = setTimeout(() => {
      console.log("Initial loading complete");
      setIsLoading(false);
      setPageInitialized(true);
      
      // On mobile, we'll progressively reveal sections
      if (isMobile) {
        console.log("Mobile detected, using progressive section loading");
        // Start revealing sections one by one
        const sectionTimer = setInterval(() => {
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
        
        return () => clearInterval(sectionTimer);
      } else {
        // On desktop, show all sections immediately
        console.log("Desktop detected, showing all sections");
        setActiveSection(5);
      }
    }, 500); // Increased initial delay for better reliability
    
    // Clean up all resources and listeners when unmounting
    return () => {
      console.log("About page unmounted");
      document.title = "RAADE";
      clearTimeout(timer);
      window.removeEventListener('error', handleGlobalError);
      
      // Reset any navigation-related attributes
      document.body.removeAttribute('data-nav-background');
    };
  }, [isMobile, isLoading]);

  // Handle navigation via the logo to prevent blank screen issues
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Force a clean navigation state
    navigate("/", { replace: true });
  };

  return {
    isLoading,
    activeSection,
    hasError,
    pageInitialized,
    isMobile,
    handleLogoClick
  };
};
