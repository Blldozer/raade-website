
import React from "react";
import { useNavigation } from "@/hooks/navigation/useNavigation";

interface NavDropdownItemProps {
  name: string;
  href: string;
  onClick?: () => void;
}

/**
 * NavDropdownItem Component
 * 
 * Renders individual dropdown navigation links with:
 * - Consistent padding and spacing that aligns with the grid system
 * - Improved text scaling for all device sizes
 * - Balanced hover effects and transitions
 */
const NavDropdownItem = ({
  name,
  href,
  onClick
}: NavDropdownItemProps) => {
  const {
    handleNavigation
  } = useNavigation();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Call custom onClick handler if provided
    if (onClick) onClick();

    // Handle navigation
    handleNavigation(href);
  };
  
  return (
    <li>
      <a 
        href={href} 
        onClick={handleClick} 
        className="block px-4 py-2 text-[clamp(0.9rem,1.5vw,1.1rem)] text-[#274675] hover:text-[#FBB03B] hover:bg-[#F5F5F0] transition-colors font-alegreyasans font-bold"
      >
        {name}
      </a>
    </li>
  );
};

export default NavDropdownItem;
