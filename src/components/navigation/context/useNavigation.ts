
import { useContext } from "react";
import { NavigationContext } from "./NavigationContextDefinition";

/**
 * Custom hook to use the navigation context
 * Provides type-safe access to navigation state and actions
 * Enhanced with better error handling
 */
export const useNavigation = () => {
  try {
    const context = useContext(NavigationContext);
    if (context === undefined) {
      throw new Error("useNavigation must be used within a NavigationProvider");
    }
    return context;
  } catch (error) {
    // Return a fallback context if the real one can't be accessed
    console.error("Error accessing navigation context:", error);
    // Return a stub implementation that won't crash the app
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
      setIsDarkBackground: () => {}
    };
  }
};
