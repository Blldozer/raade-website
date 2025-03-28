
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
        gsap.set(statCounter, { autoAlpha: 0, scale: 0.95 });
      }
      
      if (contentElements.length) {
        gsap.set(contentElements, { autoAlpha: 0, y: 15 });
      }
      
      // Build animation sequence
      if (statCounter) {
        tl.to(statCounter, { 
          scale: 1, 
          autoAlpha: 1, 
          duration: 1, 
          ease: "back.out(1.1)" 
        });
      }
      
      if (contentElements.length) {
        tl.to(contentElements, { 
          y: 0, 
          autoAlpha: 1, 
          duration: 0.6, 
          stagger: 0.25 
        }, "-=0.3");
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
      className="min-h-screen flex flex-col justify-center items-center py-10 relative overflow-hidden bg-[#3C403A]"
      data-background="dark"
    >
      {/* Decorative elements */}
      <div className="absolute -right-20 top-20 w-80 h-80 rounded-full bg-raade-gold-start/10 blur-3xl pointer-events-none section-background"></div>
      <div className="absolute -left-20 bottom-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none section-background"></div>
      
      {/* Main content */}
      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="space-y-8">
          <div className="text-4xl md:text-7xl lg:text-8xl font-bold text-white mb-8 font-alegreyasans rounded-3xl stat-counter">
            By 2050, <span className="text-raade-gold-start"><CountUp end={25} duration={2.5} />%</span> of people
            <br />will be African.
          </div>
          <p className="text-xl md:text-3xl text-white/80 max-w-3xl mx-auto font-merriweather content-element">
            The systems we build today will shape their tomorrow.
          </p>
        </div>
      </div>
      
      {/* Bottom navigation */}
      <div className="text-center absolute bottom-10 z-10">
        <p className="text-lg text-white/60 font-merriweather mb-6 content-element">
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
