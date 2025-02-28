
import { Link } from "react-router-dom";
interface NavLogoProps {
  isScrolled?: boolean;
  isDarkBackground?: boolean;
}
const NavLogo = ({
  isScrolled = false,
  isDarkBackground = false
}: NavLogoProps) => {
  // Determine which logo to use based on the background it will be displayed against
  const logoSrc = isDarkBackground 
    ? "/logos/RAADE-LOGO-Black-BG.png" // Use white text logo on dark backgrounds
    : "/logos/RAADE-LOGO-White-BG.png"; // Use dark text logo on light backgrounds

  return <div className="flex-shrink-0 flex items-center">
      <Link to="/">
        <img src={logoSrc} alt="RAADE Logo" className="h-28 w-auto transition-all duration-300 hover:scale-105 object-contain" />
      </Link>
    </div>;
};
export default NavLogo;
