
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
 * - Proper styling consistent with the site's design
 * - Correct navigation handling via the useNavigation hook
 * - Support for custom onClick handlers (e.g., for closing mobile menu)
 * - Improved text scaling for better cross-device compatibility
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
  return <li>
      <a href={href} onClick={handleClick} className="block px-4 py-2 text-[clamp(0.9rem,3vw,1.1rem)] text-[#274675] hover:text-[#FBB03B] hover:bg-[#F5F5F0] transition-colors font-alegreyasans font-bold">
        {name}
      </a>
    </li>;
};
export default NavDropdownItem;
