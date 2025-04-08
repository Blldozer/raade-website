
import React from "react";
import { motion } from "framer-motion";
import { NavItem } from "../navConfig";

interface MobileMenuItemProps {
  item: NavItem;
  onNavigation: (href: string) => void;
}

/**
 * MobileMenuItem Component
 * 
 * Renders a standard menu item with:
 * - Smooth hover and tap animations
 * - Proper event handling for navigation
 * - Consistent styling with the rest of the mobile menu
 * - Ensures navigation to top of page for main items
 * 
 * @param item - Navigation item to display
 * @param onNavigation - Function to handle navigation
 */
const MobileMenuItem = ({ item, onNavigation }: MobileMenuItemProps) => {
  // Handle navigation with proper event handling
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling

    // Always use the onNavigation function from props
    // This will correctly handle scrolling and navigation
    onNavigation(href);
  };

  return (
    <motion.a
      href={item.href}
      className="block text-lg text-[#274675] hover:text-[#FBB03B] transition-colors font-alegreyasans font-bold py-2 px-3 rounded-md hover:bg-[#F4F5F4]/60"
      onClick={(e) => handleLinkClick(e, item.href)}
      whileHover={{ x: 5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      role="menuitem"
    >
      {item.name}
    </motion.a>
  );
};

export default MobileMenuItem;
