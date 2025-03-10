
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
  const isConferencePage = location.pathname === "/conference";
  const isStudiosPage = location.pathname === "/studios";
  
  // Determine which logo to use based on the current page, scroll state, and forceDarkMode
  // When forceDarkMode is true, use black logo (dark mode means dark UI elements)
  // When forceDarkMode is false and we're on a hero or special page, use white logo
  
  // For short form logos
  let shortFormLogoSrc = forceDarkMode
    ? "/logos/RAADE-logo-short-form-black.png" 
    : "/logos/RAADE-logo-short-form-white.png";
    
  // For regular logos
  let regularLogoSrc = forceDarkMode
    ? "/logos/RAADE-logo-final-black.png" 
    : "/logos/RAADE-logo-final-white.png";
    
  const logoSrc = useShortForm ? shortFormLogoSrc : regularLogoSrc;

  return (
    <div className="flex-shrink-0 flex items-center">
      <Link to="/" className="flex items-center">
        <img
          className={`${forceSize} w-auto transition-all duration-300`}
          src={logoSrc}
          alt="RAADE"
        />
      </Link>
    </div>
  );
};

export default NavLogo;
