
export interface NavigationState {
  isScrolled: boolean;
  isHeroPage: boolean;
  forceDarkMode: boolean;
  useShortFormLogo: boolean;
  isLightBackground: boolean;
  instanceId?: string;
}

export interface NavigationContextType {
  state: NavigationState;
  setScrolled: (isScrolled: boolean) => void;
  setIsHeroPage: (isHeroPage: boolean) => void;
  setForceDarkMode: (forceDarkMode: boolean) => void;
  setUseShortFormLogo: (useShortFormLogo: boolean) => void;
  setIsLightBackground: (isLightBackground: boolean) => void;
}

export interface NavigationProviderProps {
  children: React.ReactNode;
  initialProps?: Partial<NavigationState>;
}
