
import React from "react";
import { motion } from "framer-motion";

/**
 * SectionTitle Component
 * 
 * Renders the main title of the donation section with animations
 * Uses a 39/61 split layout for visual interest
 */
const SectionTitle = () => {
  return (
    <div className="flex flex-col lg:flex-row mb-8">
      <motion.div 
        initial={{ opacity: 0, x: -20 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.6 }} 
        className="w-full lg:w-[39%]"
      >
        <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-black">
          Support <span className="text-[#FBB03B]">Our Mission</span>
        </h2>
      </motion.div>
      
      <div className="invisible w-full lg:w-[61%]"></div>
    </div>
  );
};

export default SectionTitle;
