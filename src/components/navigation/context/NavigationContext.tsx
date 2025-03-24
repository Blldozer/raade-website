
import { useState, useEffect, useLayoutEffect, ReactNode, createContext } from "react";
import { useLocation } from "react-router-dom";
import { useResponsive } from "@/hooks/useResponsive";
import { NavigationContext, NavigationState } from "./NavigationContextDefinition";
import { useSectionAwareNavigation } from "@/hooks/navigation/useSectionAwareNavigation";

/**
 * NavigationProvider Component
 * 
 * Enhanced with improved cleanup and state management to prevent duplicate instances
 * Uses a single source of truth for navigation visibility and styling
 * Adds unique component IDs to track multiple instances for debugging
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
  // Generate a unique string ID instead of using useState to avoid initialization issues
  const instanceId = `nav-${Math.random().toString(36).substring(2, 9)}`;
  const location = useLocation();
  const { isMobile, isTablet } = useResponsive();
  
  // Core navigation state
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDarkBackground, setIsDarkBackground] = useState(
    !(initialProps.forceDarkMode === true)
  );
  
  // Track if this component is still mounted
  const [isMounted, setIsMounted] = useState(true);
  
  // Determine page context
  const isHeroPage = initialProps.isHeroPage ?? false;
  const useShortFormLogo = initialProps.useShortFormLogo ?? false;
  const forceDarkMode = initialProps.forceDarkMode ?? false;
  
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
  
  // Log mount/unmount for debugging duplicates
  useEffect(() => {
    console.log(`NavigationContext (${instanceId}): Mounted for path ${location.pathname}`);
    setIsMounted(true);
    
    return () => {
      console.log(`NavigationContext (${instanceId}): Unmounted from path ${location.pathname}`);
      setIsMounted(false);
    };
  }, [instanceId, location.pathname]);
  
  // Update background when the light/dark detection changes
  useEffect(() => {
    // Only update if still mounted and only if we're not overriding with forceDarkMode
    if (isMounted && initialProps.forceDarkMode === undefined) {
      setIsDarkBackground(!isLightBackground);
    }
  }, [isLightBackground, initialProps.forceDarkMode, isMounted]);
  
  // Handle scroll events to update visibility and scroll state
  // Use a named function for the event listener to ensure proper cleanup
  useEffect(() => {
    const handleScroll = () => {
      if (!isMounted) return;
      
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.9;
      
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 20);
      setIsPastHero(currentScrollY > heroHeight);
    };

    // Log event listener attachment for debugging
    console.log(`NavigationContext (${instanceId}): Adding scroll event listener`);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => {
      console.log(`NavigationContext (${instanceId}): Removing scroll event listener`);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [instanceId, isMounted]);
  
  // Set initial background for specific pages with layout effect
  useLayoutEffect(() => {
    const isIndexPage = location.pathname === "/" || location.pathname === "";
    
    if (isIndexPage || isHeroPage) {
      // Initialize with light attribute for hero pages with dark backgrounds
      document.body.setAttribute('data-nav-background', 'light');
      console.log(`NavigationContext (${instanceId}): Set initial background to light for hero page`);
    } else if (initialProps.forceDarkMode) {
      // Use dark when forced
      document.body.setAttribute('data-nav-background', 'dark');
      console.log(`NavigationContext (${instanceId}): Set initial background to dark (forced)`);
    }
    
    return () => {
      // Only clean up if this specific instance set the attribute
      if ((isIndexPage || isHeroPage) && isMounted) {
        document.body.removeAttribute('data-nav-background');
        console.log(`NavigationContext (${instanceId}): Cleaned up nav background attribute`);
      }
    };
  }, [instanceId, isHeroPage, initialProps.forceDarkMode, location.pathname]);
  
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
    isLightBackground,
    forceDarkMode  // Add the forceDarkMode property to the state object
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
