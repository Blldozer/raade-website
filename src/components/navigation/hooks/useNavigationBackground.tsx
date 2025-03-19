import { useState, useLayoutEffect, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigation } from "../context/useNavigation";
import { getElementBackgroundColor, isLightColor } from "@/utils/colorUtils";

interface UseNavigationBackgroundProps {
  forceDarkMode?: boolean;
}

/**
 * Custom hook to determine navigation background state
 * 
 * Centralizes the complex logic for determining whether the navbar
 * should use dark or light styling based on:
 * - Page context and props
 * - Current section in view (using Intersection Observer)
 * - Background color luminance analysis
 * 
 * Updates the navigation context with the background state
 */
export const useNavigationBackground = ({ forceDarkMode = false }: UseNavigationBackgroundProps = {}) => {
  const [isDarkBackground, setIsDarkBackground] = useState(true);
  const location = useLocation();
  
  // Get navigation context if available
  const navigationContext = useNavigation();
  const { currentSection, isLightBackground } = navigationContext.state;
  
  // Check if we're on application pages which should always have light navbar
  const isApplicationPage = 
    location.pathname === "/apply/student" || 
    location.pathname === "/apply/partner" ||
    location.pathname === "/studios/apply" || 
    location.pathname === "/studios/partner";

  // Check other special pages
  const isConferencePage = location.pathname === "/conference";
  const isStudiosPage = location.pathname === "/studios";
  const isIndexPage = location.pathname === "/" || location.pathname === "";
  
  // For application pages, we always want to force light mode navbar regardless of other settings
  const shouldForceDarkMode = isApplicationPage ? false : forceDarkMode || (isConferencePage && !location.pathname.includes("/register"));

  // Run before the first paint to avoid flicker
  useLayoutEffect(() => {
    const checkInitialBackground = () => {
      // For application pages, always set light navbar
      if (isApplicationPage) {
        setIsDarkBackground(true);
        document.body.setAttribute('data-nav-background', 'light');
        return;
      }
      
      if (isIndexPage) {
        setIsDarkBackground(true);
        document.body.setAttribute('data-nav-background', 'light');
        return;
      }
      
      // For any other page, use the nav settings data attribute if available
      const savedBackgroundState = document.body.getAttribute('data-nav-background');
      
      if (savedBackgroundState === 'light') {
        setIsDarkBackground(true);
      } else if (savedBackgroundState === 'dark') {
        setIsDarkBackground(false);
      } else if (shouldForceDarkMode) {
        // If we need to force dark mode and no saved state, do it
        setIsDarkBackground(false);
      }
    };
    
    checkInitialBackground();
  }, [isApplicationPage, isIndexPage, shouldForceDarkMode]);
  
  // Update based on section backgrounds when scrolling
  useEffect(() => {
    // Skip section-aware updates if we have explicit force settings
    if (shouldForceDarkMode !== undefined || isApplicationPage) {
      return;
    }
    
    // Update the background state based on the detected section background
    setIsDarkBackground(!isLightBackground);
    
    // Also update data attribute for consistency
    document.body.setAttribute(
      'data-nav-background', 
      isLightBackground ? 'light' : 'dark'
    );
  }, [isLightBackground, shouldForceDarkMode, isApplicationPage]);
  
  // Update the navigation context with our background state
  useEffect(() => {
    if (navigationContext && navigationContext.setIsDarkBackground) {
      navigationContext.setIsDarkBackground(isDarkBackground);
    }
  }, [isDarkBackground, navigationContext]);
  
  // Debug section background information
  useEffect(() => {
    if (currentSection && process.env.NODE_ENV === 'development') {
      try {
        const sectionElement = currentSection as HTMLElement;
        const bgColor = getElementBackgroundColor(sectionElement);
        const isLight = isLightColor(bgColor);
        
        console.debug(
          `Current section: ${sectionElement.id || 'unnamed'} | ` +
          `Background: ${bgColor} | ` + 
          `Is light: ${isLight ? 'Yes' : 'No'} | ` +
          `Navbar: ${isLight ? 'Dark' : 'Light'}`
        );
      } catch (error) {
        // Ignore errors in production
      }
    }
  }, [currentSection]);
  
  return {
    isDarkBackground,
    setIsDarkBackground,
    currentSection,
    isLightBackground
  };
};
