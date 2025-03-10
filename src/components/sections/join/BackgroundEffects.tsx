
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const BackgroundEffects = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;
    
    // Listen for the transition event from TransitionHook
    const transitionHandler = () => {
      // Enhance the background blur effect during transition
      gsap.fromTo(bg, 
        { filter: 'blur(30px)' },
        { filter: 'blur(0px)', duration: 1.2, ease: "power2.out" }
      );
    };
    
    document.addEventListener('transitionToJoin', transitionHandler);
    
    return () => {
      document.removeEventListener('transitionToJoin', transitionHandler);
    };
  }, []);
  
  return (
    <div ref={bgRef}>
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
      
      {/* Additional decorative elements that appear during transition */}
      <motion.div 
        className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-[#FBB03B]/5 blur-xl"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.6, 0],
          y: [0, -30, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-[#274675]/5 blur-xl"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.5, 0],
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
};

export default BackgroundEffects;
