
import React, { createContext, useReducer, ReactNode } from "react";

// Define the state shape
export interface NavigationState {
  isScrolled: boolean;
  isHeroPage: boolean;
  isLightBackground: boolean;
  isMobileMenuOpen: boolean;
}

// Define action types
type NavigationAction =
  | { type: "SET_SCROLLED"; payload: boolean }
  | { type: "SET_HERO_PAGE"; payload: boolean }
  | { type: "SET_LIGHT_BACKGROUND"; payload: boolean }
  | { type: "TOGGLE_MOBILE_MENU" }
  | { type: "SET_MOBILE_MENU"; payload: boolean };

// Define the context type
interface NavigationContextType {
  state: NavigationState;
  dispatch: React.Dispatch<NavigationAction>;
}

// Create the context with a default undefined value
export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

// Initial state
const initialState: NavigationState = {
  isScrolled: false,
  isHeroPage: false,
  isLightBackground: false,
  isMobileMenuOpen: false,
};

// Reducer function to handle all navigation state updates
function navigationReducer(state: NavigationState, action: NavigationAction): NavigationState {
  switch (action.type) {
    case "SET_SCROLLED":
      return { ...state, isScrolled: action.payload };
    case "SET_HERO_PAGE":
      return { ...state, isHeroPage: action.payload };
    case "SET_LIGHT_BACKGROUND":
      return { ...state, isLightBackground: action.payload };
    case "TOGGLE_MOBILE_MENU":
      return { ...state, isMobileMenuOpen: !state.isMobileMenuOpen };
    case "SET_MOBILE_MENU":
      return { ...state, isMobileMenuOpen: action.payload };
    default:
      return state;
  }
}

// Provider component
interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(navigationReducer, initialState);

  return (
    <NavigationContext.Provider value={{ state, dispatch }}>
      {children}
    </NavigationContext.Provider>
  );
};
