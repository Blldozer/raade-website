
import { useNavigation } from "@/components/navigation/context/useNavigation";

/**
 * useNavBackgroundStyle Hook
 * 
 * Determines the appropriate background style for the navigation based on:
 * - Scroll position
 * - Page type (hero or not)
 * - Forced dark mode setting
 * - Light/dark mode preference
 * 
 * Returns the CSS classes to apply to the navigation element
 */
export const useNavBackgroundStyle = () => {
  const { state } = useNavigation();
  const { isScrolled, isHeroPage, forceDarkMode, isLightBackground } = state;
  
  // Not scrolled on hero page = transparent
  if (isHeroPage && !isScrolled) {
    return "bg-transparent";
  }
  
  // Force dark mode = dark background
  if (forceDarkMode) {
    return "bg-[#274675] text-white";
  }
  
  // Determine by light/dark background
  if (isLightBackground === false) {
    return "bg-[#274675] text-white";
  }
  
  // Default scrolled state
  return "bg-white/95 backdrop-blur-md shadow-sm";
};

export default useNavBackgroundStyle;
