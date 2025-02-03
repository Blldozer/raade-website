import React, { useEffect, useRef } from "react";
import AnimatedHeadline from "./AnimatedHeadline";
import LineAnimation from "./LineAnimation";
import { gsap } from "gsap";

const HeroSection = () => {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      delay: 0.2,
    });

    // Set initial gradient state
    gsap.set(gradientRef.current, {
      background: "linear-gradient(45deg, #1A365D, #0A1829)",
      opacity: 1
    });

    // Animate to final gradient state
    tl.to(gradientRef.current, {
      background: "linear-gradient(to bottom right, #1A365D, #FBB03B)",
      duration: 1.5,
      ease: "power2.inOut"
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="relative h-screen w-screen flex items-center justify-center overflow-hidden">
      {/* Line Animation */}
      <LineAnimation />
      
      {/* Gradient Background Layer */}
      <div
        ref={gradientRef}
        className="absolute inset-0 opacity-80"
        style={{
          background: "linear-gradient(45deg, #1A365D, #0A1829)",
        }}
        aria-hidden="true"
      />
      
      {/* Optional Overlay for Additional Color Control */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-raade-orange/10 to-transparent mix-blend-overlay"
        aria-hidden="true"
      />
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center h-full">
          <div className="w-full lg:w-3/4">
            <AnimatedHeadline />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;