
import React, { useState } from "react";
import { NavItem } from "../navConfig";
import { motion } from "framer-motion";
import MobileMenuItem from "./MobileMenuItem";
import MobileDropdownItem from "./MobileDropdownItem";
import MobileMenuDivider from "./MobileMenuDivider";

interface MobileMenuContentProps {
  navItems: NavItem[];
  footerItems: NavItem[];
  onNavigation: (href: string) => void;
}

/**
 * MobileMenuContent Component
 * 
 * Renders the main navigation content of the mobile menu with:
 * - Staggered entrance animations for menu items
 * - State management for dropdowns
 * - Clean organization of primary and secondary navigation items
 * 
 * @param navItems - Main navigation items to display
 * @param footerItems - Secondary navigation items to display at the bottom
 * @param onNavigation - Function to handle navigation with proper routing
 */
const MobileMenuContent = ({ 
  navItems, 
  footerItems,
  onNavigation 
}: MobileMenuContentProps) => {
  // Track which dropdowns are open
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  // Toggle dropdown visibility
  const toggleDropdown = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setOpenDropdowns(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name) 
        : [...prev, name]
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="flex-grow overflow-y-auto px-5 py-2 bg-gradient-to-b from-[#F5F5F0] to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <nav>
        <motion.ul 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Primary Navigation Items */}
          {navItems.map((item) => (
            <motion.li 
              key={item.name} 
              className="py-1"
              variants={itemVariants}
              transition={{ duration: 0.4 }}
            >
              {item.dropdownItems ? (
                <MobileDropdownItem
                  item={item}
                  isOpen={openDropdowns.includes(item.name)}
                  onToggle={toggleDropdown}
                  onNavigation={onNavigation}
                />
              ) : (
                <MobileMenuItem 
                  item={item} 
                  onNavigation={onNavigation} 
                />
              )}
            </motion.li>
          ))}
          
          {/* Divider between primary and secondary navigation */}
          <motion.li variants={itemVariants}>
            <MobileMenuDivider />
          </motion.li>
          
          {/* Secondary/Footer Navigation Items */}
          {footerItems.map((item, index) => (
            <motion.li 
              key={item.name} 
              className="py-1"
              variants={itemVariants}
              transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
            >
              <MobileMenuItem 
                item={item} 
                onNavigation={onNavigation} 
              />
            </motion.li>
          ))}
        </motion.ul>
      </nav>
    </motion.div>
  );
};

export default MobileMenuContent;
