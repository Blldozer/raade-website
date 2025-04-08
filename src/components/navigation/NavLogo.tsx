
import React from "react";
import { useNavigate } from "react-router-dom";
import { useNavigation } from "./context/useNavigation";

/**
 * NavLogo Component
 * 
 * Renders the RAADE logo in the navigation bar
 * Handles short form vs. full logo display
 * Manages appropriate color variations based on background
 */
const NavLogo: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useNavigation();
  const { isHeroPage, useShortFormLogo, forceDarkMode, isScrolled } = state;

  // Determine which logo variant to use
  let logoSrc = "";

  // Determine if we're against a dark background
  const isAgainstDarkBackground = 
    (isHeroPage && !isScrolled) || 
    forceDarkMode || 
    isScrolled;

  if (useShortFormLogo) {
    // Short form logo
    logoSrc = isAgainstDarkBackground
      ? "/logos/RAADE-logo-short-form-white.png"
      : "/logos/RAADE-logo-short-form-black.png";
  } else {
    // Full logo
    logoSrc = isAgainstDarkBackground
      ? "/logos/RAADE-logo-final-white.png"
      : "/logos/RAADE-logo-final-black.png";
  }

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
        className="h-8 md:h-10"
      />
    </div>
  );
};

export default NavLogo;
