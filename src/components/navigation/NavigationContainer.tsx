
import { useLocation } from "react-router-dom";
import { NavigationProvider } from "./context/NavigationContext";
import NavigationContent from "./content/NavigationContent";

interface NavigationContainerProps {
  instanceId?: string;
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
  instanceId,
  isHeroPage = false, 
  forceDarkMode = false,
  useShortFormLogo = false 
}: NavigationContainerProps) => {
  // Generate a unique ID for this navigation instance if not provided
  // Using a string instead of useRef to avoid React context issues
  const localInstanceId = instanceId || `nav-container-${Math.random().toString(36).substring(2, 9)}`;
  const location = useLocation();
  
  // Check if we're on the conference registration page to ensure dark navbar
  const isConferenceRegistration = location.pathname === '/conference/register';
  const isAboutPage = location.pathname === '/about';
  const finalForceDarkMode = isConferenceRegistration ? true : forceDarkMode;
  
  // Log mounting info
  console.log(`NavigationContainer (${localInstanceId}): Mounting on ${location.pathname}`);
    
  // Count navigation elements to detect duplicates
  const navElements = document.querySelectorAll('nav[data-nav-instance]');
  if (navElements.length > 1) {
    console.warn(`Multiple navigation elements detected (${navElements.length}):`, 
      Array.from(navElements).map(el => el.getAttribute('data-nav-instance')));
  }

  return (
    <NavigationProvider initialProps={{ 
      isHeroPage, 
      forceDarkMode: finalForceDarkMode, 
      useShortFormLogo 
    }}>
      <NavigationContent instanceId={localInstanceId} />
    </NavigationProvider>
  );
};

export default NavigationContainer;
