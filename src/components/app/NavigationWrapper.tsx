
import { useLocation } from "react-router-dom";
import Navigation from "../Navigation";
import { useEffect, useState } from "react";

/**
 * NavigationWrapper component
 * Enhanced to prevent duplicate navigation instances when scrolling
 * Uses a consistent pattern across all pages to match Index page behavior
 */
const NavigationWrapper = () => {
  const location = useLocation();
  const [navProps, setNavProps] = useState({
    forceDarkMode: false,
    isHeroPage: false,
    useShortFormLogo: false
  });
  
  // Set page-specific navigation properties once on mount/route change
  useEffect(() => {
    const pathname = location.pathname;
    console.log("NavigationWrapper: Setting props for", pathname);
    
    // Determine page-specific props
    const isAboutPage = pathname === '/about';
    const isProjectDetailPage = pathname.startsWith('/projects/');
    const isApplicationPage = pathname === "/studios/apply" || pathname === "/studios/partner";
    const isConferencePage = pathname === "/conference";
    
    // Set navigation properties based on current route
    setNavProps({
      // Force dark mode on project detail pages
      forceDarkMode: isProjectDetailPage || isAboutPage,
      
      // All these pages have hero sections, so set isHeroPage true
      isHeroPage: isAboutPage || isConferencePage || pathname === '/studios',
      
      // Use short form logo where appropriate
      useShortFormLogo: isApplicationPage
    });
  }, [location.pathname]);
  
  // Return a single Navigation component with appropriate props
  return <Navigation {...navProps} />;
};

export default NavigationWrapper;
