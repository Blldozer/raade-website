
import { useLocation } from "react-router-dom";
import Navigation from "../Navigation";

/**
 * NavigationWrapper component
 * Handles conditional rendering of navigation based on current route
 */
const NavigationWrapper = () => {
  const location = useLocation();
  console.log("NavigationWrapper: Current location", location.pathname);
  
  // Modified: Show navigation on the About page but with special styling
  if (location.pathname === '/about') {
    // Return navigation with special styling for About page
    return <Navigation forceDarkMode={true} />;
  }
  
  // Check if we're on application pages that need special handling
  const isApplicationPage = 
    location.pathname === "/apply/student" || 
    location.pathname === "/apply/partner";
  
  // Force dark mode on project detail pages, but ensure proper styling for application pages
  const isProjectDetailPage = location.pathname.startsWith('/projects/');
  
  return <Navigation forceDarkMode={isProjectDetailPage} />;
};

export default NavigationWrapper;
