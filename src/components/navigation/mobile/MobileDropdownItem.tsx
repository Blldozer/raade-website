
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavItem } from "../navConfig";

interface MobileDropdownItemProps {
  item: NavItem;
  isOpen: boolean;
  onToggle: (name: string, e: React.MouseEvent) => void;
  onNavigation: (href: string) => void;
}

/**
 * MobileDropdownItem Component
 * 
 * Renders a dropdown menu item with:
 * - Animated expand/collapse transitions
 * - Proper chevron rotation indicators
 * - Smooth animation for child items
 * - Interactive hover and tap effects
 * 
 * @param item - Navigation item with dropdown children
 * @param isOpen - Whether this dropdown is currently open
 * @param onToggle - Function to toggle dropdown state
 * @param onNavigation - Function to handle navigation
 */
const MobileDropdownItem = ({ 
  item, 
  isOpen, 
  onToggle, 
  onNavigation 
}: MobileDropdownItemProps) => {
  // Handle navigation with proper event handling
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    onNavigation(href);
  };

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    show: { opacity: 1, height: "auto" }
  };

  return (
    <div>
      <motion.button
        onClick={(e) => onToggle(item.name, e)}
        className="flex items-center justify-between w-full text-lg text-[#274675] font-alegreyasans font-bold py-2 px-3 rounded-md hover:bg-[#F4F5F4]/60"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-expanded={isOpen}
      >
        <span>{item.name}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <ChevronUp className="ml-2 text-[#FBB03B]" size={18} />
          ) : (
            <ChevronDown className="ml-2 text-[#FBB03B]" size={18} />
          )}
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && item.dropdownItems && (
          <motion.ul 
            className="mt-2 ml-4 space-y-3 border-l-2 border-[#F4F5F4] pl-4"
            variants={dropdownVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {item.dropdownItems.map((subItem) => (
              <motion.li 
                key={subItem.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.a
                  href={subItem.href}
                  className="block text-base text-[#3C403A] hover:text-[#FBB03B] transition-colors font-alegreyasans py-1 px-2 rounded"
                  onClick={(e) => handleLinkClick(e, subItem.href)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {subItem.name}
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileDropdownItem;
