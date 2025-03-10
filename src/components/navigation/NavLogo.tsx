
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

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

  return (
    <div className="flex-shrink-0 flex items-center">
      <Link to="/" className="flex items-center relative">
        {/* Primary logo (visible) */}
        <img
          className={`${forceSize} w-auto transition-opacity duration-300 ease-in-out z-10`}
          src={primaryLogo}
          alt="RAADE"
        />
        
        {/* Secondary logo (hidden until state changes) - positioned absolutely underneath */}
        <img
          className={`${forceSize} w-auto absolute top-0 left-0 opacity-0 transition-opacity duration-300 ease-in-out pointer-events-none`}
          src={secondaryLogo}
          alt="RAADE"
        />
      </Link>
    </div>
  );
};

export default NavLogo;
