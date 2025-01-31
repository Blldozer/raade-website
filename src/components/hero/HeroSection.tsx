import React from "react";
import AnimatedHeadline from "./AnimatedHeadline";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-raade-orange via-[#FFA726] to-[#FF8A6A] transition-all duration-1000 ease-in-out"
        aria-hidden="true"
      />
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedHeadline />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;