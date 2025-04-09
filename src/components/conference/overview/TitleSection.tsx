
import React from "react";
import { motion } from "framer-motion";
import AnimatedPath from "./AnimatedPath";

const TitleSection = () => {
  return (
    <div className="flex flex-col lg:flex-row mb-12">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-[39%]"
      >
        <h2 className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.15] font-simula text-black">
          Africa's path to the <span className="font-simula-italic">future</span>
        </h2>
      </motion.div>
      
      {/* Creative element in the filler div - enhanced with curved path */}
      <motion.div 
        className="lg:w-[61%] hidden lg:flex items-center justify-center" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <AnimatedPath />
      </motion.div>
    </div>
  );
};

export default TitleSection;
