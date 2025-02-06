
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const AnimatedText = () => {
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const orgNameRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    if (text1Ref.current && text2Ref.current && lineRef.current && orgNameRef.current && cursorRef.current) {
      // Set initial states
      gsap.set([text1Ref.current, text2Ref.current], {
        opacity: 1,
        text: ""
      });
      
      gsap.set(lineRef.current, { width: 0 });
      gsap.set(orgNameRef.current, { opacity: 1 });
      gsap.set(cursorRef.current, { 
        opacity: 1,
        left: 0
      });

      // Animation sequence with more natural typing speed
      tl.to(text1Ref.current, {
        duration: 2.5, // Slower typing speed
        text: "WE CAN'T WAIT FOR TOMORROW.",
        ease: "none"
      })
      .to(lineRef.current, {
        width: "100%",
        duration: 0.8,
        ease: "power2.inOut"
      })
      .to(text2Ref.current, {
        duration: 3, // Slower typing speed
        text: "WE'RE BUILDING IT TODAY.",
        ease: "none",
        onUpdate: () => {
          // Update cursor position based on text width
          if (text2Ref.current && cursorRef.current) {
            const text = text2Ref.current.textContent || "";
            const tempSpan = document.createElement('span');
            tempSpan.style.visibility = 'hidden';
            tempSpan.style.position = 'absolute';
            tempSpan.style.fontSize = window.getComputedStyle(text2Ref.current).fontSize;
            tempSpan.style.fontFamily = window.getComputedStyle(text2Ref.current).fontFamily;
            tempSpan.textContent = text;
            document.body.appendChild(tempSpan);
            const width = tempSpan.offsetWidth;
            document.body.removeChild(tempSpan);
            cursorRef.current.style.left = `${width}px`;
          }
        }
      })
      .to(cursorRef.current, {
        opacity: 0,
        duration: 0.3
      })
      .to(orgNameRef.current, {
        keyframes: [
          { x: -2, duration: 0.1 },
          { x: 2, duration: 0.1 },
          { x: -2, duration: 0.1 },
          { x: 2, duration: 0.1 },
          { x: 0, duration: 0.1 }
        ],
        ease: "none"
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="space-y-4 md:space-y-8">
      {/* Organization name with shake animation */}
      <h1 
        ref={orgNameRef}
        className="text-[#FBB03B] text-base sm:text-lg md:text-2xl font-medium tracking-wide uppercase"
      >
        Rice Association for African Development
      </h1>

      {/* Main text animation */}
      <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-wide">
        <div ref={text1Ref}></div>
        <div className="relative inline-block">
          <div ref={text2Ref} className="text-[#FBB03B]"></div>
          <div 
            ref={cursorRef}
            className="absolute top-0 w-[3px] h-full bg-[#FBB03B] transition-all duration-75"
          />
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
