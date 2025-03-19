import React from "react";
import MobileNavButton from "./MobileNavButton";
import MobileMenuOverlay from "./MobileMenuOverlay";
import { useMobileNav } from "@/hooks/useMobileNav";
import { useNavigation } from "@/components/navigation/context/useNavigation";

interface MobileNavProps {
  isScrolled?: boolean;
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
}

/**
 * MobileNav Component
 * 
 * Provides a simplified mobile navigation experience:
 * - Uses the useMobileNav hook to manage toggle state
 * - Delegates rendering to specialized components
 * - Ensures consistent behavior across all pages
 * - Properly handles navigation context
 * 
 * @param isScrolled - Whether the page has been scrolled
 * @param isHeroPage - Whether this is displayed on a hero section
 * @param forceDarkMode - Whether to force dark mode styling
 */
const MobileNav = ({ 
  isScrolled = false, 
  isHeroPage = false, 
  forceDarkMode = false 
}: MobileNavProps) => {
  // Use the mobile navigation hook to manage state
  const { isOpen, toggleMenu, closeMenu } = useMobileNav();
  
  // Use the navigation context to get styling info
  const { state } = useNavigation();
  
  // Determine the actual style to use based on background
  const useDarkMode = state.isLightBackground;

  return (
    <div className="block md:hidden">
      {/* Hamburger Menu Button */}
      <MobileNavButton 
        onClick={toggleMenu} 
        forceDarkMode={useDarkMode} 
      />

      {/* Full Screen Menu Overlay */}
      <MobileMenuOverlay 
        isOpen={isOpen} 
        onClose={closeMenu} 
      />
    </div>
  );
};

export default MobileNav;
