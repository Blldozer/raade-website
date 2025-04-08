
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavigationProvider } from "./context/NavigationContext";
import NavigationContent from "./content/NavigationContent";

export interface NavigationContainerProps {
  instanceId?: string;
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
  useShortFormLogo?: boolean;
  children?: React.ReactNode;
}

/**
 * NavigationContainer Component
 * 
 * Top-level navigation component that:
 * - Determines page type and sets appropriate styles
 * - Initializes the navigation context with the correct values
 * - Renders the navigation content
 */
const NavigationContainer: React.FC<NavigationContainerProps> = ({ 
  children, 
  instanceId,
  isHeroPage = false,
  forceDarkMode = false,
  useShortFormLogo = false
}) => {
  const location = useLocation();
  
  // Determine if we're on the hero page (home page)
  const isHeroPageValue = location.pathname === "/";
  
  // Determine if we should force dark mode based on the route
  const forceDarkModeValue = [
    "/innovation-studios",
    "/student-application",
    "/partner-application"
  ].includes(location.pathname);
  
  // Determine if we should use the short form logo
  const useShortFormLogoValue = [
    "/student-application",
    "/partner-application"
  ].includes(location.pathname);

  return (
    <NavigationProvider 
      initialProps={{
        instanceId,
        isHeroPage: isHeroPageValue,
        forceDarkMode: forceDarkModeValue,
        useShortFormLogo: useShortFormLogoValue,
        isLightBackground: false
      }}
    >
      <NavigationContent>
        {children}
      </NavigationContent>
    </NavigationProvider>
  );
};

export default NavigationContainer;
