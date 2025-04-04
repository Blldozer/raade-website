
import React from "react";
import { useLocation } from "react-router-dom";
import { NavigationProvider } from "./context/NavigationContext";
import NavigationContent from "./content/NavigationContent";
import ErrorBoundary from "../ErrorBoundary";

interface NavigationContainerProps {
  instanceId?: string;
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
  useShortFormLogo?: boolean;
}

/**
 * NavigationContainer Component - Main container for navigation components
 * 
 * Delegates rendering to specialized components while providing
 * a shared context for navigation state management
 * 
 * Enhanced with unique instance IDs to prevent duplicate rendering
 * and ensure proper cleanup when navigating between pages
 * Added React availability check to prevent "Cannot read properties of null (reading 'useRef')" errors
 */
const NavigationContainer = ({ 
  instanceId,
  isHeroPage = false, 
  forceDarkMode = false,
  useShortFormLogo = false 
}: NavigationContainerProps) => {
  // Check if React is properly initialized
  if (typeof React !== 'object' || React === null) {
    console.error("NavigationContainer: React not properly initialized");
    return (
      <div className="fixed top-0 w-full z-50 bg-gray-100 p-4">
        <span className="font-bold">RAADE</span>
      </div>
    );
  }

  // Generate a unique ID for this navigation instance if not provided
  // Using a string instead of useRef to avoid React context issues
  const localInstanceId = instanceId || `nav-container-${Math.random().toString(36).substring(2, 9)}`;
  
  try {
    let locationPath = '/';
    // Try to get location info, but don't crash if it fails
    try {
      const location = useLocation();
      locationPath = location.pathname;
      
      // Check if we're on the conference registration page to ensure dark navbar
      const isConferenceRegistration = locationPath === '/conference/register';
      const isAboutPage = locationPath === '/about';
      const finalForceDarkMode = isConferenceRegistration ? true : forceDarkMode;
      
      // Log mounting info
      console.log(`NavigationContainer (${localInstanceId}): Mounting on ${locationPath}`);

      return (
        <ErrorBoundary fallback={
          <div className="fixed top-0 w-full z-50 bg-gray-100 p-4">
            <span className="font-bold">Navigation Error</span>
          </div>
        }>
          <NavigationProvider initialProps={{ 
            isHeroPage, 
            forceDarkMode: finalForceDarkMode, 
            useShortFormLogo 
          }}>
            <NavigationContent instanceId={localInstanceId} />
          </NavigationProvider>
        </ErrorBoundary>
      );
    } catch (error) {
      console.error(`NavigationContainer (${localInstanceId}): Router error`, error);
      // Provide a minimal fallback navigation
      return (
        <div className="fixed top-0 w-full z-50 bg-gray-100 p-4">
          <span className="font-bold">RAADE</span>
        </div>
      );
    }
  } catch (error) {
    console.error(`NavigationContainer (${localInstanceId}): Critical error`, error);
    // Fallback for any other error
    return (
      <div className="fixed top-0 w-full z-50 bg-gray-100 p-4">
        <span className="font-bold">RAADE</span>
      </div>
    );
  }
};

export default NavigationContainer;
