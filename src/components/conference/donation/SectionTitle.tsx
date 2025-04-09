
import React from "react";
import { motion } from "framer-motion";

/**
 * SectionTitle Component
 * 
 * Displays the main section title and subtitle for the donation section:
 * - Uses the 39%/61% layout split for title and subtitle
 * - Includes animation effects for enhanced visual engagement
 * - Maintains consistent styling with other main section titles
 */
const SectionTitle: React.FC = () => {
  return (
    <>
      {/* First row: Title on left (39%), empty space on right (61%) */}
      <div className="flex flex-col lg:flex-row mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-[39%] mb-6 lg:mb-0"
        >
          <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-black">
            Support Our Mission
          </h2>
        </motion.div>
        
        {/* Empty right spacer - 61% */}
        <motion.div 
          className="lg:w-[61%]" 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Intentionally empty for layout */}
        </motion.div>
      </div>

      {/* Second row: Empty space on left (39%), paragraph on right (61%) */}
      <div className="flex flex-col lg:flex-row mb-16">
        <div className="lg:w-[39%]"></div> {/* Spacer div */}
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:w-[61%] mt-8 lg:mt-0"
        >
          <p className="text-xl font-lora text-black leading-relaxed max-w-[800px]">
            Your support directly fuels innovation and impact across Africa. 
            Every donation helps us connect more students with African organizations to create 
            scalable solutions for pressing challenges.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default SectionTitle;
