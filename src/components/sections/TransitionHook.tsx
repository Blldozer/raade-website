
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { registerGsapPlugins } from '@/utils/gsapUtils';

// Register GSAP plugins via our centralized utility
registerGsapPlugins();

/**
 * TransitionHook Component - Displays a compelling message between sections
 * Uses GSAP for smooth scrolling to the next section
 * 
 * This component is lazy-loaded, so we need to ensure animations are initialized
 * after the component is fully mounted to prevent React hook initialization issues
 */
const TransitionHook = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Initialize component first, then mark as mounted
  useEffect(() => {
    console.log("TransitionHook component mounted");
    setIsMounted(true);
    
    // Mark component as loaded after initial render
    const loadTimer = setTimeout(() => {
      if (sectionRef.current) {
        setIsLoaded(true);
      }
    }, 100);
    
    return () => {
      console.log("TransitionHook component unmounting");
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
      import('@/hooks/useTransitionHookAnimation').then(module => {
        // Check if component is still mounted before initializing animations
        if (isMounted && sectionRef.current) {
          try {
            // Pass the abort controller signal to the hook
            module.useTransitionHookAnimation(controller.signal);
            console.log("TransitionHook animation initialized");
          } catch (error) {
            console.error("Error initializing TransitionHook animation:", error);
          }
        }
      }).catch(error => {
        if (isMounted) {  // Only log if still mounted
          console.error("Error importing TransitionHookAnimation hook:", error);
        }
      });
      
      // Clean up with abort controller
      return () => {
        controller.abort("Component unmounting");
      };
    }
  }, [isLoaded, isMounted]);
  
  const scrollToNextSection = () => {
    try {
      const nextSection = document.getElementById('join');
      if (nextSection) {
        // First check if GSAP is available and properly initialized
        if (gsap.to && typeof gsap.to === 'function') {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: nextSection,
              offsetY: 0
            },
            ease: "power2.inOut"
          });
        } else {
          // Fallback to standard scrolling if GSAP fails
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } catch (error) {
      console.error("Error scrolling to next section:", error);
      // Fallback to standard scrolling
      const nextSection = document.getElementById('join');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      id="transition-hook"
      ref={sectionRef} 
      className="min-h-screen flex flex-col justify-between section-padding bg-[#3C403A]"
    >
      <div ref={contentRef} className="flex-grow flex items-center">
        <div className="fluid-container text-center">
          <h2 className="fluid-h2 font-bold text-white font-alegreyasans max-w-4xl mx-auto">
            Every day we wait
            <br className="hidden sm:block" />
            is another <span className="text-raade-gold-start">opportunity lost</span>.
          </h2>
        </div>
      </div>
      
      <div className="text-center pb-[clamp(2rem,4vw,3rem)]">
        <p className="fluid-body text-white/80 font-merriweather mb-[clamp(1rem,2vw,1.5rem)] max-w-lg mx-auto">
          Here's how you can get involved
        </p>
        <button
          onClick={scrollToNextSection}
          className="cursor-pointer p-4 group"
          aria-label="Scroll to next section"
        >
          <div className="w-[clamp(1.25rem,2vw,1.5rem)] h-[clamp(1.25rem,2vw,1.5rem)] mx-auto border-b-2 border-r-2 border-white/30 rotate-45 transition-all duration-300 group-hover:border-white group-hover:scale-110" />
        </button>
      </div>
    </section>
  );
};

export default TransitionHook;
