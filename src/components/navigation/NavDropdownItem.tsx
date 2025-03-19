
import React from "react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { useNavigation } from "@/hooks/navigation/useNavigation";

interface NavDropdownItemProps {
  name: string;
  href: string;
  onClick?: () => void;
}

/**
 * NavDropdownItem Component - Individual items in navigation dropdown menus
 * 
 * Features:
 * - Handles both click callbacks and navigation
 * - Prevents default link behavior to use client-side routing
 * - Properly formats and styles menu items
 */
const NavDropdownItem = ({ name, href, onClick }: NavDropdownItemProps) => {
  const { handleNavigation } = useNavigation();
  
  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // First call the onClick handler if provided (for closing mobile menu)
    if (onClick) onClick();
    
    // Then handle navigation
    handleNavigation(href);
  };
  
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          onClick={handleItemClick}
        >
          <div className="text-sm font-medium leading-none">{name}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

export default NavDropdownItem;
