
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface NavLogoProps {
  isScrolled?: boolean;
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
  forceSize?: string;
}

const NavLogo = ({ 
  isScrolled = false, 
  isHeroPage = false, 
  forceDarkMode = false,
  forceSize = "h-60" 
}: NavLogoProps) => {
  const location = useLocation();
  const isConferencePage = location.pathname === "/conference";
  
  // Determine which logo to use based on the current page, scroll state, and forceDarkMode
  // For conference page with white background (no hero), use black logo
  // For hero pages when not scrolled or when forceDarkMode is false, use white logo
  const logoSrc = ((isHeroPage && !isScrolled) || 
                   (isConferencePage && isHeroPage) ||
                   (forceDarkMode && !isConferencePage))
    ? "/logos/RAADE-logo-final-white.png" 
    : "/logos/RAADE-logo-final-black.png";

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
