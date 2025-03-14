
import { useState } from "react";
import MobileNavButton from "./mobile/MobileNavButton";
import MobileMenuOverlay from "./mobile/MobileMenuOverlay";

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

  return (
    <div className="md:hidden">
      {/* Hamburger Menu Button */}
      <MobileNavButton 
        onClick={() => setIsOpen(true)} 
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
