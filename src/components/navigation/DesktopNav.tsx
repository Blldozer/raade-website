
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavBackgroundStyle } from "@/hooks/navigation/useNavBackgroundStyle";
import { useNavigation } from "./context/useNavigation";
import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";
import JoinButton from "./JoinButton";

interface DesktopNavProps {
  className?: string;
  isDropdownOpen?: Record<string, boolean>;
  onDropdownChange?: (key: string, isOpen: boolean) => void;
  onClickLink?: () => void;
}

/**
 * DesktopNav Component
 * 
 * Desktop-specific navigation bar that includes:
 * - Logo
 * - Navigation links
 * - Join/Register button
 * 
 * Responsive to scroll position and page context.
 */
const DesktopNav: React.FC<DesktopNavProps> = ({
  className = "",
  isDropdownOpen,
  onDropdownChange,
  onClickLink
}) => {
  const location = useLocation();
  const { state } = useNavigation();
  const { isScrolled, isHeroPage, forceDarkMode } = state;
  
  // Get the appropriate background style
  const bgClass = useNavBackgroundStyle();
  
  // Track dropdown states
  const [dropdownStates, setDropdownStates] = useState<Record<string, boolean>>({});
  
  // Handle dropdown toggle
  const handleDropdownChange = (key: string, isOpen: boolean) => {
    if (onDropdownChange) {
      onDropdownChange(key, isOpen);
    } else {
      setDropdownStates(prev => ({
        ...prev,
        [key]: isOpen
      }));
    }
  };
  
  // Determine dropdown state - controlled or uncontrolled
  const actualDropdownStates = isDropdownOpen || dropdownStates;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass} ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <NavLogo />
          
          <div className="hidden md:flex items-center space-x-2">
            <NavLinks 
              isDropdownOpen={actualDropdownStates}
              onDropdownChange={handleDropdownChange}
              onClickLink={onClickLink}
            />
            
            <div className="ml-4">
              <JoinButton buttonStyles="bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DesktopNav;
