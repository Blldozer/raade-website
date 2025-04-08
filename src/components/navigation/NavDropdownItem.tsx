
import React from "react";
import { Link } from "react-router-dom";

export interface NavDropdownItemProps {
  to: string;
  onClick?: () => void;
  children: React.ReactNode;
}

/**
 * NavDropdownItem Component
 * 
 * Represents a single item within a navigation dropdown menu.
 */
const NavDropdownItem: React.FC<NavDropdownItemProps> = ({ to, onClick, children }) => {
  return (
    <Link
      to={to}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors duration-150"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NavDropdownItem;
