
import { useRef, useEffect } from "react";
import NavigationContainer from "./navigation/NavigationContainer";

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
  const instanceId = useRef(`nav-main-${Math.random().toString(36).substring(2, 9)}`);
  
  // Log mounting/unmounting to track duplicate instances
  useEffect(() => {
    console.log(`Navigation (${instanceId.current}): Mounting with props:`, 
      { isHeroPage, forceDarkMode, useShortFormLogo });
    
    return () => {
      console.log(`Navigation (${instanceId.current}): Unmounting`);
    };
  }, [isHeroPage, forceDarkMode, useShortFormLogo]);
  
  return (
    <NavigationContainer
      isHeroPage={isHeroPage}
      forceDarkMode={forceDarkMode}
      useShortFormLogo={useShortFormLogo}
    />
  );
};

export default Navigation;
