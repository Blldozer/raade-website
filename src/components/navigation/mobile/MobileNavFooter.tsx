
import React from "react";
import { motion } from "framer-motion";
import { useNavigation } from "@/hooks/navigation/useNavigation";

interface MobileNavFooterProps {
  onLinkClick: () => void;
}

/**
 * MobileNavFooter Component
 * 
 * Renders the footer section of the mobile menu with:
 * - Gold CTA button with hover effects (maintaining gold color)
 * - Fade-in animations for smooth appearance
 * - Responsive padding for better touch targets
 * - Proper event handling for navigation
 * 
 * @param onLinkClick - Function to call when a link is clicked
 */
const MobileNavFooter = ({ onLinkClick }: MobileNavFooterProps) => {
  const { handleNavigation } = useNavigation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onLinkClick();
    handleNavigation(href);
  };

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* Main CTA Button explicitly linking to build-with-us section */}
      <motion.div 
        className="p-5"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.a
          href="/#build-with-us"
          className="block w-full py-3.5 px-6 bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-[#274675] text-center rounded-md font-alegreyasans font-bold text-lg transition-colors shadow-md hover:shadow-lg"
          onClick={(e) => handleClick(e, "/#build-with-us")}
          whileHover={{ y: -2 }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          Join Us
        </motion.a>
      </motion.div>
      
      {/* Copyright or other info */}
      <motion.div 
        className="border-t border-white/10 p-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <p className="text-sm text-white/80 font-alegreyasans">
          &copy; {new Date().getFullYear()} RAADE. All rights reserved.
        </p>
        <p className="text-xs text-white/60 mt-1 font-alegreyasans">
          Rice Association for African Development
        </p>
      </motion.div>
    </motion.div>
  );
};

export default MobileNavFooter;
