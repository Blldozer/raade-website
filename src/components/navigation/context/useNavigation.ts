
import React, { useContext } from "react";
import { NavigationContext } from "./NavigationContextDefinition";

/**
 * Custom hook to use the navigation context
 * Provides type-safe access to navigation state and actions
 * Enhanced with better error handling for missing React context
 */
export const useNavigation = () => {
  // Check if React is properly initialized 
  const isReactAvailable = 
    typeof window !== 'undefined' && 
    window.__REACT_INITIALIZED === true && 
    typeof React === 'object' && 
    React !== null && 
    typeof React.useContext === 'function';
    
  if (!isReactAvailable) {
    console.error("useNavigation: React not properly initialized");
    // Return fallback
    return getFallbackNavigationContext();
  }
  
  try {
    const context = useContext(NavigationContext);
    if (context === undefined) {
      throw new Error("useNavigation must be used within a NavigationProvider");
    }
    return context;
  } catch (error) {
    // Return a fallback context if the real one can't be accessed
    console.error("Error accessing navigation context:", error);
    return getFallbackNavigationContext();
  }
};

/**
 * Provides a fallback navigation context when the React context system isn't available
 * This prevents the app from crashing due to missing context.
 */
function getFallbackNavigationContext() {
  return {
    state: {
      isScrolled: false,
      isPastHero: false,
      isVisible: true,
      isDarkBackground: false,
      isMobile: false,
      isTablet: false,
      isHeroPage: false,
      useShortFormLogo: false,
      currentSection: null,
      currentSectionId: null,
      isLightBackground: true,
      forceDarkMode: false
    },
    setIsDarkBackground: () => {},
    // Add a handleNavigation function for components that need it
    handleNavigation: (href: string) => {
      window.location.href = href;
    }
  };
}

// Export default for more flexible usage
export default useNavigation;
