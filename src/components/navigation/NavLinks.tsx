import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useLocation } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import JoinButton from "./JoinButton";
import { navItems } from "./navConfig";
import { useNavigation } from "@/hooks/navigation/useNavigation";

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
 */
const NavLinks = ({ className = "", onClick, isScrolled = false, isHeroPage = false, forceDarkMode = false }: NavLinksProps) => {
  const location = useLocation();
  const { handleNavigation } = useNavigation();
  
  const isProjectPage = location.pathname.includes('/projects/');
  const isApplicationPage = location.pathname === "/studios/apply" || location.pathname === "/studios/partner";
  
  const getTextColor = () => {
    if (isProjectPage || isApplicationPage) {
      return "text-white hover:text-[#FBB03B]";
    }
    
    if (forceDarkMode) {
      return "text-[#274675] hover:text-[#FBB03B]";
    }
    
    return "text-white hover:text-[#FBB03B]";
  };

  const getButtonStyles = () => {
    if (isProjectPage || isApplicationPage) {
      return "border-white text-white hover:bg-[#FBB03B] hover:border-[#FBB03B] hover:text-white";
    }
    
    if (!forceDarkMode) {
      return "border-white text-white hover:bg-[#FBB03B] hover:border-[#FBB03B] hover:text-white";
    }
    
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
    <NavigationMenu>
      <NavigationMenuList className="flex space-x-6">
        {navItems.map((item) => (
          <NavigationMenuItem key={item.name}>
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
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <JoinButton 
            buttonStyles={getButtonStyles()} 
            onClick={onClick}
          />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavLinks;
