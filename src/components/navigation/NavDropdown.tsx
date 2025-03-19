
import React from "react";
import {
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import NavDropdownItem from "./NavDropdownItem";
import { useNavigation } from "@/hooks/navigation/useNavigation";

interface NavDropdownProps {
  name: string;
  href: string;
  dropdownItems: {
    name: string;
    href: string;
  }[];
  textColor?: string;
  onClick?: () => void;
}

/**
 * NavDropdown Component - For navigation items with dropdown menus
 * 
 * Features:
 * - Uses NavigationMenu component from shadcn/ui
 * - Properly handles client-side navigation
 * - Supports closing mobile menus when clicked
 */
const NavDropdown = ({ name, href, dropdownItems, textColor = "text-white", onClick }: NavDropdownProps) => {
  const { handleNavigation } = useNavigation();
  
  // Handle click on the main dropdown trigger
  const handleMainClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (onClick) onClick();
    handleNavigation(href);
  };

  return (
    <div className="relative group">
      <NavigationMenuTrigger
        className={`${textColor} transition-colors duration-300 text-lg font-alegreyasans font-bold bg-transparent hover:bg-transparent focus:bg-transparent`}
      >
        <span onClick={handleMainClick}>{name}</span>
      </NavigationMenuTrigger>
      
      <NavigationMenuContent>
        <ul className="grid min-w-[150px] w-full p-2">
          {dropdownItems.map((item) => (
            <NavDropdownItem
              key={item.name}
              name={item.name}
              href={item.href}
              onClick={onClick}
            />
          ))}
        </ul>
      </NavigationMenuContent>
    </div>
  );
};

export default NavDropdown;
