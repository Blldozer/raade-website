
import { useLocation } from "react-router-dom";
import Navigation from "../Navigation";
import { useEffect, useState, useRef } from "react";

/**
 * NavigationWrapper component
 * Ensures only ONE instance of Navigation exists across the application
 * Sets proper navigation props based on current route
 * Enhanced to prevent duplicate navigation instances
 * Enhanced with better error handling for router context issues
 * 
 * NOTE: Must be used inside a Router context
 */
const NavigationWrapper = () => {
  // Safe default props
  const defaultNavProps = {
    forceDarkMode: false,
    isHeroPage: false,
    useShortFormLogo: false
  };
  
  // Create a stable instance ID
  const instanceIdRef = useRef(`nav-wrapper-${Math.random().toString(36).substring(2, 9)}`);
  const [navProps, setNavProps] = useState(defaultNavProps);
  
  try {
    const location = useLocation();
    
    // Set page-specific navigation properties only when the pathname changes
    useEffect(() => {
      const pathname = location.pathname;
      console.log(`NavigationWrapper (${instanceIdRef.current}): Setting props for ${pathname}`);
      
      // Determine page-specific props
      const isAboutPage = pathname === '/about';
      const isProjectDetailPage = pathname.startsWith('/projects/');
      const isApplicationPage = pathname === "/apply/student" || pathname === "/apply/partner";
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
      
    }, [location.pathname]); // Only depend on pathname, not the entire location object
    
    // Return a single Navigation component with appropriate props
    return <Navigation {...navProps} />;
  } catch (error) {
    console.error(`NavigationWrapper (${instanceIdRef.current}): Error with router context`, error);
    
    // Fallback to default props if router context fails
    return <Navigation {...defaultNavProps} />;
  }
};

export default NavigationWrapper;
