
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import NavDropdownItem from "./NavDropdownItem";
import { useNavigation } from "./context/useNavigation";

interface NavLinksProps {
  className?: string;
  isDropdownOpen?: Record<string, boolean>;
  onDropdownChange?: (key: string, isOpen: boolean) => void;
  onClickLink?: () => void;
}

/**
 * NavLinks Component
 * 
 * Contains all navigation links and dropdowns for the site.
 */
const NavLinks: React.FC<NavLinksProps> = ({
  className = "",
  isDropdownOpen = {},
  onDropdownChange,
  onClickLink,
}) => {
  const location = useLocation();
  const { state } = useNavigation();
  
  const [localDropdownState, setLocalDropdownState] = useState<Record<string, boolean>>({});
  
  // Use provided dropdown state or fall back to local state
  const dropdownState = isDropdownOpen || localDropdownState;
  
  const handleDropdownChange = (key: string, isOpen: boolean) => {
    if (onDropdownChange) {
      onDropdownChange(key, isOpen);
    } else {
      setLocalDropdownState(prev => ({ ...prev, [key]: isOpen }));
    }
  };

  const handleClickLink = () => {
    if (onClickLink) {
      onClickLink();
    }
  };
  
  const linkBaseClasses = "font-medium transition-colors duration-200";
  const linkClasses = state.isLightBackground
    ? `${linkBaseClasses} text-gray-900 hover:text-[#274675]`
    : state.isScrolled
    ? `${linkBaseClasses} text-gray-900 hover:text-[#274675]`
    : `${linkBaseClasses} text-white hover:text-[#FBB03B]`;

  return (
    <nav className={`flex items-center space-x-8 ${className}`}>
      <Link to="/" className={linkClasses} onClick={handleClickLink}>
        Home
      </Link>
      
      <Link to="/about" className={linkClasses} onClick={handleClickLink}>
        About
      </Link>
      
      <NavDropdown 
        triggerText="What We Do" 
        isOpen={dropdownState["whatWeDo"] || false}
        onOpenChange={(open) => handleDropdownChange("whatWeDo", open)}
      >
        <NavDropdownItem to="/innovation-studios" onClick={handleClickLink}>
          Innovation Studios
        </NavDropdownItem>
        <NavDropdownItem to="/conference" onClick={handleClickLink}>
          Annual Conference
        </NavDropdownItem>
        <NavDropdownItem to="/coming-soon" onClick={handleClickLink}>
          Past Projects
        </NavDropdownItem>
      </NavDropdown>
      
      <NavDropdown 
        triggerText="Get Involved" 
        isOpen={dropdownState["getInvolved"] || false}
        onOpenChange={(open) => handleDropdownChange("getInvolved", open)}
      >
        <NavDropdownItem to="/student-application" onClick={handleClickLink}>
          Students
        </NavDropdownItem>
        <NavDropdownItem to="/partner-application" onClick={handleClickLink}>
          Partners
        </NavDropdownItem>
        <NavDropdownItem to="/donate" onClick={handleClickLink}>
          Donate
        </NavDropdownItem>
      </NavDropdown>

      <Link to="/donate" className={`${linkClasses} hidden lg:block`} onClick={handleClickLink}>
        Donate
      </Link>
      
      <Link 
        to="/conference/registration" 
        className="bg-[#FBB03B] text-white px-4 py-2 rounded-md font-medium hover:bg-[#FBB03B]/90 transition-colors"
        onClick={handleClickLink}
      >
        Register
      </Link>
    </nav>
  );
};

export default NavLinks;
