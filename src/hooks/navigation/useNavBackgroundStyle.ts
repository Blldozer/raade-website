
import { useNavigation } from "@/components/navigation/context/useNavigation";
import { useLocation } from "react-router-dom";
import { hasFixedNavbarStyle } from "./useNavBackgroundUtils";

/**
 * Hook to extract background styling logic for navigation
 * 
 * Centralizes the complex logic for determining navigation background styles
 * based on scroll state, background type, and special page requirements
 * 
 * @returns CSS classes and states for the navigation background
 */
export const useNavBackgroundStyle = () => {
  const { state } = useNavigation();
  const { 
    isScrolled, 
    isLightBackground,
    forceDarkMode
  } = state;
  
  const location = useLocation();
  const pathname = location.pathname;
  
  // Determine if this is a conference registration page
  const isConferenceRegistrationPage = pathname === '/conference/register';
  const isConferencePage = pathname === '/conference';
  
  /**
   * Helper function to determine navbar background styling based on state
   * Priority order:
   * 1. Not scrolled - always transparent regardless of page type
   * 2. Scrolled + special pages (conference, registration) - subtle dark glassmorphism
   * 3. Scrolled + regular pages - subtle glassmorphism
   */
  const getBackgroundClass = (): string => {
    // First priority: Always transparent at top of page regardless of page type
    if (!isScrolled) {
      return "bg-transparent border-transparent";
    }
    
    // Second priority: Special pages that should have dark navbar when scrolled
    if ((isConferenceRegistrationPage || isConferencePage || forceDarkMode) && isScrolled) {
      // Dark glassmorphism for these special pages when scrolled
      return "bg-black/20 backdrop-blur-md border-b border-white/10 shadow-md";
    }
    
    // Third priority: Subtle glassmorphism when scrolled (same for both light/dark)
    return "bg-black/10 backdrop-blur-md border-b border-white/10 shadow-sm";
  };
  
  // Determine if we're against a dark background
  // This happens when either:
  // 1. We're on a page with dark elements behind navbar
  // 2. We have light background mode disabled
  // 3. We're on special pages that force dark navbar
  const isAgainstDarkBackground = 
    !isLightBackground || 
    forceDarkMode || 
    isConferenceRegistrationPage ||
    isConferencePage;
  
  // Only consider fixed styling when scrolled
  const shouldUseFixedStyle = isScrolled && hasFixedNavbarStyle(pathname);
  
  return {
    backgroundClass: getBackgroundClass(),
    isConferenceRegistrationPage,
    isConferencePage,
    effectiveLightBackground: (forceDarkMode || isConferenceRegistrationPage || isConferencePage) 
      ? false 
      : isLightBackground,
    isAgainstDarkBackground,
    shouldUseFixedStyle
  };
};
