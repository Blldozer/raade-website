
import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ScrollIndicator = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };
  
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: 1.5
      }}
      onClick={scrollToContent}
    >
      <div className="flex flex-col items-center">
        <p className="text-raade-navy mb-2 text-sm font-medium">Scroll Down</p>
        <motion.div
          animate={{ 
            y: [0, 8, 0],
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ChevronDown className="w-6 h-6 text-raade-navy" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ScrollIndicator;
