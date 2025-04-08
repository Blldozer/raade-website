
import React from "react";
import { Menu, X } from "lucide-react";
import { useNavigation } from "../context/useNavigation";

interface MobileNavButtonProps {
  onClick: () => void;
  forceDarkMode?: boolean;
  isOpen?: boolean;
}

/**
 * MobileNavButton Component
 * 
 * Button that toggles the mobile navigation menu
 * Adapts its appearance based on background color
 */
const MobileNavButton: React.FC<MobileNavButtonProps> = ({ 
  onClick, 
  forceDarkMode = false,
  isOpen = false
}) => {
  const { state } = useNavigation();
  const { isHeroPage, isScrolled } = state;
  
  // Determine if we're against a dark background (white text)
  const isAgainstDarkBackground = 
    (isHeroPage && !isScrolled) || 
    forceDarkMode || 
    state.isLightBackground === false;
  
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full transition-colors ${
        isAgainstDarkBackground
          ? "text-white hover:bg-white/10"
          : "text-gray-800 hover:bg-gray-100"
      }`}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {isOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <Menu className="h-6 w-6" />
      )}
    </button>
  );
};

export default MobileNavButton;
