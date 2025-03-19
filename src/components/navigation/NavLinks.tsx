
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import JoinButton from "./JoinButton";
import navConfig from "./navConfig"; // Change from named import to default import
import { useNavigation as useNavigationContext } from "./context/useNavigation";
import { useNavigation as useNavigationHook } from "@/hooks/navigation/useNavigation";

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
 * - Conditionally styles links based on context
 * - Supports dropdown menus for section navigation
 * - Adapts style based on the background color of the current section
 */
const NavLinks = ({ className = "", onClick, isScrolled = false, isHeroPage = false, forceDarkMode = false }: NavLinksProps) => {
  const location = useLocation();
  const { handleNavigation } = useNavigationHook();
  const { state } = useNavigationContext();
  const { isDarkBackground, isLightBackground } = state;
  
  const isProjectPage = location.pathname.includes('/projects/');
  const isApplicationPage = location.pathname === "/studios/apply" || location.pathname === "/studios/partner";
  
  /**
   * Get text color for nav links based on background and context
   * - On project pages: always white text on dark background
   * - On application pages: always white text on dark background
   * - On light backgrounds: dark blue text (#274675)
   * - On dark backgrounds: white text
   */
  const getTextColor = () => {
    // Special page overrides
    if (isProjectPage || isApplicationPage) {
      return "text-white hover:text-[#FBB03B]";
    }
    
    // When on a light background or when dark mode is forced, use dark text
    if (forceDarkMode || isLightBackground) {
      return "text-[#274675] hover:text-[#FBB03B]";
    }
    
    // Default for dark backgrounds
    return "text-white hover:text-[#FBB03B]";
  };

  /**
   * Get button styles based on background and context
   * - On project pages: white border, transparent background
   * - On application pages: white border, transparent background
   * - On light backgrounds: dark blue/gold styles
   * - On dark backgrounds: white/gold styles
   */
  const getButtonStyles = () => {
    // Special page overrides
    if (isProjectPage || isApplicationPage) {
      return "border-white text-white hover:bg-[#FBB03B] hover:border-[#FBB03B] hover:text-white";
    }
    
    // When on dark backgrounds and not forced to dark mode, use white button
    if (!forceDarkMode && !isLightBackground) {
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
