
import { useState } from "react";
import MobileNavButton from "./MobileNavButton";
import MobileMenuOverlay from "./MobileMenuOverlay";
import { useNavigation } from "../context/NavigationContext";

interface MobileNavProps {
  isScrolled?: boolean;
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
}

/**
 * MobileNav Component
 * 
 * Provides a full-page mobile navigation experience:
 * - Clean, minimal design with a light background
 * - Organized navigation links with clear hierarchy
 * - Simple open/close interactions
 * - Smooth transitions
 * - Reliable scroll locking with proper cleanup
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
  // Local state for menu visibility
  const [isOpen, setIsOpen] = useState(false);
  
  // Use the navigation context for styling
  const { state } = useNavigation();
  
  // Prioritize context values but fall back to props for backward compatibility
  const actualForceDarkMode = forceDarkMode || !state.isDarkBackground;

  return (
    <div className="block md:hidden">
      {/* Hamburger Menu Button */}
      <MobileNavButton 
        onClick={() => setIsOpen(true)} 
        forceDarkMode={actualForceDarkMode} 
      />

      {/* Full Screen Menu Overlay */}
      <MobileMenuOverlay 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </div>
  );
};

export default MobileNav;
