
import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavigationProvider } from "./context/NavigationContext";
import NavigationContent from "./content/NavigationContent";

interface NavigationContainerProps {
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
  useShortFormLogo?: boolean;
}

/**
 * NavigationContainer Component - Main container for navigation components
 * 
 * Delegates rendering to specialized components while providing
 * a shared context for navigation state management
 * 
 * Enhanced with unique instance IDs to prevent duplicate rendering
 * and ensure proper cleanup when navigating between pages
 */
const NavigationContainer = ({ 
  isHeroPage = false, 
  forceDarkMode = false,
  useShortFormLogo = false 
}: NavigationContainerProps) => {
  // Generate a unique ID for this navigation instance
  const instanceId = useRef(`nav-container-${Math.random().toString(36).substring(2, 9)}`);
  const location = useLocation();
  
  // Check if we're on the conference registration page to ensure dark navbar
  const isConferenceRegistration = location.pathname === '/conference/register';
  const finalForceDarkMode = isConferenceRegistration ? true : forceDarkMode;
  
  // Log mounting/unmounting to track duplicate instances
  useEffect(() => {
    console.log(`NavigationContainer (${instanceId.current}): Mounting`);
    
    return () => {
      console.log(`NavigationContainer (${instanceId.current}): Unmounting`);
    };
  }, []);

  return (
    <NavigationProvider initialProps={{ 
      isHeroPage, 
      forceDarkMode: finalForceDarkMode, 
      useShortFormLogo 
    }}>
      <NavigationContent instanceId={instanceId.current} />
    </NavigationProvider>
  );
};

export default NavigationContainer;
