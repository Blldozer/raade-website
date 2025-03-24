
import { useLocation } from "react-router-dom";
import Navigation from "../Navigation";
import { useEffect, useState } from "react";

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
  const uniqueId = `nav-wrapper-${Math.random().toString(36).substring(2, 9)}`;
  
  // Set page-specific navigation properties once on mount/route change
  useEffect(() => {
    const pathname = location.pathname;
    console.log(`NavigationWrapper (${uniqueId}): Setting props for ${pathname}`);
    
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
    
    return () => {
      console.log(`NavigationWrapper (${uniqueId}): Cleaning up props for ${pathname}`);
    };
  }, [location.pathname]);
  
  // Return a single Navigation component with appropriate props
  return <Navigation {...navProps} />;
};

export default NavigationWrapper;
