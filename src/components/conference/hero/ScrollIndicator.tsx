
import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ScrollIndicator = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center"
      >
        <p className="text-white/80 text-sm mb-2 font-lora">Scroll to explore</p>
        <ChevronDown className="text-white/80 h-6 w-6" />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;
