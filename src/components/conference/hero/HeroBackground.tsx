
import React from "react";

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient layer with the requested color */}
      <div className="absolute inset-0 bg-[#FDE1D3] z-0"></div>
      
      {/* Team image with static positioning - no parallax */}
      <div className="absolute inset-0 z-1">
        <div className="absolute inset-0 bg-[url('/raade-eboard-baker-institute-cmp.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
      </div>
      
      {/* Grain texture overlay */}
      <div 
        className="absolute inset-0 z-2 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>
      
      {/* Gradient overlay for better text contrast */}
      <div 
        className="absolute inset-0 z-3 opacity-70 bg-gradient-to-t from-black/70 via-transparent to-transparent"
      />
      
      {/* Static floating particles - no animation */}
      <div className="absolute inset-0 z-4 opacity-30">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.4 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>
      
      {/* Africa outline pattern */}
      <div className="absolute right-0 bottom-0 lg:right-20 lg:bottom-20 opacity-10 w-[600px] h-[600px] z-5">
        <svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M355.5,6.9c-0.9,0.4-1.8,1.6-1.9,2.5c-0.1,0.9-0.9,2.3-1.7,3c-1.1,0.9-1.3,1.5-0.6,2.1c0.7,0.7,0.7,1.3,0,2.2
            c-1,1.3-0.4,4.3,1,5.2c0.4,0.3,0.4,1.1-0.1,2c-0.5,0.8-0.5,2.6-0.1,4.4c0.4,1.6,0.6,4.5,0.5,6.3..." fill="white" />
        </svg>
      </div>
    </div>
  );
};

export default HeroBackground;
