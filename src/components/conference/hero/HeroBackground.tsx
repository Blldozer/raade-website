
import React, { memo } from "react";

/**
 * HeroBackground Component
 * 
 * Creates the layered visual background for the conference hero section:
 * - Base gradient using RAADE's gold/orange brand colors with increased opacity
 * - Team image with reduced opacity and multiply blend for better text contrast
 * - Subtle grain texture for visual depth
 * - Gradient overlay for improved readability
 * - Decorative particles and African continent outline
 */
const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient layer using RAADE brand colors - increased opacity for better visibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FBB03B]/80 via-[#FF9848]/80 to-[#FF8A6A]/80 z-0"></div>
      
      {/* Team image with optimized opacity for better gradient visibility */}
      <div className="absolute inset-0 z-1">
        <div 
          className="absolute inset-0 bg-[url('/raade-eboard-baker-institute-cmp.jpg')] bg-cover bg-center opacity-50 mix-blend-multiply"
          style={{ willChange: "transform" }}
        ></div>
      </div>
      
      {/* Grain texture overlay - static, reduced opacity */}
      <div 
        className="absolute inset-0 z-2 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>
      
      {/* Gradient overlay for better text contrast - increased opacity */}
      <div 
        className="absolute inset-0 z-3 opacity-50 bg-gradient-to-t from-black/70 via-transparent to-transparent"
      />
      
      {/* Static floating particles - reduced number from 30 to 15 */}
      <div className="absolute inset-0 z-4 opacity-30">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.4 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>
      
      {/* Africa outline pattern - simplified with reduced opacity */}
      <div className="absolute right-0 bottom-0 lg:right-20 lg:bottom-20 opacity-5 w-[600px] h-[600px] z-5">
        <svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M355.5,6.9c-0.9,0.4-1.8,1.6-1.9,2.5c-0.1,0.9-0.9,2.3-1.7,3c-1.1,0.9-1.3,1.5-0.6,2.1c0.7,0.7,0.7,1.3,0,2.2
            c-1,1.3-0.4,4.3,1,5.2c0.4,0.3,0.4,1.1-0.1,2c-0.5,0.8-0.5,2.6-0.1,4.4c0.4,1.6,0.6,4.5,0.5,6.3..." fill="white" />
        </svg>
      </div>
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(HeroBackground);
