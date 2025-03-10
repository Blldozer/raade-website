
import React from 'react';
import { motion } from 'framer-motion';

const BackgroundEffects = () => {
  // Gradient background animation
  const gradientVariants = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 15,
        ease: "linear",
        repeat: Infinity
      }
    }
  };

  return (
    <>
      {/* Base image layer */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/raade-eboard-sally-port-cmp.jpg')] bg-cover bg-center opacity-25 mix-blend-multiply"></div>
      </div>
      
      {/* Gradient overlay with animation - Restored to original orange/gold gradient */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        variants={gradientVariants}
        animate="animate"
        style={{
          background: "linear-gradient(135deg, #FBB03B 0%, #FF9848 25%, #FF8A6A 50%, #FF9848 75%, #FBB03B 100%)",
          backgroundSize: "200% 200%",
          opacity: 0.80,
          mixBlendMode: "overlay"
        }}
      />
      
      {/* Abstract shapes in background - Updated to warm color palette */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          {/* Animated shapes - Colors updated to match RAADE brand */}
          <motion.div 
            className="absolute top-[-5%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-[#FBB03B] to-[#FF8A6A] blur-[100px]"
            animate={{ 
              x: [0, 20, 0], 
              y: [0, -20, 0],
              scale: [1, 1.1, 1] 
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute bottom-[-15%] right-[-5%] w-[35%] h-[50%] rounded-full bg-gradient-to-r from-[#FF9848] to-[#FF8A6A] blur-[100px]"
            animate={{ 
              x: [0, -20, 0], 
              y: [0, 20, 0],
              scale: [1, 1.2, 1] 
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2 
            }}
          />
        </div>
      </div>
      
      {/* Grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>
    </>
  );
};

export default BackgroundEffects;
