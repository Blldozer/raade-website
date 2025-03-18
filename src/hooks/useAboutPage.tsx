import { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { useResponsive } from './useResponsive';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Custom hook to manage the About page state and logic
 * Handles section loading, errors, and mobile-specific behavior
 * Improved error handling and navigation stability
 * Fixed context initialization and cleanup
 */
export const useAboutPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [pageInitialized, setPageInitialized] = useState(false);
  const { isMobile } = useResponsive();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Set the initial background to dark immediately for the hero section
  // This ensures light navbar (white text) against the dark hero background
  useLayoutEffect(() => {
    console.log("useAboutPage: Setting initial dark background");
    try {
      document.body.setAttribute('data-nav-background', 'dark');
      
      // Add a class to body to indicate we're on the about page
      // This helps with styling and context detection
      document.body.classList.add('about-page');
    } catch (error) {
      console.error("Could not set nav background:", error);
    }
    
    // Return cleanup function
    return () => {
      try {
        document.body.classList.remove('about-page');
      } catch (error) {
        console.error("Error cleaning up about page class:", error);
      }
    };
  }, []);
  
  // Function to scroll to a specific section
  const scrollToSection = useCallback((sectionId: string) => {
    console.log(`Attempting to scroll to section: ${sectionId}`);
    
    // Map section IDs to their indices in the sections array
    const sectionMap: {[key: string]: number} = {
      'approach': 3,  // Our Approach is the 3rd section (0-indexed)
      'impact': 4,    // Our Impact is the 4th section
      'team': 5       // Team is the 5th section
    };
    
    // Set the active section to ensure it's loaded
    if (sectionMap[sectionId]) {
      setActiveSection(sectionMap[sectionId]);
      
      // Wait for the section to be rendered
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          console.log(`Scrolling to element: #${sectionId}`);
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          console.warn(`Element #${sectionId} not found after setting active section`);
        }
      }, 500); // Give it time to render
    } else {
      console.warn(`Unknown section ID: ${sectionId}`);
    }
  }, []);
  
  // Initialize the page and set up error handling
  useEffect(() => {
    // Guard against errors in case the component unmounts during initialization
    let isMounted = true;
    
    // Set document attributes for navigation styling (dark = light navbar for hero)
    try {
      document.body.setAttribute('data-nav-background', 'dark');
    } catch (error) {
      console.error("Error setting navbar background:", error);
    }
    
    // Add debugging information
    console.log("About page mounted with isMobile:", isMobile);
    
    // Force a document title change to verify the page has loaded
    document.title = "About RAADE";
    
    // Add error handling for unhandled errors
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
    
    // Start with hero section (section 0)
    setActiveSection(0);
    
    // Handle section loading based on URL hash
    if (location.hash) {
      const sectionId = location.hash.substring(1); // Remove #
      console.log(`URL contains hash: ${sectionId}`);
      scrollToSection(sectionId);
    }
    
    // Handle loading through state
    if (location.state && location.state.scrollToSection) {
      const sectionId = location.state.scrollToSection;
      console.log(`Location state contains scrollToSection: ${sectionId}`);
      scrollToSection(sectionId);
    }
    
    // Initialize with a clearer approach - use a delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (!isMounted) return;
      
      console.log("Initial loading complete");
      setIsLoading(false);
      setPageInitialized(true);
      
      // On mobile, we'll progressively reveal sections
      if (isMobile) {
        console.log("Mobile detected, using progressive section loading");
        // Start revealing sections one by one
        const sectionTimer = setInterval(() => {
          if (!isMounted) {
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
    
    // Clean up all resources and listeners when unmounting
    return () => {
      isMounted = false;
      console.log("About page unmounting");
      document.title = "RAADE";
      clearTimeout(timer);
      window.removeEventListener('error', handleGlobalError);
      
      // Reset any navigation-related attributes
      try {
        document.body.removeAttribute('data-nav-background');
      } catch (error) {
        console.error("Error cleaning up navigation attributes:", error);
      }
    };
  }, [isMobile, isLoading, location.hash, location.state, scrollToSection]);

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
    handleLogoClick,
    scrollToSection
  };
};
