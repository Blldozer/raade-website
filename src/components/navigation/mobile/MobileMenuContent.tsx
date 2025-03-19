
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { NavItem } from "../navConfig";
import { motion, AnimatePresence } from "framer-motion";

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
 * - Smooth dropdown animations
 * - Interactive hover and click effects
 * - Clean dividers and visual organization
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

  // Handle navigation with proper event handling
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onNavigation(href);
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

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    show: { opacity: 1, height: "auto" }
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
          {navItems.map((item, index) => (
            <motion.li 
              key={item.name} 
              className="py-1"
              variants={itemVariants}
              transition={{ duration: 0.4 }}
            >
              {item.dropdownItems ? (
                <div>
                  <motion.button
                    onClick={(e) => toggleDropdown(item.name, e)}
                    className="flex items-center justify-between w-full text-lg text-[#274675] font-alegreyasans font-bold py-2 px-3 rounded-md hover:bg-[#F4F5F4]/60"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-expanded={openDropdowns.includes(item.name)}
                  >
                    <span>{item.name}</span>
                    <motion.div
                      animate={{ rotate: openDropdowns.includes(item.name) ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {openDropdowns.includes(item.name) ? (
                        <ChevronUp className="ml-2 text-[#FBB03B]" size={18} />
                      ) : (
                        <ChevronDown className="ml-2 text-[#FBB03B]" size={18} />
                      )}
                    </motion.div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {openDropdowns.includes(item.name) && (
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
              ) : (
                <motion.a
                  href={item.href}
                  className="block text-lg text-[#274675] hover:text-[#FBB03B] transition-colors font-alegreyasans font-bold py-2 px-3 rounded-md hover:bg-[#F4F5F4]/60"
                  onClick={(e) => handleLinkClick(e, item.href)}
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.name}
                </motion.a>
              )}
            </motion.li>
          ))}
          
          {/* Divider with animation */}
          <motion.li 
            className="relative py-2"
            variants={itemVariants}
          >
            <motion.div 
              className="border-t border-gray-200 w-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            ></motion.div>
          </motion.li>
          
          {/* Additional links */}
          {footerItems.map((item, index) => (
            <motion.li 
              key={item.name} 
              className="py-1"
              variants={itemVariants}
              transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
            >
              <motion.a
                href={item.href}
                className="block text-lg text-[#274675] hover:text-[#FBB03B] transition-colors font-alegreyasans font-bold py-2 px-3 rounded-md hover:bg-[#F4F5F4]/60"
                onClick={(e) => handleLinkClick(e, item.href)}
                whileHover={{ x: 5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.name}
              </motion.a>
            </motion.li>
          ))}
        </motion.ul>
      </nav>
    </motion.div>
  );
};

export default MobileMenuContent;
