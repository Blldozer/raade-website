import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

const Hero = () => {
  const backgroundRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    // Subtle background animation
    gsap.to(backgroundRef.current, {
      backgroundPosition: '100% 100%',
      duration: 20,
      repeat: -1,
      ease: "none",
      yoyo: true
    });

    // Text animation sequence
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    
    tl.to(lineRef.current, {
      width: "100%",
      duration: 1.5,
      ease: "power2.inOut"
    });

    tl.to(textRef.current, {
      opacity: 1,
      duration: 1,
      y: 0,
      stagger: 0.2,
      ease: "power2.out"
    });
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dynamic Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-[#1A365D] via-[#2A466D] to-[#1A365D] bg-[length:200%_200%]"
        style={{ backgroundSize: '400% 400%' }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
        {/* Main Message */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white opacity-0 transform translate-y-4"
              ref={textRef}>
            We can't wait for tomorrow.
            <br />
            <span className="text-[#FBB03B]">We're building it today.</span>
          </h1>
          
          {/* Animated Line */}
          <div 
            ref={lineRef}
            className="w-0 h-1 bg-[#FBB03B]"
          />
          
          {/* Supporting Text */}
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl">
            Every day without action is a missed opportunity for change. 
            Join Rice students pioneering innovative solutions for sustainable development in Africa.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <button 
              onClick={() => window.location.href = "#studios"}
              className="px-8 py-4 bg-[#FBB03B] text-[#1A365D] rounded-lg font-semibold 
                hover:bg-[#FBB03B]/90 transition-transform hover:scale-105">
              Join Our Mission
            </button>
            <button 
              onClick={() => window.location.href = "#conference"}
              className="px-8 py-4 border border-white/20 text-white rounded-lg font-semibold 
                hover:bg-white/10 transition-transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#FBB03B]/20 rounded-full"
              animate={{
                x: ["0%", "100%"],
                y: ["0%", "100%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;