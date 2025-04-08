
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
  
  // Mobile menu state
  isMobileMenuOpen: boolean;
  
  // Page context
  isHeroPage: boolean;
  useShortFormLogo: boolean;
  forceDarkMode: boolean;
}

/**
 * Navigation action types
 * Used for the reducer to determine which action to perform
 */
export type NavigationAction =
  | { type: 'SET_IS_DARK_BACKGROUND'; isDarkBackground: boolean }
  | { type: 'TOGGLE_MOBILE_MENU' }
  | { type: 'CLOSE_MOBILE_MENU' }
  | { type: 'SET_IS_VISIBLE'; isVisible: boolean }
  | { type: 'SET_IS_MOBILE'; isMobile: boolean }
  | { type: 'SET_IS_TABLET'; isTablet: boolean }
  | { type: 'SET_CURRENT_SECTION'; section: Element | null };

/**
 * Navigation context interface
 * Combines state with any actions the context might provide
 */
export interface NavigationContextType {
  state: NavigationState;
  setIsDarkBackground: (isDark: boolean) => void;
  dispatch: React.Dispatch<NavigationAction>;
}

// Create the context with a default undefined value
export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);
