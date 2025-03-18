
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { ArrowDown } from 'lucide-react';
import { registerGsapPlugins } from '@/utils/gsapUtils';

// Register GSAP plugins centrally
registerGsapPlugins();

/**
 * TransitionStat Component
 * 
 * A section displaying a compelling statistic about Africa's population growth
 * Uses CountUp for animated number display and implements lazy-loading friendly initialization
 */
const TransitionStat = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Initialize component first, mark as mounted
  useEffect(() => {
    console.log("TransitionStat component mounted");
    setIsMounted(true);
    
    // Mark component as loaded after initial render
    const loadTimer = setTimeout(() => {
      if (sectionRef.current) {
        setIsLoaded(true);
      }
    }, 100);
    
    return () => {
      console.log("TransitionStat component unmounting");
      clearTimeout(loadTimer);
      setIsMounted(false);
    };
  }, []);
  
  // Once component is loaded, initialize animations with improved error handling
  useEffect(() => {
    // Only proceed if the component is both loaded and still mounted
    if (isLoaded && isMounted && sectionRef.current) {
      const controller = new AbortController();
      
      // Dynamically import the hook to avoid early initialization issues
      import('@/hooks/useTransitionStatAnimation').then(module => {
        // Check if component is still mounted before initializing animations
        if (isMounted && sectionRef.current) {
          try {
            // Pass the abort controller signal to the hook
            module.useTransitionStatAnimation(controller.signal);
            console.log("TransitionStat animation initialized");
          } catch (error) {
            console.error("Error initializing TransitionStat animation:", error);
          }
        }
      }).catch(error => {
        if (isMounted) {  // Only log if still mounted
          console.error("Error importing TransitionStatAnimation hook:", error);
        }
      });
      
      // Clean up with abort controller
      return () => {
        controller.abort("Component unmounting");
      };
    }
  }, [isLoaded, isMounted]);
  
  // Explicitly set data-background attribute to ensure correct navbar handling
  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.setAttribute('data-background', 'dark');
    }
  }, []);
  
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('future-showcase');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section 
      id="transition-stat" 
      ref={sectionRef} 
      className="min-h-screen flex flex-col justify-center items-center py-10 relative overflow-hidden bg-[#3C403A]"
      data-background="dark"
    >
      {/* Decorative elements */}
      <div className="absolute -right-20 top-20 w-80 h-80 rounded-full bg-raade-gold-start/10 blur-3xl pointer-events-none section-background"></div>
      <div className="absolute -left-20 bottom-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none section-background"></div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="space-y-8">
          <div className="text-4xl md:text-7xl lg:text-8xl font-bold text-white mb-8 font-Montserrat rounded-3xl stat-counter transition-opacity duration-500">
            By 2050, <span className="text-raade-gold-start"><CountUp end={25} duration={2.5} />%</span> of people
            <br />will be African.
          </div>
          <p className="text-xl md:text-3xl text-white/80 max-w-3xl mx-auto font-merriweather content-element opacity-100 transition-opacity duration-500">
            The systems we build today will shape their tomorrow.
          </p>
        </div>
      </div>
      
      {/* Bottom navigation */}
      <div className="text-center absolute bottom-10 z-10">
        <p className="text-lg text-white/60 font-merriweather mb-6 content-element opacity-100 transition-opacity duration-500">
          Here's what we are building...
        </p>
        <button 
          onClick={scrollToNextSection} 
          className="cursor-pointer p-4 group transition-transform hover:translate-y-1" 
          aria-label="Scroll to next section"
        >
          <ArrowDown className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
        </button>
      </div>
    </section>
  );
};

export default TransitionStat;
