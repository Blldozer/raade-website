import { useState, useLayoutEffect, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigation } from "../context/useNavigation";

interface UseNavigationBackgroundProps {
  forceDarkMode?: boolean;
}

/**
 * Custom hook to determine navigation background state
 * 
 * Centralizes the complex logic for determining whether the navbar
 * should use dark or light styling based on page context and props
 * Updates the navigation context with the background state
 */
export const useNavigationBackground = ({ forceDarkMode = false }: UseNavigationBackgroundProps = {}) => {
  const [isDarkBackground, setIsDarkBackground] = useState(true);
  const location = useLocation();
  
  // Get navigation context if available
  const navigationContext = useNavigation();
  
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
      
      const navBackground = document.body.getAttribute('data-nav-background');
      
      if (navBackground) {
        setIsDarkBackground(navBackground === 'dark');
      } else {
        if (isConferencePage) {
          setIsDarkBackground(false);
          document.body.setAttribute('data-nav-background', 'light');
        } else {
          setIsDarkBackground(true);
          document.body.setAttribute('data-nav-background', 'dark');
        }
      }
    };
    
    checkInitialBackground();
  }, [isIndexPage, isConferencePage, isApplicationPage]);

  // Run again after the component mounts and track changes
  useEffect(() => {
    const checkInitialBackground = () => {
      // For application pages, always set light navbar
      if (isApplicationPage) {
        setIsDarkBackground(true);
        document.body.setAttribute('data-nav-background', 'light');
        return;
      }
      
      const navBackground = document.body.getAttribute('data-nav-background');
      
      if (navBackground) {
        setIsDarkBackground(navBackground === 'dark');
      } else {
        if (isConferencePage) {
          setIsDarkBackground(false);
          document.body.setAttribute('data-nav-background', 'light');
        } else {
          setIsDarkBackground(true);
          document.body.setAttribute('data-nav-background', 'dark');
        }
      }
    };
    
    checkInitialBackground();
    
    // Create a mutation observer to watch for data-nav-background attribute changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" && 
          mutation.attributeName === "data-nav-background"
        ) {
          const navBackground = document.body.getAttribute('data-nav-background');
          const newIsDarkBackground = navBackground === 'dark';
          setIsDarkBackground(newIsDarkBackground);
          
          // Update the context if available
          if (navigationContext) {
            navigationContext.setIsDarkBackground(newIsDarkBackground);
          }
        }
      });
    });
    
    // Start observing the document body for attribute changes
    observer.observe(document.body, { attributes: true });
    
    return () => {
      observer.disconnect();
    };
  }, [isConferencePage, isApplicationPage, navigationContext]);

  return { 
    isDarkBackground,
    shouldForceDarkMode 
  };
};
