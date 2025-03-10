
import React from "react";
import { motion } from "framer-motion";

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#FBB03B] via-[#FF9848] to-[#FF8A6A] z-0">
      {/* Africa outline pattern */}
      <div className="absolute right-0 bottom-0 lg:right-20 lg:bottom-20 opacity-10 w-[600px] h-[600px]">
        <svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M355.5,6.9c-0.9,0.4-1.8,1.6-1.9,2.5c-0.1,0.9-0.9,2.3-1.7,3c-1.1,0.9-1.3,1.5-0.6,2.1c0.7,0.7,0.7,1.3,0,2.2
            c-1,1.3-0.4,4.3,1,5.2c0.4,0.3,0.4,1.1-0.1,2c-0.5,0.8-0.5,2.6-0.1,4.4c0.4,1.6,0.6,4.5,0.5,6.3..." fill="white" />
        </svg>
      </div>
    </div>
  );
};

export default HeroBackground;
