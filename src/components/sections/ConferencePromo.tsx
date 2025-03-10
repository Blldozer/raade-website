
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import BackgroundEffects from './conference/BackgroundEffects';
import ConferenceInfo from './conference/ConferenceInfo';
import EnhancedCountdown from './conference/EnhancedCountdown';

const ConferencePromo = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    
    if (!section) return;
    
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
      section.querySelector('.promo-content'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <motion.div 
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient and animated shapes */}
      <BackgroundEffects />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-20 lg:py-24 w-full">
        <div className="promo-content grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
