
import React from 'react';
import { motion } from 'framer-motion';

const BackgroundEffects = () => {
  return (
    <>
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-[#f4f5f4]/80 -z-10" />
      
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white to-transparent -z-10" />
      <motion.div 
        className="absolute -top-48 -right-48 w-96 h-96 rounded-full bg-[#FBB03B]/10 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full bg-[#274675]/10 blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
    </>
  );
};

export default BackgroundEffects;
