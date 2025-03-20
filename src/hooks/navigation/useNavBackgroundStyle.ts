
import { useNavigation } from "@/components/navigation/context/useNavigation";
import { useLocation } from "react-router-dom";

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
  
  // Determine if this is a conference registration page
  const isConferenceRegistrationPage = location.pathname === '/conference/register';
  
  /**
   * Helper function to determine navbar background styling based on state
   * Priority order:
   * 1. Conference registration page or forced dark mode (always dark regardless of scroll)
   * 2. Scrolled state with appropriate light/dark styling
   * 3. Transparent when at top of page (for regular pages only)
   */
  const getBackgroundClass = (): string => {
    // First priority: Special pages that should always have dark navbar
    if (isConferenceRegistrationPage || forceDarkMode) {
      // Always use dark background with proper opacity for these special pages
      return "bg-[#274675]/90 backdrop-blur-md border-b border-[#274675]/30 shadow-md";
    }
    
    // Second priority: Regular scroll-based styling
    if (isScrolled) {
      return isLightBackground 
        ? "bg-white/70 backdrop-blur-md border-b border-gray-200/50 shadow-sm" 
        : "bg-[#274675]/80 backdrop-blur-md border-b border-[#274675]/30 shadow-md";
    }
    
    // Default: Transparent when at top
    return "bg-transparent";
  };
  
  return {
    backgroundClass: getBackgroundClass(),
    isConferenceRegistrationPage,
    effectiveLightBackground: forceDarkMode || isConferenceRegistrationPage ? false : isLightBackground
  };
};
