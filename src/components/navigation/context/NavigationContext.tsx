
import React, { createContext, useReducer, ReactNode } from "react";
import { NavigationState, NavigationContextType, NavigationProviderProps, NavigationAction } from "./NavigationContextDefinition";

const initialState: NavigationState = {
  isScrolled: false,
  isHeroPage: false,
  forceDarkMode: false,
  useShortFormLogo: false,
  isLightBackground: true,
  isVisible: true,
  isMobileMenuOpen: false,
  isDarkBackground: false,
  isMobile: false,
  isTablet: false,
  currentSection: null
};

const reducer = (state: NavigationState, action: NavigationAction): NavigationState => {
  switch (action.type) {
    case "SET_SCROLLED":
      return { ...state, isScrolled: action.payload };
    case "SET_HERO_PAGE":
      return { ...state, isHeroPage: action.payload };
    case "SET_DARK_MODE":
      return { ...state, forceDarkMode: action.payload };
    case "SET_SHORT_LOGO":
      return { ...state, useShortFormLogo: action.payload };
    case "TOGGLE_MOBILE_MENU":
      return { ...state, isMobileMenuOpen: !state.isMobileMenuOpen };
    case "SET_MOBILE_MENU":
      return { ...state, isMobileMenuOpen: action.payload };
    case "SET_VISIBILITY":
      return { ...state, isVisible: action.payload };
    case "SET_DARK_BACKGROUND":
      return { ...state, isDarkBackground: action.payload };
    case "SET_MOBILE":
      return { ...state, isMobile: action.payload };
    case "SET_TABLET":
      return { ...state, isTablet: action.payload };
    case "SET_CURRENT_SECTION":
      return { ...state, currentSection: action.payload };
    default:
      return state;
  }
};

export const NavigationContext = createContext<NavigationContextType>({
  state: initialState,
  dispatch: () => null,
  setIsDarkBackground: () => {}
});

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ 
  children, 
  initialProps 
}) => {
  // Apply initial props if provided
  const actualInitialState = initialProps 
    ? { ...initialState, ...initialProps } 
    : initialState;
  
  const [state, dispatch] = useReducer(reducer, actualInitialState);
  
  const setIsDarkBackground = (isDark: boolean) => {
    dispatch({ type: "SET_DARK_BACKGROUND", payload: isDark });
  };

  return (
    <NavigationContext.Provider value={{ state, dispatch, setIsDarkBackground }}>
      {children}
    </NavigationContext.Provider>
  );
};
