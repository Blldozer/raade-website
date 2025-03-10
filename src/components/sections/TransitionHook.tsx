
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const TransitionHook = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const joinSection = document.getElementById('join');
    
    if (!section || !content || !joinSection) return;
    
    // Initial state - slightly scaled down
    gsap.set(section, {
      scale: 0.9,
      opacity: 0.7
    });
    
    // Listen for transition from FutureShowcase
    const transitionFromFutureHandler = () => {
      // Enhanced zoom-in effect when transitioning from FutureShowcase
      gsap.to(section, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        overwrite: true
      });
    };
    
    document.addEventListener('transitionToHook', transitionFromFutureHandler);
    
    // Create zoom-in animation for entering this section (default behavior)
    const enterTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "top center",
        scrub: true,
      }
    });
    
    // Scale up from smaller size as it enters the viewport
    enterTl.to(section, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    });
    
    // Create a smooth transition for the content
    gsap.fromTo(content, {
      y: 30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      scrollTrigger: {
        trigger: content,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
    
    // Create zoom-out animation when transitioning to joinSection
    const exitTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "bottom 60%",
        end: "bottom top",
        scrub: true,
        onLeave: () => {
          // Signal to the joinSection to start its zoom-in animation
          document.dispatchEvent(new CustomEvent('transitionToJoin'));
        }
      }
    });
    
    // Scale down and fade when transitioning to join section
    exitTl.to(section, {
      scale: 0.85,
      opacity: 0.5,
      duration: 1,
      ease: "power2.in"
    });
    
    return () => {
      // Clean up
      document.removeEventListener('transitionToHook', transitionFromFutureHandler);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const scrollToNextSection = () => {
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
  };

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col justify-between section-padding bg-[#3C403A]">
      <div ref={contentRef} className="flex-grow flex items-center">
        <div className="fluid-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[length:var(--fluid-h2)] font-bold text-white font-alegreyasans">
              Every day we wait
              <br />
              is another <span className="text-raade-gold-start">opportunity lost</span>.
            </h2>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center pb-[clamp(2rem,4vw,3rem)]"
      >
        <p className="text-[length:var(--fluid-body)] text-white/80 font-merriweather mb-[clamp(1rem,2vw,1.5rem)]">
          Here's how you can get involved
        </p>
        <motion.button
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          onClick={scrollToNextSection}
          className="cursor-pointer p-4 group"
          aria-label="Scroll to next section"
        >
          <div className="w-[clamp(1.25rem,2vw,1.5rem)] h-[clamp(1.25rem,2vw,1.5rem)] mx-auto border-b-2 border-r-2 border-white/30 rotate-45 transition-all duration-300 group-hover:border-white group-hover:scale-110" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default TransitionHook;
