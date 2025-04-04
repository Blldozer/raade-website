
import { useLocation } from "react-router-dom";
import Navigation from "../Navigation";
import { useEffect, useState, useRef } from "react";

/**
 * NavigationWrapper component
 * Ensures only ONE instance of Navigation exists across the application
 * Sets proper navigation props based on current route
 * Enhanced with better error handling for router context issues
 * Enhanced with unique component IDs to track multiple instances for debugging
 * 
 * NOTE: Must be used inside a Router context
 */
const NavigationWrapper = () => {
  // Create state using a safer approach (string-based ID instead of useRef)
  // This helps prevent the "Cannot read properties of null (reading 'useRef')" error
  const [instanceId] = useState(`nav-wrapper-${Math.random().toString(36).substring(2, 9)}`);
  
  // Safe default props
  const [navProps, setNavProps] = useState({
    forceDarkMode: false,
    isHeroPage: false,
    useShortFormLogo: false
  });
  
  try {
    // Safely use location hook with proper error handling
    let pathname = '/';
    try {
      const location = useLocation();
      pathname = location.pathname;
      
      // Set page-specific navigation properties only when the pathname changes
      useEffect(() => {
        console.log(`NavigationWrapper (${instanceId}): Setting props for ${pathname}`);
        
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
        
      }, [pathname, instanceId]); // Include instanceId to avoid exhaustive deps warning
    } catch (routerError) {
      console.error(`NavigationWrapper (${instanceId}): Router context error`, routerError);
      // Continue with default props if router context fails
    }
    
    // Return a single Navigation component with appropriate props
    return <Navigation {...navProps} />;
  } catch (error) {
    console.error(`NavigationWrapper: Error`, error);
    
    // Fallback to default props if anything fails
    return <Navigation forceDarkMode={false} isHeroPage={false} useShortFormLogo={false} />;
  }
};

export default NavigationWrapper;
