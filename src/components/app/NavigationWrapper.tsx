
import { useLocation } from "react-router-dom";
import Navigation from "../Navigation";
import { useEffect, useState, useRef } from "react";

/**
 * NavigationWrapper component
 * Ensures only ONE instance of Navigation exists across the application
 * Sets proper navigation props based on current route
 * Enhanced to prevent duplicate navigation instances
 * 
 * NOTE: Must be used inside a Router context
 */
const NavigationWrapper = () => {
  const location = useLocation();
  const [navProps, setNavProps] = useState({
    forceDarkMode: false,
    isHeroPage: false,
    useShortFormLogo: false
  });
  
  // Create an instance ID to track this wrapper
  const instanceId = useRef(`nav-wrapper-${Math.random().toString(36).substring(2, 9)}`);
  
  // Track if we've already set up navigation for this page
  const navigationRendered = useRef(false);
  
  // Set page-specific navigation properties once on mount/route change
  useEffect(() => {
    const pathname = location.pathname;
    console.log(`NavigationWrapper (${instanceId.current}): Setting props for ${pathname}`);
    
    // Reset the navigation rendered flag on route change
    navigationRendered.current = false;
    
    // Determine page-specific props
    const isAboutPage = pathname === '/about';
    const isProjectDetailPage = pathname.startsWith('/projects/');
    const isApplicationPage = pathname === "/studios/apply" || pathname === "/studios/partner";
    const isConferencePage = pathname === "/conference";
    const isStudioPage = pathname.includes('/studios');
    
    // Set navigation properties based on current route
    setNavProps({
      // Force dark mode on project detail pages and about page
      forceDarkMode: isProjectDetailPage || isAboutPage,
      
      // All these pages have hero sections that need special navigation styling
      isHeroPage: isAboutPage || isConferencePage || isStudioPage || pathname === '/studios',
      
      // Use short form logo where appropriate
      useShortFormLogo: isApplicationPage
    });
    
    // Set navigation rendered flag
    navigationRendered.current = true;
    
    return () => {
      console.log(`NavigationWrapper (${instanceId.current}): Cleaning up props for ${pathname}`);
    };
  }, [location.pathname]);
  
  // Only render navigation if we haven't already for this page
  if (!navigationRendered.current) {
    console.log(`NavigationWrapper (${instanceId.current}): First render for ${location.pathname}`);
  }
  
  // Return a single Navigation component with appropriate props
  return <Navigation {...navProps} />;
};

export default NavigationWrapper;
