
import React, { useRef } from "react";
import { motion } from "framer-motion";

const HeroBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Warm base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FEF7CD] via-[#FEC6A1] to-[#FDE1D3] z-0"></div>
      
      {/* Team image - full size with no parallax */}
      <div className="absolute inset-0 z-1">
        <div className="absolute inset-0 bg-[url('/raade-eboard-baker-institute-cmp.jpg')] bg-cover bg-center opacity-55 mix-blend-soft-light"></div>
      </div>
      
      {/* Subtle warm overlay for consistent coloring */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FBB03B]/15 to-[#FF8A6A]/15 z-2"></div>
      
      {/* Subtle grain texture overlay */}
      <div 
        className="absolute inset-0 z-3 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>
      
      {/* Very subtle vignette - lighter than before */}
      <motion.div 
        className="absolute inset-0 z-4 opacity-20 bg-gradient-to-t from-[#FBB03B]/30 via-transparent to-transparent"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Animated floating particles - in warm colors */}
      <div className="absolute inset-0 z-5 opacity-30">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(${251 + Math.random() * 5}, ${176 + Math.random() * 20}, ${59 + Math.random() * 50}, ${0.4 + Math.random() * 0.5})`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      {/* Africa outline pattern */}
      <div className="absolute right-0 bottom-0 lg:right-20 lg:bottom-20 opacity-15 w-[600px] h-[600px] z-6">
        <svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M355.5,6.9c-0.9,0.4-1.8,1.6-1.9,2.5c-0.1,0.9-0.9,2.3-1.7,3c-1.1,0.9-1.3,1.5-0.6,2.1c0.7,0.7,0.7,1.3,0,2.2
            c-1,1.3-0.4,4.3,1,5.2c0.4,0.3,0.4,1.1-0.1,2c-0.5,0.8-0.5,2.6-0.1,4.4c0.4,1.6,0.6,4.5,0.5,6.3..." fill="#FBB03B" />
        </svg>
      </div>
    </div>
  );
};

export default HeroBackground;
