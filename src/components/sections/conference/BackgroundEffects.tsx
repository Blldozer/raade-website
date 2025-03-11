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
        <div className="absolute inset-0 bg-[url('/raade-eboard-sally-port-cmp.jpg')] bg-cover bg-center opacity-35 mix-blend-color-burn"></div>
      </div>
      
      {/* Gradient overlay with animation */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        variants={gradientVariants}
        animate="animate"
        style={{
          background: "linear-gradient(135deg, #1A2E5C 0%, #2D3A8C 25%, #6C2BD9 50%, #2D3A8C 75%, #1A2E5C 100%)",
          backgroundSize: "200% 200%",
          opacity: 0.75,
          mixBlendMode: "multiply"
        }}
      />
      
      {/* Line pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.05] mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.6' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px"
        }}
      ></div>
      
      {/* Abstract shapes in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-50">
          {/* Animated shapes */}
          <motion.div 
            className="absolute top-[-5%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-[#FF9F43] to-[#FF8A6A] blur-[60px]"
            animate={{ 
              x: [0, 20, 0], 
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
              opacity: [0.7, 0.9, 0.7]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute bottom-[-15%] right-[-5%] w-[35%] h-[50%] rounded-full bg-gradient-to-r from-[#38B2AC] to-[#3730A3] blur-[60px]"
            animate={{ 
              x: [0, -20, 0], 
              y: [0, 20, 0],
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.8, 0.6]  
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2 
            }}
          />
          
          {/* New third shape for added depth */}
          <motion.div 
            className="absolute top-[40%] right-[20%] w-[25%] h-[25%] rounded-full bg-gradient-to-r from-[#6C2BD9] to-[#A78BFA] blur-[50px]"
            animate={{ 
              x: [0, 10, 0], 
              y: [0, -15, 0],
              scale: [1, 1.15, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
      </div>
      
      {/* Grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>
    </>
  );
};

export default BackgroundEffects;
