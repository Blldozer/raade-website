
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
 * - Prevents main dropdown trigger from navigating immediately
 */
const NavDropdown = ({ name, href, dropdownItems, textColor = "text-white", onClick }: NavDropdownProps) => {
  const { handleNavigation } = useNavigation();
  
  // Handle explicit click on the main dropdown name (not the trigger itself)
  // This allows the dropdown to open normally when clicking the trigger area
  const handleMainClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onClick) onClick();
    handleNavigation(href);
  };

  return (
    <div className="relative group">
      <NavigationMenuTrigger
        className={`${textColor} transition-colors duration-300 text-lg font-alegreyasans font-bold bg-transparent hover:bg-transparent focus:bg-transparent`}
      >
        {/* Wrap just the text in a clickable element for direct navigation */}
        {/* The outer trigger will still handle the dropdown toggle behavior */}
        <span 
          onClick={handleMainClick}
          className="cursor-pointer"
          style={{ pointerEvents: 'none' }} // This prevents triggering navigation when clicking on the name
        >
          {name}
        </span>
      </NavigationMenuTrigger>
      
      <NavigationMenuContent>
        <ul className="grid min-w-[150px] w-full p-2 bg-white shadow-md rounded-md z-50">
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
