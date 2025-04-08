
import React from "react";
import { useNavigate } from "react-router-dom";
import { useNavigation } from "./context/useNavigation";

interface NavLogoProps {
  forceBlackLogo?: boolean;
  useShortForm?: boolean;
  forceSize?: string;
}

/**
 * NavLogo Component
 * 
 * Renders the RAADE logo in the navigation bar
 * Handles short form vs. full logo display
 * Responsive to light/dark mode
 */
const NavLogo: React.FC<NavLogoProps> = ({
  forceBlackLogo,
  useShortForm,
  forceSize
}) => {
  const navigate = useNavigate();
  const { state } = useNavigation();
  
  // Use props if provided, otherwise use context values
  const isScrolled = state.isScrolled || false;
  const isHeroPage = state.isHeroPage || false;
  const forceDarkMode = forceBlackLogo === undefined ? state.forceDarkMode : !forceBlackLogo;
  const useShortFormLogo = useShortForm === undefined ? state.useShortFormLogo : useShortForm;
  
  // Determine if we're on a dark background
  const isOnDarkBackground = 
    (isHeroPage && !isScrolled) || // Transparent on hero
    forceDarkMode || // Forced dark mode
    state.isDarkBackground; // Dynamic dark background
  
  // Get the appropriate logo variant
  let logoSrc = useShortFormLogo
    ? (isOnDarkBackground ? "/logos/RAADE-logo-short-form-white.png" : "/logos/RAADE-logo-short-form-black.png")
    : (isOnDarkBackground ? "/logos/RAADE-logo-final-white.png" : "/logos/RAADE-logo-final-black.png");
  
  // Fallback if image doesn't exist
  logoSrc = "/logos/RAADE-Logo-web-crawlers.png";
  
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div 
      className="flex items-center cursor-pointer"
      onClick={handleLogoClick}
    >
      <img 
        src={logoSrc} 
        alt="RAADE Logo" 
        className={forceSize || "h-8 md:h-10"}
      />
    </div>
  );
};

export default NavLogo;
