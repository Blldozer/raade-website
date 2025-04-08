
import React, { useState, useRef } from "react";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import { ChevronDown } from "lucide-react";

export interface NavDropdownProps {
  triggerText: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  children: React.ReactNode;
}

/**
 * NavDropdown Component
 * 
 * Provides a dropdown menu for navigation items with children.
 * Handles open/close state and click outside behavior.
 */
const NavDropdown: React.FC<NavDropdownProps> = ({ 
  triggerText, 
  isOpen, 
  onOpenChange,
  children 
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useOnClickOutside(dropdownRef, () => {
    if (isOpen) {
      onOpenChange(false);
    }
  });

  const toggleDropdown = () => {
    onOpenChange(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center px-3 py-2 text-sm font-medium transition-colors"
        aria-expanded={isOpen}
      >
        {triggerText}
        <ChevronDown
          className={`ml-1 h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 z-10 mt-1 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
          <div className="py-1">{children}</div>
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
