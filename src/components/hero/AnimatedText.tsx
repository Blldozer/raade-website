import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const AnimatedText = () => {
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    if (text1Ref.current && text2Ref.current && lineRef.current) {
      // Set initial states
      gsap.set([text1Ref.current, text2Ref.current], {
        opacity: 1,
        text: ""
      });
      
      gsap.set(lineRef.current, { width: 0 });

      // Animation sequence
      tl.to(text1Ref.current, {
        duration: 1.2,
        text: "WE CAN'T WAIT FOR TOMORROW.",
        ease: "none"
      })
      .to(lineRef.current, {
        width: "100%",
        duration: 0.8,
        ease: "power2.inOut"
      })
      .to(text2Ref.current, {
        duration: 1.5,
        text: "WE'RE BUILDING IT TODAY.",
        ease: "none"
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* Organization name with sliding animation */}
      <motion.h1 
        className="text-[#FBB03B] text-xl md:text-2xl font-medium tracking-wide uppercase"
        initial={{ x: 0 }}  // Start from the left
        animate={{ x: "100%", opacity: [0, 1] }}  // Move to the right
        transition={{ 
          duration: 1.2,
          ease: "easeOut",
          times: [0, 1],
          opacity: { duration: 0.3 }
        }}
        style={{ transformOrigin: "left center" }}
      >
        Rice Association for African Development
      </motion.h1>

      {/* Main text animation */}
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-wide">
        <div ref={text1Ref}></div>
        <div className="relative inline-block">
          <div ref={text2Ref} className="text-[#FBB03B]"></div>
          <div 
            ref={lineRef}
            className="absolute -bottom-2 left-0 h-1 bg-[#FBB03B]"
          />
        </div>
      </h2>
    </div>
  );
};

export default AnimatedText;