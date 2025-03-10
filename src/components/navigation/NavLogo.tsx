
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface NavLogoProps {
  isScrolled?: boolean;
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
  forceSize?: string;
  useShortForm?: boolean;
}

const NavLogo = ({ 
  isScrolled = false, 
  isHeroPage = false, 
  forceDarkMode = false,
  forceSize = "h-20", // Using h-20 for both black and white logos
  useShortForm = false
}: NavLogoProps) => {
  const location = useLocation();
  const [showSecondary, setShowSecondary] = useState(false);
  
  // For short form logos
  const blackShortFormLogo = "/logos/RAADE-logo-short-form-black.png";
  const whiteShortFormLogo = "/logos/RAADE-logo-short-form-white.png";
    
  // For regular logos
  const blackRegularLogo = "/logos/RAADE-logo-final-black.png";
  const whiteRegularLogo = "/logos/RAADE-logo-final-white.png";
  
  // Determine which logos to use (black or white)
  const primaryLogo = forceDarkMode
    ? (useShortForm ? blackShortFormLogo : blackRegularLogo)
    : (useShortForm ? whiteShortFormLogo : whiteRegularLogo);
    
  const secondaryLogo = forceDarkMode
    ? (useShortForm ? whiteShortFormLogo : whiteRegularLogo)
    : (useShortForm ? blackShortFormLogo : blackRegularLogo);

  // Reset the state when forceDarkMode changes
  useEffect(() => {
    setShowSecondary(false);
  }, [forceDarkMode, useShortForm]);

  return (
    <div className="flex-shrink-0 flex items-center">
      <Link to="/" className="flex items-center relative">
        {/* Primary logo (visible when showSecondary is false) */}
        <img
          className={`${forceSize} w-auto transition-opacity duration-300 ease-in-out z-10 ${showSecondary ? 'opacity-0' : 'opacity-100'}`}
          src={primaryLogo}
          alt="RAADE"
        />
        
        {/* Secondary logo (visible when showSecondary is true) */}
        <img
          className={`${forceSize} w-auto absolute top-0 left-0 transition-opacity duration-300 ease-in-out pointer-events-none ${showSecondary ? 'opacity-100' : 'opacity-0'}`}
          src={secondaryLogo}
          alt="RAADE"
        />
      </Link>
    </div>
  );
};

export default NavLogo;
