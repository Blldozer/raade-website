import { useNavigation } from "../context/NavigationContext";
import MobileNavButton from "./MobileNavButton";
import MobileMenuOverlay from "./MobileMenuOverlay";
import { useMobileNav } from "@/hooks/useMobileNav";

interface MobileNavProps {
  isScrolled?: boolean;
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
}

/**
 * MobileNav Component
 * 
 * Provides a full-page mobile navigation experience:
 * - Slides in from the right covering the entire viewport with a solid background
 * - Shows all navigation links at once in a clear, accessible format
 * - Maintains consistent behavior across all pages
 * - Locks body scroll when menu is open to prevent background scrolling
 * 
 * @param isScrolled - Whether the page has been scrolled (legacy prop, use context instead)
 * @param isHeroPage - Whether this is displayed on a hero section (legacy prop, use context instead)
 * @param forceDarkMode - Whether to force dark mode styling (legacy prop, use context instead)
 */
const MobileNav = ({ 
  isScrolled = false, 
  isHeroPage = false, 
  forceDarkMode = false 
}: MobileNavProps) => {
  // Use mobile nav state from custom hook
  const { isOpen, openMenu, closeMenu } = useMobileNav();
  
  // Use the navigation context for styling
  const { state } = useNavigation();
  
  // Prioritize context values but fall back to props for backward compatibility
  const actualForceDarkMode = forceDarkMode || !state.isDarkBackground;

  return (
    <div className="block md:hidden">
      {/* Hamburger Menu Button */}
      <MobileNavButton 
        onClick={openMenu} 
        forceDarkMode={actualForceDarkMode} 
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
