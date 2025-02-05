
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleField from './ParticleField';
import Navigation from '../Navigation';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on scroll
      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          yPercent: 50,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }

      // Reveal animation for content on scroll
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top center+=200",
            end: "+=300",
            toggleActions: "play none none none" // Changed from "play none none reverse"
          }
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen overflow-hidden">
      {/* Parallax background */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 bg-gradient-to-br from-[#1A365D] via-[#2A466D] to-[#1A365D] animate-gradient"
        style={{ transform: 'translateZ(-1px)' }} 
      />
      
      <Navigation />
      
      {/* Main content */}
      <div 
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center"
      >
        <motion.div
          className="space-y-4 md:space-y-8 max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <AnimatedText />

          {/* Supporting text with micro-interaction */}
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl hover:text-white transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.02 }}
          >
            Every day without action is a missed opportunity for change. 
            Join Rice students pioneering innovative solutions for sustainable development in Africa.
          </motion.p>

          {/* Enhanced CTA buttons with micro-interactions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button 
              onClick={() => {
                document.querySelector('#studios')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              className="group w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-[#FBB03B] text-[#1A365D] rounded-lg font-semibold 
                transition-all duration-300 text-sm md:text-base relative overflow-hidden hover:shadow-[0_0_20px_rgba(251,176,59,0.5)]"
              whileHover={{ 
                scale: 1.05,
                y: -2,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <span className="relative z-10">Join Our Mission</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[#FBB03B] via-[#FFD700] to-[#FBB03B]"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            
            <motion.button 
              onClick={() => {
                document.querySelector('#conference')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              className="group w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 border-2 border-white/20 text-white rounded-lg 
                font-semibold transition-all duration-300 text-sm md:text-base hover:border-[#FBB03B] relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                y: -2,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <span className="relative z-10">Learn More</span>
              <motion.div 
                className="absolute inset-0 bg-[#FBB03B]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0 }}
              />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
