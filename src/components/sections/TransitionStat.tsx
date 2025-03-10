
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const TransitionStat = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    
    if (!section || !content) return;
    
    // Animation for the content - slides in from bottom
    gsap.fromTo(content,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        scrollTrigger: {
          trigger: content,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === content || t.vars.trigger === section) {
          t.kill();
        }
      });
    };
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('future-showcase');
    if (nextSection) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: nextSection,
          offsetY: 0
        },
        ease: "power2.inOut"
      });
    }
  };

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center py-10 bg-white relative overflow-hidden"
    >
      {/* Card styling for the transition effect */}
      <div className="absolute inset-0 bg-white rounded-2xl shadow-lg transform transition-all duration-500"></div>
      
      {/* Background gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#F5F5F0]/50 pointer-events-none rounded-2xl"></div>
      
      {/* Main content */}
      <div 
        ref={contentRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="text-4xl md:text-7xl lg:text-8xl font-bold text-[#1A365D] mb-8 font-Montserrat rounded-3xl">
            By 2050, <span className="text-raade-gold-start"><CountUp end={25} duration={2.5} />%</span> of people
            <br />will be African.
          </div>
          <p className="text-xl md:text-3xl text-[#1A365D]/80 max-w-3xl mx-auto font-merriweather">
            The systems we build today will shape their tomorrow.
          </p>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -right-20 top-20 w-80 h-80 rounded-full bg-raade-gold-start/5 blur-3xl pointer-events-none"></div>
      <div className="absolute -left-20 bottom-20 w-80 h-80 rounded-full bg-[#1A365D]/5 blur-3xl pointer-events-none"></div>
      
      {/* Bottom navigation */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center absolute bottom-10 z-10"
      >
        <p className="text-lg text-[#1A365D]/60 font-merriweather mb-6">
          Here's what we are building...
        </p>
        <motion.button 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          onClick={scrollToNextSection} 
          className="cursor-pointer p-4 group" 
          aria-label="Scroll to next section"
        >
          <div className="w-6 h-6 mx-auto border-b-2 border-r-2 border-[#1A365D]/30 rotate-45 transition-all duration-300 group-hover:border-[#1A365D] group-hover:scale-110" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default TransitionStat;
