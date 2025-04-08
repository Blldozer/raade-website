
import React from "react";
import NavLinks from "./NavLinks";
import { useNavigation } from "./context/useNavigation";

interface DesktopNavProps {
  isScrolled?: boolean;
  isHeroPage?: boolean;
  className?: string;
  forceDarkMode?: boolean;
  isDropdownOpen?: Record<string, boolean>;
  onDropdownChange?: (key: string, isOpen: boolean) => void;
  onClickLink?: () => void;
}

/**
 * DesktopNav Component
 * 
 * Renders the desktop version of the navigation with links
 * Uses the navigation context for styling decisions
 * 
 * @param isScrolled - Whether the page has been scrolled (legacy prop, use context instead)
 * @param isHeroPage - Whether this is displayed on a hero section (legacy prop, use context instead)
 * @param className - Additional CSS classes to apply
 * @param forceDarkMode - Whether to force dark mode styling (legacy prop, use context instead)
 */
const DesktopNav = ({ 
  isScrolled = false, 
  isHeroPage = false, 
  className = "", 
  forceDarkMode = false,
  isDropdownOpen,
  onDropdownChange,
  onClickLink
}: DesktopNavProps) => {
  // Use the navigation context for styling
  const { state } = useNavigation();
  
  // Prioritize context values but fall back to props for backward compatibility
  const actualIsScrolled = state.isScrolled || isScrolled;
  const actualIsHeroPage = state.isHeroPage || isHeroPage;
  
  // Use light background to determine if we should use dark mode styling
  // When on light backgrounds, use dark text/dark logo
  const actualForceDarkMode = state.isLightBackground || forceDarkMode;
  
  return (
    <div className={`hidden md:flex items-center space-x-8 ${className}`}>
      <NavLinks 
        isDropdownOpen={isDropdownOpen}
        onDropdownChange={onDropdownChange}
        onClickLink={onClickLink}
      />
    </div>
  );
};

export default DesktopNav;
