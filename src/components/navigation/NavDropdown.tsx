
import React, { useRef } from "react";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface NavDropdownProps {
  triggerText: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

/**
 * NavDropdown Component
 * 
 * Dropdown menu for navigation items
 * Handles open/close state and click outside detection
 */
const NavDropdown: React.FC<NavDropdownProps> = ({
  triggerText,
  isOpen,
  onOpenChange,
  children
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Handle click outside to close dropdown
  useOnClickOutside(dropdownRef, () => {
    if (isOpen) {
      onOpenChange(false);
    }
  });
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center text-sm font-medium hover:text-[#FBB03B] transition-colors"
        onClick={() => onOpenChange(!isOpen)}
        aria-expanded={isOpen}
      >
        {triggerText}
        {isOpen ? (
          <ChevronUp className="ml-1 h-4 w-4" />
        ) : (
          <ChevronDown className="ml-1 h-4 w-4" />
        )}
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20">
          <div className="py-1">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
