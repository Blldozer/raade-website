
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register the ScrollToPlugin
gsap.registerPlugin(ScrollTrigger);

/**
 * TransitionHook Component - Displays a compelling message between sections
 * Uses GSAP for smooth scrolling to the next section
 * 
 * This component implements animations directly without relying on dynamic imports
 * to prevent initialization issues that could cause blank screens
 */
const TransitionHook = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Initialize animations directly
  useEffect(() => {
    console.log("TransitionHook component mounted");
    
    // Small timeout to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      try {
        console.log("TransitionHook: Initializing animations");
        
        if (!sectionRef.current || !contentRef.current) {
          console.warn("TransitionHook: Refs not available yet");
          return;
        }
        
        // Check if window has loaded correctly
        if (typeof window === 'undefined') {
          console.warn("TransitionHook: Window not available");
          return;
        }
        
        // Create animation timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            once: true, // Only trigger once for better performance
            onEnter: () => console.log("TransitionHook: ScrollTrigger entered")
          }
        });
        
        // Apply animations
        tl.fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
        );
        
        console.log("TransitionHook: Animation initialized successfully");
      } catch (error) {
        console.error("Error initializing TransitionHook animations:", error);
      }
    }, 300); // Slightly longer delay to ensure React is ready
    
    return () => {
      clearTimeout(initTimeout);
      console.log("TransitionHook component unmounting");
    };
  }, []);
  
  // Handle scrolling to next section
  const scrollToNextSection = () => {
    try {
      const nextSection = document.getElementById('join');
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
