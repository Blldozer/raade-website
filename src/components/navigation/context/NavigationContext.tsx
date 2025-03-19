import { useState, useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useResponsive } from "@/hooks/useResponsive";
import { NavigationContext, NavigationState } from "./NavigationContextDefinition";
import { useSectionAwareNavigation } from "@/hooks/navigation/useSectionAwareNavigation";

/**
 * NavigationProvider Component
 * 
 * Manages global navigation state and provides it to child components
 * Handles scroll detection, visibility logic, and background styling
 * Automatically adapts to section backgrounds using Intersection Observer
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
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Fix for the nullish coalescing operator error
  // initialProps.forceDarkMode can be undefined, but not null
  // so we use logical NOT to convert undefined to a boolean
  const [isDarkBackground, setIsDarkBackground] = useState(
    !(initialProps.forceDarkMode === true)
  );
  
  // Determine page context
  const isHeroPage = initialProps.isHeroPage ?? false;
  const useShortFormLogo = initialProps.useShortFormLogo ?? false;
  
  // Use section-aware navigation for background detection
  const {
    isLightBackground,
    isNavbarVisible,
    currentSection,
    currentSectionId
  } = useSectionAwareNavigation({
    threshold: 0.6,
    excludeSections: ['.footer', 'footer', '.nav', 'nav']
  });
  
  // Update background when the light/dark detection changes
  useEffect(() => {
    // Only update background if we're not overriding with forceDarkMode
    if (initialProps.forceDarkMode === undefined) {
      setIsDarkBackground(!isLightBackground);
    }
  }, [isLightBackground, initialProps.forceDarkMode]);
  
  // Handle scroll events to update visibility and scroll state
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.9;
      
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
    isVisible: isNavbarVisible,
    isDarkBackground,
    isMobile,
    isTablet,
    isHeroPage,
    useShortFormLogo,
    currentSection,
    currentSectionId,
    isLightBackground
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
