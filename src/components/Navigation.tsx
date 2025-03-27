
import NavigationContainer from "./navigation/NavigationContainer";
import { useLocation } from "react-router-dom";

interface NavigationProps {
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
  useShortFormLogo?: boolean;
}

/**
 * Navigation Component - Main navigation bar for the website
 * 
 * Enhanced with unique ID tracking to prevent duplicate instances
 * It delegates all functionality to NavigationContainer which provides
 * a context for sharing navigation state across components.
 */
const Navigation = ({ 
  isHeroPage = false, 
  forceDarkMode = false,
  useShortFormLogo = false 
}: NavigationProps) => {
  // Generate a unique ID for this navigation instance
  const uniqueId = `nav-main-${Math.random().toString(36).substring(2, 9)}`;
  
  try {
    const location = useLocation();
    
    console.log(`Navigation (${uniqueId}): Rendering with props:`, 
      { isHeroPage, forceDarkMode, useShortFormLogo, path: location.pathname });
    
    return (
      <NavigationContainer
        instanceId={uniqueId}
        isHeroPage={isHeroPage}
        forceDarkMode={forceDarkMode}
        useShortFormLogo={useShortFormLogo}
      />
    );
  } catch (error) {
    console.warn(`Navigation (${uniqueId}): Router context error, using basic container`);
    
    // Fallback when router context isn't available
    return (
      <NavigationContainer
        instanceId={uniqueId}
        isHeroPage={isHeroPage}
        forceDarkMode={forceDarkMode}
        useShortFormLogo={useShortFormLogo}
      />
    );
  }
};

export default Navigation;
