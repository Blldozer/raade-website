
// This is the fixed code for the hamburger implementation with proper React context handling

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
 * - Enhanced with React context error handling
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
  // Verify React is available
  if (typeof React !== 'object') {
    console.warn("MobileNav: React object unavailable");
    return null;
  }

  try {
    // Use the mobile navigation hook to manage state
    const mobileNavHook = useMobileNav();
    
    // If the hook returned null or invalid data, return minimal fallback
    if (!mobileNavHook || typeof mobileNavHook !== 'object') {
      console.warn("MobileNav: Mobile navigation hook unavailable");
      return (
        <div className="block md:hidden">
          <button className="p-2 rounded-full transition-colors text-gray-700" aria-label="Menu button (unavailable)">
            <span>☰</span>
          </button>
        </div>
      );
    }
    
    const { isOpen, toggleMenu, closeMenu } = mobileNavHook;
    
    // Try to get navigation context (might fail in some cases)
    let useDarkMode = false;
    
    try {
      // Use the navigation context to get styling info
      const { state } = useNavigation();
      useDarkMode = state.isLightBackground;
    } catch (error) {
      // Fallback if navigation context isn't available
      console.warn("MobileNav: Navigation context unavailable, using fallback styling");
      useDarkMode = forceDarkMode;
    }

    return (
      <div className="block md:hidden">
        {/* Hamburger Menu Button */}
        <MobileNavButton 
          onClick={toggleMenu} 
          forceDarkMode={useDarkMode} 
        />

        {/* Full Screen Menu Overlay */}
        {isOpen && (
          <MobileMenuOverlay 
            isOpen={isOpen} 
            onClose={closeMenu} 
          />
        )}
      </div>
    );
  } catch (error) {
    // Fallback for when React context is missing
    console.warn("MobileNav: React context unavailable, providing minimal fallback");
    
    // Minimal non-functional fallback that won't crash
    return (
      <div className="block md:hidden">
        <button 
          className="p-2 rounded-full transition-colors text-gray-700"
          aria-label="Menu (unavailable)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    );
  }
};

export default MobileNav;
