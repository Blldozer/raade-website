import React, { useEffect, useRef } from "react";
import AnimatedHeadline from "./AnimatedHeadline";
import LineAnimation from "./LineAnimation";
import { gsap } from "gsap";

const HeroSection = () => {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      delay: 0.5,
    });

    // Animate to the original gradient
    tl.to(gradientRef.current, {
      backgroundImage: "linear-gradient(to bottom right, rgba(26, 54, 93, 0.8), rgba(251, 176, 59, 0.8))",
      duration: 1.5,
      ease: "power2.inOut"
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Line Animation */}
      <LineAnimation />
      
      {/* Gradient Background with original gradient as base */}
      <div
        ref={gradientRef}
        className="absolute inset-0 bg-gradient-to-br from-raade-orange via-[#FFA726] to-[#FF8A6A] opacity-50"
        aria-hidden="true"
      />
      
      {/* Content Container */}
      <div className="relative z-10 w-full h-full grid grid-rows-[1fr_auto_1fr] py-8">
        <div className="row-start-2 w-full px-4 sm:px-6 md:px-8">
          <div className="container mx-auto">
            <div className="w-full md:w-2/3 max-w-3xl">
              <AnimatedHeadline />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;