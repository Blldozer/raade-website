
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
      // Clean up parallax effects
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.animation?.targets?.includes('.section-background')) {
          trigger.kill();
        }
      });
    };
  }, []);
};
