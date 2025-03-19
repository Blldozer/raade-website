
import { createContext } from "react";

/**
 * Navigation state interface
 * Defines the structure of the navigation context state
 */
export interface NavigationState {
  // Visibility and scroll states
  isScrolled: boolean;
  isPastHero: boolean;
  isVisible: boolean;
  
  // Background and styling
  isDarkBackground: boolean;
  
  // Section awareness
  currentSection: Element | null;
  currentSectionId: string | null;
  isLightBackground: boolean;
  
  // Responsive state
  isMobile: boolean;
  isTablet: boolean;
  
  // Page context
  isHeroPage: boolean;
  useShortFormLogo: boolean;
}

/**
 * Navigation context interface
 * Combines state with any actions the context might provide
 */
export interface NavigationContextType {
  state: NavigationState;
  setIsDarkBackground: (isDark: boolean) => void;
}

// Create the context with a default undefined value
export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);
