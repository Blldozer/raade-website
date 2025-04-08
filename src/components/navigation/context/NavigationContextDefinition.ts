
export interface NavigationState {
  isScrolled: boolean;
  isHeroPage: boolean;
  forceDarkMode: boolean;
  useShortFormLogo: boolean;
  isLightBackground: boolean;
  isVisible?: boolean;
  isMobileMenuOpen?: boolean;
  isDarkBackground?: boolean;
  isMobile?: boolean;
  isTablet?: boolean;
  currentSection?: string | null;
  instanceId?: string;
}

export interface NavigationAction {
  type: string;
  payload: any;
}

export interface NavigationContextType {
  state: NavigationState;
  dispatch: React.Dispatch<NavigationAction>;
  setIsDarkBackground: (isDark: boolean) => void;
  setScrolled?: (isScrolled: boolean) => void;
  setIsHeroPage?: (isHeroPage: boolean) => void;
  setForceDarkMode?: (forceDarkMode: boolean) => void;
  setUseShortFormLogo?: (useShortFormLogo: boolean) => void;
  setIsLightBackground?: (isLightBackground: boolean) => void;
}

export interface NavigationProviderProps {
  children: React.ReactNode;
  initialProps?: Partial<NavigationState>;
}
