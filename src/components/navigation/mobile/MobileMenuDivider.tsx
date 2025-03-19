
import React from "react";
import { motion } from "framer-motion";

/**
 * MobileMenuDivider Component
 * 
 * Renders an animated divider line between menu sections with:
 * - Smooth entrance animation
 * - Proper styling consistent with the mobile menu design
 */
const MobileMenuDivider = () => {
  return (
    <motion.div 
      className="relative py-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div 
        className="border-t border-gray-200 w-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      ></motion.div>
    </motion.div>
  );
};

export default MobileMenuDivider;
