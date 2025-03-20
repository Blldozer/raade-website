
import React from 'react';

/**
 * GradientOverlay Component
 * 
 * Provides a semi-transparent gradient overlay for the hero section
 * with increased opacity and contrast for better visibility
 * 
 * Uses a deeper blue to navy gradient with higher opacity values
 * and subtle backdrop blur for depth without compromising video quality
 */
const GradientOverlay = () => {
  return (
    <div 
      className="absolute inset-0 z-10 bg-gradient-to-br from-[#1A365D]/75 via-[#274675]/70 to-[#1A365D]/80 backdrop-blur-[5px]"
      aria-hidden="true"
    />
  );
};

export default GradientOverlay;
