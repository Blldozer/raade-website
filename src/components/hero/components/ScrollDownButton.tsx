
import React from 'react';
import { motion } from 'framer-motion';

interface ScrollDownButtonProps {
  onClick: () => void;
}

const ScrollDownButton = ({ onClick }: ScrollDownButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="absolute bottom-[clamp(2rem,4vw,3rem)] left-1/2 transform -translate-x-1/2 text-center z-50"
    >
      <motion.button
        animate={{ y: [0, 10, 0] }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        onClick={onClick}
        className="cursor-pointer p-4 group"
        aria-label="Scroll to next section"
      >
        <div className="w-[clamp(1.25rem,2vw,1.5rem)] h-[clamp(1.25rem,2vw,1.5rem)] mx-auto border-b-2 border-r-2 border-white/30 rotate-45 transition-all duration-300 group-hover:border-white group-hover:scale-110" />
      </motion.button>
    </motion.div>
  );
};

export default ScrollDownButton;
