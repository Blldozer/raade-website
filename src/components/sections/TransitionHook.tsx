
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

/**
 * TransitionHook Component - Displays a compelling message between sections
 * Uses GSAP for smooth scrolling to the next section
 */
const TransitionHook = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isAnimationInitialized, setIsAnimationInitialized] = useState(false);
  
  // Handle GSAP initialization and animations
  useEffect(() => {
    console.log("TransitionHook component mounted");
    
    // Register GSAP plugins safely within the effect
    try {
      if (!gsap.utils.checkPrefix("ScrollToPlugin")) {
        gsap.registerPlugin(ScrollToPlugin);
      }
    } catch (error) {
      console.error("Error registering ScrollToPlugin:", error);
    }
    
    // Only initialize animations if the component is mounted and refs are valid
    if (sectionRef.current && contentRef.current) {
      try {
        const headingElement = contentRef.current.querySelector('h2');
        const paragraphElement = contentRef.current.querySelector('p');
        const buttonElement = contentRef.current.querySelector('button');
        
        const tl = gsap.timeline({
          paused: true,
          defaults: { 
            ease: "power2.out",
          }
        });
        
        // Reset initial state
        gsap.set([headingElement, paragraphElement, buttonElement], { 
          autoAlpha: 0, 
          y: 20 
        });
        
        // Add animations to timeline
        if (headingElement) {
          tl.to(headingElement, { autoAlpha: 1, y: 0, duration: 0.8 }, 0);
        }
        
        if (paragraphElement) {
          tl.to(paragraphElement, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.2);
        }
        
        if (buttonElement) {
          tl.to(buttonElement, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.4);
        }
        
        // Create a simple scroll trigger
        const trigger = gsap.context(() => {
          gsap.utils.toArray('#transition-hook').forEach((section) => {
            const triggerElement = section as Element;
            
            gsap.fromTo(
              triggerElement,
              { opacity: 0.8, scale: 0.95 },
              {
                opacity: 1,
                scale: 1,
                scrollTrigger: {
                  trigger: triggerElement,
                  start: "top 80%",
                  once: true,
                  onEnter: () => {
                    tl.play();
                  }
                }
              }
            );
          });
        }, sectionRef);
        
        // Mark animations as initialized
        setIsAnimationInitialized(true);
        
        // Cleanup function
        return () => {
          console.log("TransitionHook cleanup");
          trigger.revert(); // Clean up all GSAP contexts
          tl.kill();
        };
      } catch (error) {
        console.error("Error setting up TransitionHook animations:", error);
      }
    }
    
    return () => {
      console.log("TransitionHook component unmounting");
    };
  }, []);
  
  const scrollToNextSection = () => {
    try {
      const nextSection = document.getElementById('join');
      if (nextSection) {
        if (gsap.utils.checkPrefix("ScrollToPlugin")) {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: nextSection,
              offsetY: 0
            },
            ease: "power2.inOut"
          });
        } else {
          // Fallback to native scrolling
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } catch (error) {
      console.error("Error scrolling to next section:", error);
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
