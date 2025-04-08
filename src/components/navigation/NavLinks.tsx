
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigation } from "@/hooks/navigation/useNavigation";
import NavDropdown from "./NavDropdown";
import NavDropdownItem from "./NavDropdownItem";

interface NavLinksProps {
  isDropdownOpen?: Record<string, boolean>;
  onDropdownChange?: (key: string, isOpen: boolean) => void;
  onClickLink?: () => void;
}

/**
 * NavLinks Component
 * 
 * Main navigation links for the site header
 * Includes dropdown menus and active state handling
 */
const NavLinks: React.FC<NavLinksProps> = ({
  isDropdownOpen = {},
  onDropdownChange,
  onClickLink
}) => {
  const location = useLocation();
  const { handleNavigation } = useNavigation();
  
  // Track dropdown states internally if not controlled from parent
  const [dropdownStates, setDropdownStates] = useState<Record<string, boolean>>({});
  
  // Handle dropdown toggle with callback to parent
  const handleDropdownToggle = (key: string, isOpen: boolean) => {
    if (onDropdownChange) {
      onDropdownChange(key, isOpen);
    } else {
      setDropdownStates(prev => ({
        ...prev,
        [key]: isOpen
      }));
    }
  };
  
  // Determine active states based on current path
  const isAboutActive = location.pathname === "/about";
  const isStudiosActive = location.pathname.includes("/innovation-studios") ||
                          location.pathname.includes("/studios");
  const isConferenceActive = location.pathname.includes("/conference");
  const isDonateActive = location.pathname.includes("/donate");
  
  // Get dropdown state, either from props or internal state
  const getDropdownState = (key: string) => {
    return isDropdownOpen[key] !== undefined ? isDropdownOpen[key] : dropdownStates[key];
  };
  
  // Handle navigation with callback to parent
  const handleClick = (path: string) => {
    if (onClickLink) {
      onClickLink();
    }
    handleNavigation(path);
  };
  
  return (
    <nav className="flex items-center space-x-6">
      <div className="relative">
        <button
          className={`text-sm font-medium transition-colors ${
            isAboutActive ? "text-[#FBB03B]" : ""
          } hover:text-[#FBB03B]`}
          onClick={() => handleClick("/about")}
        >
          About
        </button>
      </div>
      
      <div className="relative">
        <button
          className={`text-sm font-medium transition-colors ${
            isStudiosActive ? "text-[#FBB03B]" : ""
          } hover:text-[#FBB03B]`}
          onClick={() => handleClick("/studios")}
        >
          Innovation Studios
        </button>
      </div>
      
      <div className="relative">
        <button
          className={`text-sm font-medium transition-colors ${
            isConferenceActive ? "text-[#FBB03B]" : ""
          } hover:text-[#FBB03B]`}
          onClick={() => handleClick("/conference")}
        >
          Conference
        </button>
      </div>
      
      <div className="relative">
        <NavDropdown
          triggerText="Get Involved"
          isOpen={getDropdownState("getInvolved")}
          onOpenChange={(open) => handleDropdownToggle("getInvolved", open)}
        >
          <NavDropdownItem 
            to="/apply/student" 
            onClick={() => handleClick("/apply/student")}
          >
            Apply as Student
          </NavDropdownItem>
          <NavDropdownItem 
            to="/apply/partner" 
            onClick={() => handleClick("/apply/partner")}
          >
            Partner with Us
          </NavDropdownItem>
          <NavDropdownItem 
            to="/donate" 
            onClick={() => handleClick("/donate")}
          >
            Donate
          </NavDropdownItem>
        </NavDropdown>
      </div>
      
      <div className="relative">
        <button
          className={`text-sm font-medium transition-colors ${
            isDonateActive ? "text-[#FBB03B]" : ""
          } hover:text-[#FBB03B]`}
          onClick={() => handleClick("/donate")}
        >
          Donate
        </button>
      </div>
    </nav>
  );
};

export default NavLinks;
