
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGeneralSectionAnimations = () => {
  useEffect(() => {
    // Get sections that aren't handled by specific hooks
    const sections = document.querySelectorAll('section:not(#hero, #transition-stat, #transition-hook, #future-showcase)');
    
    sections.forEach((section) => {
      // Create ScrollTrigger for each section
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "top 20%",
        onEnter: () => {
          // For other sections, identify and animate any content elements that don't have opacity-100
          const contentElements = section.querySelectorAll(".content-element:not(.opacity-100)");
          if (contentElements.length) {
            gsap.fromTo(contentElements,
              { y: 20, autoAlpha: 0 },
              { 
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                stagger: 0.3,
                ease: "power2.out"
              }
            );
          }
        }
      });
    });
    
    return () => {
      // Fix: Instead of trying to match directly, iterate through all triggers and check
      // if the trigger element is one of our target sections
      ScrollTrigger.getAll().forEach(trigger => {
        const triggerElement = trigger.vars.trigger;
        if (triggerElement instanceof Element &&
            !triggerElement.matches('#hero, #transition-stat, #transition-hook, #future-showcase')) {
          trigger.kill();
        }
      });
    };
  }, []);
};
