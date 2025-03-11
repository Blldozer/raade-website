import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGeneralSectionAnimations = () => {
  useEffect(() => {
    // OPTIMIZATION: Reduce animations by focusing only on visible sections
    const visibleSections = ['conference-promo', 'join'];
    
    // Get specific sections instead of all sections
    const sections = visibleSections.map(id => document.getElementById(id)).filter(Boolean);
    
    // OPTIMIZATION: Create a single batch of ScrollTriggers with shared config
    ScrollTrigger.batch(sections, {
      interval: 0.3, // time delay between capturing batches
      batchMax: 2,   // maximum batch size (reduce CPU usage)
      onEnter: batch => {
        gsap.to(batch, {
          autoAlpha: 1,
          stagger: 0.15,
          overwrite: true
        });
        
        // Animate content elements within each section
        batch.forEach(section => {
          const contentElements = section.querySelectorAll('.content-element:not(.opacity-100)');
          if (contentElements.length) {
            gsap.fromTo(contentElements,
              { y: 15, autoAlpha: 0 }, // Reduced movement for better performance
              { 
                y: 0,
                autoAlpha: 1,
                duration: 0.6, // Shorter duration
                stagger: 0.2,  // Smaller stagger
                ease: "power1.out" // Simpler easing function
              }
            );
          }
        });
      },
      start: "top 85%", 
      once: true // OPTIMIZATION: Only trigger animations once
    });
    
    return () => {
      // Clear all ScrollTriggers for these specific sections
      ScrollTrigger.getAll()
        .filter(trigger => {
          const triggerElement = trigger.vars.trigger;
          return triggerElement instanceof Element && 
                 visibleSections.some(id => triggerElement.id === id);
        })
        .forEach(trigger => trigger.kill());
    };
  }, []);
};
