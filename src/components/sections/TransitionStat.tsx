import React, { useRef, useEffect } from 'react';
import CountUp from 'react-countup';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

/**
 * TransitionStat Component
 * 
 * A section displaying a compelling statistic about Africa's population growth
 * Uses CountUp for animated number display with self-contained animations
 */
const TransitionStat = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Handle animations and cleanup
  useEffect(() => {
    console.log("TransitionStat component mounted");
    
    // Register GSAP plugins safely within the effect
    try {
      if (!gsap.utils.checkPrefix("ScrollTrigger")) {
        gsap.registerPlugin(ScrollTrigger);
      }
    } catch (error) {
      console.error("Error registering ScrollTrigger:", error);
    }
    
    // Wait for DOM to be ready
    if (!sectionRef.current) return;
    
    try {
      const section = sectionRef.current;
      const statCounter = section.querySelector(".stat-counter");
      const contentElements = section.querySelectorAll(".content-element");
      
      // Set correct background for navbar
      section.setAttribute('data-background', 'dark');
      
      // Create animation timeline
      const tl = gsap.timeline({
        paused: true,
        defaults: { 
          ease: "power2.out",
        }
      });
      
      // Reset initial state
      if (statCounter) {
        // Make visible by default but still apply animations
        gsap.set(statCounter, { autoAlpha: 1, scale: 1 });
      }
      
      if (contentElements.length) {
        // Make visible by default
        gsap.set(contentElements, { autoAlpha: 1, y: 0 });
      }
      
      // Build animation sequence - these now enhance rather than control visibility
      if (statCounter) {
        tl.fromTo(statCounter, 
          { autoAlpha: 0.7, scale: 0.95 },
          { 
            scale: 1, 
            autoAlpha: 1, 
            duration: 1, 
            ease: "back.out(1.1)" 
          }
        );
      }
      
      if (contentElements.length) {
        tl.fromTo(contentElements,
          { autoAlpha: 0.7, y: 15 },
          { 
            y: 0, 
            autoAlpha: 1, 
            duration: 0.6, 
            stagger: 0.25 
          }, "-=0.3"
        );
      }
      
      // Create scroll trigger context for easier cleanup
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 80%",
          once: true,
          onEnter: () => {
            tl.play();
          }
        });
      }, section);
      
      // Cleanup function
      return () => {
        console.log("TransitionStat component unmounting");
        ctx.revert(); // Clean up all ScrollTriggers
        tl.kill();
      };
    } catch (error) {
      console.error("Error in TransitionStat animations:", error);
    }
  }, []); // Empty dependency array - run once on mount
  
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
      className="min-h-screen flex flex-col items-center py-10 relative overflow-hidden bg-[#3C403A]"
      data-background="dark"
    >
      {/* Decorative elements */}
      <div className="absolute -right-20 top-20 w-80 h-80 rounded-full bg-raade-gold-start/10 blur-3xl pointer-events-none section-background"></div>
      <div className="absolute -left-20 bottom-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none section-background"></div>
      
      {/* Main content */}
      <div ref={contentRef} className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-1 flex-col items-center justify-center text-center z-10 min-h-[60vh]">
        <div className="space-y-6 md:space-y-8 w-full flex flex-col items-center">
          <div className="text-4xl md:text-7xl lg:text-8xl font-bold text-white mb-4 md:mb-8 font-alegreyasans rounded-3xl stat-counter px-2 md:px-0 mx-auto text-center">
            By 2050, <span className="text-raade-gold-start">25%</span> of people will be African.
          </div>
          <p className="text-xl md:text-3xl text-white/80 max-w-3xl mx-auto font-merriweather content-element px-4 leading-relaxed w-full flex justify-center items-center">
            The systems we build today will shape their tomorrow.
          </p>
        </div>
      </div>
      
      {/* Separate content and navigation with flex spacer */}
      <div className="flex-grow min-h-[50px] md:min-h-[80px]"></div>
      
      {/* Bottom content and navigation */}
      <div className="text-center z-10 mt-8 md:mt-12 mb-6 md:mb-10 w-full px-4">
        <p className="text-lg text-white/60 font-merriweather mb-4 md:mb-6 content-element">
          Here's what we are building...
        </p>
        <button 
          onClick={scrollToNextSection} 
          className="cursor-pointer p-4 group transition-transform hover:translate-y-1 content-element" 
          aria-label="Scroll to next section"
        >
          <ArrowDown className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
        </button>
      </div>
    </section>
  );
};

export default TransitionStat;
