
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import JoinButton from "./JoinButton";
import navConfig from "./navConfig"; // Change from named import to default import
import { useNavigation as useNavigationContext } from "./context/useNavigation";
import { useNavigation as useNavigationHook } from "@/hooks/navigation/useNavigation";
import { useNavBackgroundStyle } from "@/hooks/navigation/useNavBackgroundStyle";

interface NavLinksProps {
  className?: string;
  onClick?: () => void;
  isScrolled?: boolean;
  isHeroPage?: boolean;
  forceDarkMode?: boolean;
}

/**
 * NavLinks Component - Displays the main navigation links
 * 
 * Features:
 * - Uses React Router for client-side navigation
 * - Consistently styles links based on background detection system:
 *   - Dark backgrounds -> White text with gold hover
 *   - Light backgrounds -> Navy blue text with gold hover
 * - Ensures button styling matches link styling for visual consistency
 */
const NavLinks = ({ className = "", onClick, isScrolled = false, isHeroPage = false, forceDarkMode = false }: NavLinksProps) => {
  const location = useLocation();
  const { handleNavigation } = useNavigationHook();
  const { state } = useNavigationContext();
  const { isDarkBackground, isLightBackground } = state;
  
  // Get background context from our hook
  const { isAgainstDarkBackground } = useNavBackgroundStyle();
  
  const isProjectPage = location.pathname.includes('/projects/');
  const isStudioPage = location.pathname.includes('/studios');
  const isApplicationPage = location.pathname === "/studios/apply" || location.pathname === "/studios/partner";
  
  /**
   * Get text color for nav links based on background and context
   * - On dark backgrounds: white text
   * - On light backgrounds: dark blue text (#274675)
   */
  const getTextColor = () => {
    // Special page overrides or against dark background - use white text
    if (isProjectPage || isApplicationPage || isStudioPage || isAgainstDarkBackground) {
      return "text-white hover:text-[#FBB03B]";
    }
    
    // Default for light backgrounds - use navy blue text
    return "text-[#274675] hover:text-[#FBB03B]";
  };

  /**
   * Get button styles based on background and context
   * - On dark backgrounds: white border, transparent background
   * - On light backgrounds: dark blue/gold styles
   */
  const getButtonStyles = () => {
    // Special page overrides or against dark background - use white button
    if (isProjectPage || isApplicationPage || isStudioPage || isAgainstDarkBackground) {
      return "border-white text-white hover:bg-[#FBB03B] hover:border-[#FBB03B] hover:text-white";
    }
    
    // Default for light backgrounds - gold button
    return "border-[#FBB03B] bg-[#FBB03B] text-white hover:bg-[#274675] hover:border-[#274675] shadow-md";
  };
  
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent bubbling
    
    // First call the onClick handler if provided (for closing mobile menu)
    if (onClick) onClick();
    
    // Then handle navigation
    handleNavigation(href);
  };

  return (
    <div className="flex items-center">
      <ul className="flex space-x-6">
        {navConfig.mainNavItems.map((item) => (
          <li key={item.name} className="relative">
            {item.dropdownItems ? (
              <NavDropdown
                name={item.name}
                href={item.href}
                dropdownItems={item.dropdownItems}
                textColor={getTextColor()}
                onClick={onClick}
              />
            ) : (
              <a
                href={item.href}
                className={`${getTextColor()} transition-colors duration-300 ${className} text-lg font-alegreyasans font-bold`}
                onClick={(e) => handleLinkClick(e, item.href)}
              >
                {item.name}
              </a>
            )}
          </li>
        ))}
        <li>
          <JoinButton 
            buttonStyles={getButtonStyles()} 
            onClick={onClick}
          />
        </li>
      </ul>
    </div>
  );
};

export default NavLinks;
