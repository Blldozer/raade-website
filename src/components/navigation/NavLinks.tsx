
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import JoinButton from "./JoinButton";
import DonateButton from "./DonateButton";
import navConfig from "./navConfig"; 
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

const NavLinks = ({ 
  className = "", 
  onClick, 
  isScrolled = false, 
  isHeroPage = false, 
  forceDarkMode = false 
}: NavLinksProps) => {
  const location = useLocation();
  const { handleNavigation } = useNavigationHook();
  const { state } = useNavigationContext();
  const { isDarkBackground, isLightBackground } = state;
  
  const { isAgainstDarkBackground } = useNavBackgroundStyle();
  
  const isProjectPage = location.pathname.includes('/projects/');
  const isStudioPage = location.pathname.includes('/studios');
  const isApplicationPage = location.pathname === "/studios/apply" || location.pathname === "/studios/partner";
  
  const getTextColor = () => {
    // Explicitly handle Innovation Studios page with white text
    if (isStudioPage || isProjectPage || isApplicationPage || isAgainstDarkBackground) {
      return "text-white hover:text-[#FBB03B]";
    }
    
    // Default for light backgrounds - use navy blue text
    return "text-[#274675] hover:text-[#FBB03B]";
  };

  const getButtonStyles = () => {
    // Explicitly handle Innovation Studios page with white button
    if (isStudioPage || isProjectPage || isApplicationPage || isAgainstDarkBackground) {
      return "border-white text-white hover:bg-[#FBB03B] hover:border-[#FBB03B] hover:text-white";
    }
    
    // Default for light backgrounds - gold button
    return "border-[#FBB03B] bg-[#FBB03B] text-white hover:bg-[#274675] hover:border-[#274675] shadow-md";
  };
  
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onClick) onClick();
    
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
          <DonateButton 
            buttonStyles={getButtonStyles()} 
            onClick={onClick}
          />
        </li>
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

