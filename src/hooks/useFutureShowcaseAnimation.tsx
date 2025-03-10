
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useFutureShowcaseAnimation = () => {
  useEffect(() => {
    const section = document.querySelector('#future-showcase');
    
    if (!section) return;
    
    // Create ScrollTrigger for the section
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "top 20%",
      onEnter: () => {
        // Animate the header content
        const header = section.querySelector('.content-element:not(.opacity-100)');
        if (header) {
          gsap.fromTo(header,
            { y: 30, autoAlpha: 0 },
            { 
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              delay: 0.2,
              ease: "power2.out"
            }
          );
        }

        // Animate the project cards
        const projectCards = section.querySelectorAll('.project-card');
        projectCards.forEach((card, i) => {
          gsap.fromTo(card,
            { x: i % 2 === 0 ? -50 : 50, autoAlpha: 0 },
            { 
              x: 0,
              autoAlpha: 1,
              duration: 0.7,
              delay: 0.4 + (i * 0.15),
              ease: "power2.out"
            }
          );
        });
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
