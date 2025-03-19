
import React from "react";
import { motion } from "framer-motion";
import NoiseTexture from "@/components/ui/NoiseTexture";

/**
 * MobileMenuBackground Component
 * 
 * Renders a visually appealing background for the mobile menu with:
 * - Navy blue background matching footer and desktop nav
 * - Dot pattern overlay for visual interest
 * - Enhanced with subtle noise texture for depth and richness
 * - Proper z-indexing to stay behind menu content
 * - Gentle animation to enhance the mobile experience
 */
const MobileMenuBackground = () => {
  return (
    <motion.div 
      className="absolute inset-0 bg-[#274675] z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Subtle noise texture overlay */}
      <NoiseTexture opacity={0.05} blendMode="multiply" />
      
      <motion.div 
        className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: `radial-gradient(#FFFFFF 0.5px, transparent 0.5px)`,
          backgroundSize: '15px 15px' 
        }}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 0.7 }}
      />
    </motion.div>
  );
};

export default MobileMenuBackground;
