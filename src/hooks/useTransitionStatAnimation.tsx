
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useTransitionStatAnimation = () => {
  useEffect(() => {
    const section = document.querySelector('#transition-stat');
    
    if (!section) return;
    
    // Create ScrollTrigger for the section
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "top 20%",
      onEnter: () => {
        // Animate stat counter with a scale effect
        const statCounter = section.querySelector(".stat-counter");
        if (statCounter) {
          gsap.fromTo(statCounter, 
            { scale: 0.9, autoAlpha: 0 },
            { 
              scale: 1, 
              autoAlpha: 1, 
              duration: 1.2, 
              ease: "back.out(1.2)",
              delay: 0.3
            }
          );
        }
        
        // Animate the description text that appears after the stat
        const contentElements = section.querySelectorAll(".content-element:not(.opacity-100)");
        if (contentElements.length) {
          gsap.fromTo(contentElements,
            { y: 20, autoAlpha: 0 },
            { 
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              stagger: 0.4,
              delay: 1.2,
              ease: "power2.out"
            }
          );
        }
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);
};
