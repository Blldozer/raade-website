
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSectionNavigation } from './about/useSectionNavigation';
import { useBackgroundAttributes } from './about/useBackgroundAttributes';
import { usePageInitialization } from './about/usePageInitialization';
import { useProgressiveSections } from './about/useProgressiveSections';

/**
 * Main hook for the About page - Coordinates all sub-hooks
 * Provides a unified API for the About page component
 */
export const useAboutPage = () => {
  const navigate = useNavigate();
  const isMounted = useRef(true);
  
  // Use our custom hooks
  const { activeSection, setActiveSection, scrollToSection, initializeNavigation } = useSectionNavigation();
  useBackgroundAttributes();
  const { 
    isLoading, setIsLoading, 
    hasError, pageInitialized, 
    setPageInitialized, isMobile,
    setupErrorHandling 
  } = usePageInitialization();
  
  // Set up page initialization and cleanup
  useEffect(() => {
    // Set document title
    document.title = "About RAADE";
    
    // Set up error handling
    const cleanupErrorHandler = setupErrorHandling(isMounted.current);
    
    // Initialize navigation if needed
    initializeNavigation();
    
    // Add debugging information
    console.log("About page mounted with isMobile:", isMobile);
    
    // Clean up all resources and listeners when unmounting
    return () => {
      isMounted.current = false;
      console.log("About page unmounting");
      document.title = "RAADE";
      cleanupErrorHandler();
    };
  }, [isMobile, initializeNavigation, setupErrorHandling]);
  
  // Set up progressive section loading
  useProgressiveSections(
    isMobile,
    isMounted,
    setActiveSection,
    setIsLoading,
    setPageInitialized
  );
  
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
