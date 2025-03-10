
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useSectionParallax = (sectionId: string, depth: number = 0.2) => {
  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const parallaxElements = section.querySelectorAll('.parallax-element');
    
    if (parallaxElements.length === 0) return;
    
    // Create a container for all animations in this section
    const sectionTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
    
    parallaxElements.forEach((element, index) => {
      // Calculate a slightly different depth for each element to create layering
      const adjustedDepth = depth * (1 + (index * 0.1));
      
      sectionTimeline.to(element, {
        y: `${adjustedDepth * 100}%`,
        ease: "none",
      }, 0); // The '0' means all animations start together
    });
    
    return () => {
      // Clean up all ScrollTriggers related to this section
      ScrollTrigger.getAll().forEach(trigger => {
        const triggerVars = trigger.vars;
        // Check if the trigger element is our section
        if (triggerVars.trigger && 
            triggerVars.trigger instanceof Element && 
            triggerVars.trigger.id === sectionId) {
          trigger.kill();
        }
      });
    };
  }, [sectionId, depth]);
};
