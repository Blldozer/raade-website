import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import NavDropdownItem from "./NavDropdownItem";
import { useNavigation } from "@/hooks/navigation/useNavigation";

interface NavDropdownProps {
  name: string;
  href: string;
  dropdownItems: {
    name: string;
    href: string;
  }[];
  textColor?: string;
  onClick?: () => void;
}

/**
 * NavDropdown Component - For navigation items with dropdown menus
 * 
 * Features:
 * - Custom dropdown positioning to ensure it appears beneath its parent
 * - Opens on both hover and click for better usability
 * - Properly handles client-side navigation
 * - Supports closing mobile menus when clicked
 * - Smooth animations for better user experience
 */
const NavDropdown = ({ name, href, dropdownItems, textColor = "text-white", onClick }: NavDropdownProps) => {
  const { handleNavigation } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Handle navigation when clicking the main button
  const handleMainClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onClick) onClick();
    handleNavigation(href);
  };
  
  // Toggle dropdown visibility on click
  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // Handle clicking outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div 
      className="relative"
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={`${textColor} flex items-center text-lg font-alegreyasans font-bold transition-colors duration-300`}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        <span 
          onClick={handleMainClick}
          className="cursor-pointer"
        >
          {name}
        </span>
        <ChevronDown 
          className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute left-0 top-full z-50 min-w-[180px] mt-1 bg-white rounded-md shadow-md overflow-hidden"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
          >
            <ul className="py-1">
              {dropdownItems.map((item) => (
                <NavDropdownItem
                  key={item.name}
                  name={item.name}
                  href={item.href}
                  onClick={() => {
                    setIsOpen(false);
                    if (onClick) onClick();
                  }}
                />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavDropdown;
