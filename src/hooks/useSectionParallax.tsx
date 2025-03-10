
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useSectionParallax = () => {
  useEffect(() => {
    // Get all sections except hero
    const sections = document.querySelectorAll('section:not(#hero)');
    
    sections.forEach((section) => {
      // Add subtle parallax effect to section backgrounds
      const background = section.querySelector('.section-background');
      if (background) {
        gsap.to(background, {
          y: "-20%",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5
          }
        });
      }
    });
    
    return () => {
      // Fix: Don't try to access the animation directly
      // Instead, kill all ScrollTrigger instances that are related to section backgrounds
      ScrollTrigger.getAll().forEach(trigger => {
        // Get the trigger element
        const triggerElement = trigger.vars.trigger;
        
        // Check if it's a section and has a background element
        if (triggerElement instanceof Element && 
            triggerElement.tagName.toLowerCase() === 'section' &&
            triggerElement.querySelector('.section-background')) {
          trigger.kill();
        }
      });
    };
  }, []);
};
