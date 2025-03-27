
import { useEffect, useState } from "react";
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
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  
  // Log mounting/unmounting to track duplicate instances
  useEffect(() => {
    // Check if we've already mounted navigation for this page
    if (mounted) {
      console.warn(`Navigation (${uniqueId}): Already mounted on ${location.pathname}, skipping duplicate render`);
      return;
    }
    
    console.log(`Navigation (${uniqueId}): Mounting with props:`, 
      { isHeroPage, forceDarkMode, useShortFormLogo, path: location.pathname });
    
    // Track existing navigation elements to prevent duplicates
    const existingNavs = document.querySelectorAll('nav[data-nav-instance]');
    console.log(`Navigation found ${existingNavs.length} existing nav elements`);
    
    // Set mounted flag to true
    setMounted(true);
    
    return () => {
      console.log(`Navigation (${uniqueId}): Unmounting from ${location.pathname}`);
      setMounted(false);
    };
  }, [isHeroPage, forceDarkMode, useShortFormLogo, location.pathname, mounted, uniqueId]);
  
  return (
    <NavigationContainer
      instanceId={uniqueId}
      isHeroPage={isHeroPage}
      forceDarkMode={forceDarkMode}
      useShortFormLogo={useShortFormLogo}
    />
  );
};

export default Navigation;
