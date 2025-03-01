
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface NavLogoProps {
  isScrolled?: boolean;
  isHeroPage?: boolean;
}

const NavLogo = ({ isScrolled = false, isHeroPage = false }: NavLogoProps) => {
  const location = useLocation();
  
  // Determine which logo to use based on the current page and scroll state
  // For hero pages when not scrolled, use white logo
  // For other pages or when scrolled, use black logo
  const logoSrc = isHeroPage && !isScrolled 
    ? "/logos/RAADE-logo-final-white.png" 
    : "/logos/RAADE-logo-final-black.png";

  return (
    <div className="flex-shrink-0 flex items-center">
      <Link to="/" className="flex items-center">
        <img
          className="h-60 w-auto transition-all duration-300" 
          src={logoSrc}
          alt="RAADE"
        />
      </Link>
    </div>
  );
};

export default NavLogo;
