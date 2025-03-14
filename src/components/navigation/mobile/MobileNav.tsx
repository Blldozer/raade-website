
import { useState } from "react";
import MobileNavButton from "./MobileNavButton";
import MobileMenuOverlay from "./MobileMenuOverlay";

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
 * @param isScrolled - Whether the page has been scrolled
 * @param isHeroPage - Whether this is displayed on a hero section
 * @param forceDarkMode - Whether to force dark mode styling
 */
const MobileNav = ({ isScrolled = false, isHeroPage = false, forceDarkMode = false }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    console.log("Mobile menu toggle clicked, current state:", isOpen);
    setIsOpen(prevState => !prevState);
  };

  return (
    <div className="md:hidden">
      {/* Hamburger Menu Button */}
      <MobileNavButton 
        onClick={handleToggleMenu} 
        forceDarkMode={forceDarkMode} 
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
