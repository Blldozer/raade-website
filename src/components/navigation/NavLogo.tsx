import { Link } from "react-router-dom";
interface NavLogoProps {
  isScrolled?: boolean;
  isDarkBackground?: boolean;
}
const NavLogo = ({
  isScrolled = false,
  isDarkBackground = false
}: NavLogoProps) => {
  // Determine which logo to use based on background color
  const logoSrc = isDarkBackground ? "/logos/RAADE-LOGO-Black-BG.png" // On dark backgrounds, use logo with black background (white text)
  : "/logos/RAADE-LOGO-White-BG.png"; // On light backgrounds, use logo with white background (dark text)

  return <div className="flex-shrink-0 flex items-center">
      <Link to="/">
        <img src={logoSrc} alt="RAADE Logo" className="h-28 w-auto transition-all duration-300 hover:scale-105 object-scale-down" />
      </Link>
    </div>;
};
export default NavLogo;