
import React, { useState, useRef } from "react";
import { usePopper } from "react-popper";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import { useNavigation } from "./context/useNavigation";

export interface NavDropdownProps {
  triggerText: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

/**
 * NavDropdown Component
 * 
 * Provides a dropdown menu for navigation items with proper positioning
 * and accessibility features.
 */
const NavDropdown: React.FC<NavDropdownProps> = ({ 
  triggerText, 
  isOpen, 
  onOpenChange, 
  children 
}) => {
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { state } = useNavigation();
  
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [
      { name: 'offset', options: { offset: [0, 8] } },
      { name: 'preventOverflow', options: { padding: 8 } }
    ],
  });
  
  useOnClickOutside(dropdownRef, () => {
    if (isOpen) onOpenChange(false);
  });
  
  const linkBaseClasses = "font-medium transition-colors duration-200 flex items-center";
  const linkClasses = state.isLightBackground
    ? `${linkBaseClasses} text-gray-900 hover:text-[#274675]`
    : state.isScrolled
    ? `${linkBaseClasses} text-gray-900 hover:text-[#274675]`
    : `${linkBaseClasses} text-white hover:text-[#FBB03B]`;
  
  return (
    <div ref={dropdownRef}>
      <button 
        type="button"
        ref={setReferenceElement}
        className={`${linkClasses} gap-1`}
        onClick={() => onOpenChange(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {triggerText}
        {isOpen ? (
          <ChevronUp className="h-4 w-4 mt-0.5" />
        ) : (
          <ChevronDown className="h-4 w-4 mt-0.5" />
        )}
      </button>
      
      {isOpen && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className="z-50 bg-white rounded-md shadow-lg py-2 min-w-[180px] dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
