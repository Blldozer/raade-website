
/**
 * Navigation Context Type Definitions
 * 
 * Defines the structure of the navigation context state and dispatcher
 */

export interface NavigationState {
  isScrolled: boolean;
  isHeroPage: boolean;
  forceDarkMode: boolean;
  useShortFormLogo: boolean;
  isMobileMenuOpen: boolean;
  isVisible: boolean;
  isDarkBackground: boolean;
  isMobile: boolean;
  isTablet: boolean;
  currentSection: string | null;
}

export interface NavigationAction {
  type: string;
  payload?: any;
}

export interface NavigationContextType {
  state: NavigationState;
  dispatch: React.Dispatch<NavigationAction>;
  setIsDarkBackground: (isDark: boolean) => void;
}

export interface NavigationProviderProps {
  children: React.ReactNode;
  initialProps?: {
    isHeroPage: boolean;
    forceDarkMode: boolean;
    useShortFormLogo: boolean;
  };
}
