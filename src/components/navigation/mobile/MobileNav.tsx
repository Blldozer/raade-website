import { useNavigation } from "../context/NavigationContext";
import MobileNavButton from "./MobileNavButton";
import MobileNavHeader from "./MobileNavHeader";
import MobileNavLinks from "./MobileNavLinks";
import MobileNavFooter from "./MobileNavFooter";
import { useMobileNav } from "@/hooks/useMobileNav";
import { navItems, mobileFooterItems } from "../navConfig";
import React from 'react';

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

  // Handle body overflow to prevent scrolling when menu is open
  React.useEffect(() => {
    if (isOpen) {
      console.log("Mobile menu opened - locking body scroll");
      // Store the current scroll position
      const scrollY = window.scrollY;
      // Lock body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        console.log("Mobile menu closed - restoring body scroll");
        // Restore scroll position when component unmounts or effect reruns
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  return (
    <div className="block md:hidden">
      {/* Hamburger Menu Button */}
      <MobileNavButton 
        onClick={openMenu} 
        forceDarkMode={actualForceDarkMode} 
      />

      {/* Full Screen Menu Overlay - Directly embedded for better control */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-[#274675] z-[1000] flex flex-col h-full w-screen transition-all duration-300 ease-in-out"
          role="dialog"
          aria-modal="true"
        >
          <MobileNavHeader onClose={closeMenu} />
          <MobileNavLinks 
            items={navItems} 
            footerItems={mobileFooterItems} 
            onLinkClick={closeMenu} 
          />
          <MobileNavFooter onLinkClick={closeMenu} />
        </div>
      )}
    </div>
  );
};

export default MobileNav;
