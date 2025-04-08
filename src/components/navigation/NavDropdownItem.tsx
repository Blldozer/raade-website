
import React from "react";
import { useLocation } from "react-router-dom";

export interface NavDropdownItemProps {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}

/**
 * NavDropdownItem Component
 * 
 * Individual item inside a dropdown menu
 * Handles active state based on current route
 */
const NavDropdownItem: React.FC<NavDropdownItemProps> = ({ to, onClick, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <button
      className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
        isActive
          ? "bg-blue-50 text-[#FBB03B]"
          : "text-gray-700 hover:bg-gray-50 hover:text-[#FBB03B]"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default NavDropdownItem;
