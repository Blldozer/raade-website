
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import BackgroundEffects from './conference/BackgroundEffects';
import ConferenceInfo from './conference/ConferenceInfo';
import EnhancedCountdown from './conference/EnhancedCountdown';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ConferencePromo = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    
    if (!section || !content) return;
    
    // Main content animation on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play none none reverse"
      }
    });
    
    tl.fromTo(
      content,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
    
    // Zoom out animation when scrolling away
    const zoomOutTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "center center",
        end: "bottom top",
        scrub: true,
      }
    });
    
    zoomOutTl.to(section, {
      scale: 0.85,
      opacity: 0.8,
      duration: 1,
      ease: "power1.in"
    });
    
    return () => {
      // Clean up
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <motion.div 
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient and animated shapes */}
      <BackgroundEffects />
      
      <div 
        ref={contentRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-20 lg:py-24 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side: Conference Info */}
          <ConferenceInfo />
          
          {/* Right side: Countdown */}
          <EnhancedCountdown />
        </div>
      </div>
    </motion.div>
  );
};

export default ConferencePromo;
