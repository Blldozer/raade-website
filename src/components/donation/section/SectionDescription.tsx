
import React from "react";
import { motion } from "framer-motion";

/**
 * SectionDescription Component
 * 
 * Renders the description text for the donation section with animations
 * Uses a 39/61 split layout to align with the design
 */
const SectionDescription = () => {
  return (
    <div className="flex flex-col lg:flex-row mb-12">
      <div className="invisible w-full lg:w-[39%]"></div>
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.6, delay: 0.2 }} 
        className="w-full lg:w-[61%]"
      >
        <p className="text-lg font-lora p-4 lg:p-0 text-slate-950">
          Your donation helps us continue our work connecting African organizations with innovative solutions. 
          Every contribution directly supports our programs, enabling us to expand our impact across the continent.
        </p>
      </motion.div>
    </div>
  );
};

export default SectionDescription;
