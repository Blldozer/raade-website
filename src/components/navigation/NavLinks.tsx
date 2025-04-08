
import { Link, useLocation } from "react-router-dom";
import React from "react";
import NavDropdown from "./NavDropdown";
import NavDropdownItem from "./NavDropdownItem";
import { Button } from "@/components/ui/button";

/**
 * Main navigation links component for the desktop and mobile menu
 * 
 * @param className - Additional CSS classes
 * @param isDropdownOpen - Controls dropdown state in mobile view
 * @param onDropdownChange - Callback for dropdown state changes
 * @param onClickLink - Callback for link clicks (mainly for mobile)
 */
const NavLinks = ({
  className,
  isDropdownOpen,
  onDropdownChange,
  onClickLink,
}: {
  className?: string;
  isDropdownOpen?: Record<string, boolean>;
  onDropdownChange?: (key: string, isOpen: boolean) => void;
  onClickLink?: () => void;
}) => {
  const location = useLocation();
  const isCurrent = (path: string) => location.pathname === path;

  return (
    <nav
      className={`flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-1 lg:space-x-2 ${className}`}
    >
      <Link
        to="/about"
        onClick={onClickLink}
        className={`text-base px-4 py-2 rounded-md transition-colors ${
          isCurrent("/about")
            ? "text-black dark:text-white bg-black/5 dark:bg-white/10"
            : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
        }`}
      >
        About
      </Link>

      <Link
        to="/conference"
        onClick={onClickLink}
        className={`text-base px-4 py-2 rounded-md transition-colors ${
          location.pathname.startsWith("/conference")
            ? "text-black dark:text-white bg-black/5 dark:bg-white/10"
            : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
        }`}
      >
        Conference
      </Link>

      <Link
        to="/innovation-studios"
        onClick={onClickLink}
        className={`text-base px-4 py-2 rounded-md transition-colors ${
          isCurrent("/innovation-studios")
            ? "text-black dark:text-white bg-black/5 dark:bg-white/10"
            : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
        }`}
      >
        Innovation Studios
      </Link>

      <NavDropdown
        triggerText="Get Involved"
        isOpen={isDropdownOpen?.["getInvolved"] || false}
        onOpenChange={(open) =>
          onDropdownChange && onDropdownChange("getInvolved", open)
        }
      >
        <NavDropdownItem to="/student-application" onClick={onClickLink}>
          Student Application
        </NavDropdownItem>
        <NavDropdownItem to="/partner-application" onClick={onClickLink}>
          Partner Application
        </NavDropdownItem>
        <NavDropdownItem to="/donate" onClick={onClickLink}>
          Donate
        </NavDropdownItem>
      </NavDropdown>

      <div className="md:ml-2">
        <Button
          asChild
          className="w-full md:w-auto bg-[#274675] hover:bg-[#274675]/90 dark:bg-[#FBB03B] dark:hover:bg-[#FBB03B]/90"
        >
          <Link to="/conference/registration" onClick={onClickLink}>
            Register Now
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default NavLinks;
