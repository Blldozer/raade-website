
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const AnimatedText = () => {
  const text2Ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const orgNameRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const lineWidth = useTransform(scrollY, [0, 200], ["0%", "100%"]);
  const lineOpacity = useTransform(scrollY, [0, 200], [0, 1]);

  useEffect(() => {
    const tl = gsap.timeline();
    
    if (text2Ref.current && orgNameRef.current) {
      gsap.set(text2Ref.current, {
        opacity: 1,
        text: ""
      });
      
      gsap.set(orgNameRef.current, { opacity: 1 });

      tl.to(text2Ref.current, {
        duration: 3,
        text: "We're building it today.",
        ease: "none"
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
    <div className="space-y-4 md:space-y-8" ref={containerRef}>
      <h1 
        ref={orgNameRef}
        className="text-raade-gold-start text-fluid-org-name font-medium tracking-wide uppercase font-alegreyasans"
      >
        Rice Association for African Development
      </h1>

      <div className="relative">
        <h2 className="text-fluid-hero font-bold tracking-wide font-zillahighlight">
          <div className="text-white">We can't wait for tomorrow.</div>
          <div ref={text2Ref} className="text-raade-gold-start"></div>
        </h2>
        
        <motion.div 
          style={{ 
            width: lineWidth,
            opacity: lineOpacity
          }}
          className="absolute -bottom-4 left-0 h-1 bg-raade-gold-start"
        />
      </div>
    </div>
  );
};

export default AnimatedText;
