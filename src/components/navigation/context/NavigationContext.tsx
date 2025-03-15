
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useResponsive } from "@/hooks/useResponsive";

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
interface NavigationContextType {
  state: NavigationState;
  setIsDarkBackground: (isDark: boolean) => void;
}

// Create the context with a default undefined value
const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

/**
 * NavigationProvider Component
 * 
 * Manages global navigation state and provides it to child components
 * Handles scroll detection, visibility logic, and background styling
 * 
 * @param children - Child components that will have access to the context
 * @param initialProps - Optional override props for the navigation
 */
export const NavigationProvider = ({ 
  children,
  initialProps = {}
}: { 
  children: ReactNode,
  initialProps?: {
    isHeroPage?: boolean;
    forceDarkMode?: boolean;
    useShortFormLogo?: boolean;
  }
}) => {
  const location = useLocation();
  const { isMobile, isTablet } = useResponsive();
  
  // Core navigation state
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDarkBackground, setIsDarkBackground] = useState(
    !initialProps.forceDarkMode ?? true
  );
  
  // Determine page context
  const isHeroPage = initialProps.isHeroPage ?? false;
  const useShortFormLogo = initialProps.useShortFormLogo ?? false;
  
  // Handle scroll events to update visibility and scroll state
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.9;
      
      // Visibility control based on scroll direction
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY + 10) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 10) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 20);
      setIsPastHero(currentScrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  
  // Compile state into a single object for the context
  const navigationState: NavigationState = {
    isScrolled,
    isPastHero,
    isVisible,
    isDarkBackground,
    isMobile,
    isTablet,
    isHeroPage,
    useShortFormLogo
  };
  
  return (
    <NavigationContext.Provider value={{ 
      state: navigationState,
      setIsDarkBackground
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

/**
 * Custom hook to use the navigation context
 * Provides type-safe access to navigation state and actions
 */
export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
