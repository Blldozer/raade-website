
import { useNavigation } from "@/components/navigation/context/useNavigation";

/**
 * Hook to extract background styling logic for navigation
 * 
 * Centralizes the complex logic for determining navigation background styles
 * based on scroll state, background type, and special page requirements
 * 
 * @param isScrolled - Whether the page has been scrolled
 * @param isLightBackground - Whether the current background is light
 * @param isConferenceRegistrationPage - Whether we're on the conference registration page
 * @param forceDarkMode - Whether dark mode should be forced
 * @returns CSS classes for the navigation background
 */
export const useNavBackgroundStyle = () => {
  const { state } = useNavigation();
  const { 
    isScrolled, 
    isLightBackground,
    forceDarkMode
  } = state;
  
  // Determine if this is a conference registration page
  const isConferenceRegistrationPage = location.pathname === '/conference/register';
  
  /**
   * Helper function to determine navbar background styling based on state
   */
  const getBackgroundClass = (): string => {
    // For conference registration page or when forcing dark mode, always use dark background
    // regardless of scroll position
    if (isConferenceRegistrationPage || forceDarkMode) {
      return "bg-[#274675]/80 backdrop-blur-md border-b border-[#274675]/30 shadow-md";
    }
    
    // Apply enhanced glassmorphism effect with proper light/dark handling when scrolled
    if (isScrolled) {
      return isLightBackground 
        ? "bg-white/70 backdrop-blur-md border-b border-gray-200/50 shadow-sm" 
        : "bg-[#274675]/80 backdrop-blur-md border-b border-[#274675]/30 shadow-md";
    }
    
    // Transparent when at top
    return "bg-transparent";
  };
  
  return {
    backgroundClass: getBackgroundClass(),
    isConferenceRegistrationPage,
    effectiveLightBackground: isConferenceRegistrationPage || forceDarkMode ? false : isLightBackground
  };
};
