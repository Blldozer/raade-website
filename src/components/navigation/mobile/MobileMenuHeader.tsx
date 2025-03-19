import React from "react";
import { X, Search } from "lucide-react";
import { motion } from "framer-motion";
import NavLogo from "../NavLogo";

interface MobileMenuHeaderProps {
  onClose: (e?: React.MouseEvent) => void;
}

/**
 * MobileMenuHeader Component
 * 
 * Renders the header section of the mobile menu with:
 * - Logo with entrance animation
 * - Search button with hover effects
 * - Close button with hover and animation effects
 * - Sticky positioning to remain visible regardless of scroll
 * 
 * @param onClose - Function to close the menu with event handling
 */
const MobileMenuHeader = ({ onClose }: MobileMenuHeaderProps) => {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose(e);
  };

  return (
    <motion.div 
      className="sticky top-0 flex justify-between items-center p-5 border-b border-gray-200 bg-white z-20 shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <NavLogo 
          forceDarkMode={true} 
          useShortForm={true}
          forceSize="h-8"
        />
      </motion.div>
      
      <div className="flex items-center gap-4">
        <motion.button 
          className="p-2 text-[#274675] hover:bg-gray-100 hover:text-raade-navy rounded-full transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Search"
        >
          <Search size={22} />
        </motion.button>
        
        <motion.button
          onClick={handleClose}
          className="p-2 text-[#274675] hover:bg-gray-100 hover:text-raade-navy rounded-full transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotate: [0, 10, 0] }}
          transition={{ 
            opacity: { duration: 0.3, delay: 0.2 },
            rotate: { duration: 0.5, delay: 0.2 }
          }}
          aria-label="Close menu"
        >
          <X size={24} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MobileMenuHeader;
