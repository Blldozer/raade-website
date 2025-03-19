
import React from "react";

/**
 * MobileMenuBackground Component
 * 
 * Renders a visually appealing background for the mobile menu with:
 * - Subtle gradient from light to lighter color
 * - Dot pattern overlay for visual interest
 * - Proper z-indexing to stay behind menu content
 */
const MobileMenuBackground = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#F5F5F0] to-[#EAEAE5] z-0">
      <div 
        className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: `radial-gradient(#274675 0.5px, transparent 0.5px)`,
          backgroundSize: '15px 15px' 
        }}
      ></div>
    </div>
  );
};

export default MobileMenuBackground;
