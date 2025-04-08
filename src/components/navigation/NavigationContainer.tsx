
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavigationProvider } from "./context/NavigationContext";
import NavigationContent from "./content/NavigationContent";

interface NavigationContainerProps {
  children: React.ReactNode;
}

/**
 * NavigationContainer Component
 * 
 * Top-level navigation component that:
 * - Determines page type and sets appropriate styles
 * - Initializes the navigation context with the correct values
 * - Renders the navigation content
 */
const NavigationContainer: React.FC<NavigationContainerProps> = ({ children }) => {
  const location = useLocation();
  
  // Determine if we're on the hero page (home page)
  const isHeroPage = location.pathname === "/";
  
  // Determine if we should force dark mode based on the route
  const forceDarkMode = [
    "/innovation-studios",
    "/student-application",
    "/partner-application"
  ].includes(location.pathname);
  
  // Determine if we should use the short form logo
  const useShortFormLogo = [
    "/student-application",
    "/partner-application"
  ].includes(location.pathname);

  return (
    <NavigationProvider 
      initialProps={{
        isHeroPage,
        forceDarkMode,
        useShortFormLogo
      }}
    >
      <NavigationContent>
        {children}
      </NavigationContent>
    </NavigationProvider>
  );
};

export default NavigationContainer;
