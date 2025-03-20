
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
   * 2. Scrolled state with subtle glassmorphism
   * 3. Completely transparent at top of page
   */
  const getBackgroundClass = (): string => {
    // First priority: Special pages that should always have dark navbar
    if (isConferenceRegistrationPage || forceDarkMode) {
      // Dark glassmorphism for these special pages
      return "bg-black/20 backdrop-blur-md border-b border-white/10 shadow-md";
    }
    
    // Second priority: Subtle glassmorphism when scrolled (same for both light/dark)
    if (isScrolled) {
      return "bg-black/10 backdrop-blur-md border-b border-white/10 shadow-sm";
    }
    
    // Default: Completely transparent at top of page (no background or border)
    return "bg-transparent backdrop-blur-[1px] border-transparent";
  };
  
  return {
    backgroundClass: getBackgroundClass(),
    isConferenceRegistrationPage,
    effectiveLightBackground: forceDarkMode || isConferenceRegistrationPage ? false : isLightBackground
  };
};
