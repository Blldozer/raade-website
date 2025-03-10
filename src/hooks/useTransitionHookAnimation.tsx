
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useTransitionHookAnimation = () => {
  useEffect(() => {
    const section = document.querySelector('#transition-hook');
    
    if (!section) return;
    
    // Create ScrollTrigger for the section
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "top 20%",
      onEnter: () => {
        // Animate the heading separately with a more dramatic reveal
        const heading = section.querySelector("h2");
        if (heading) {
          gsap.fromTo(heading, 
            { y: 50, autoAlpha: 0 },
            { 
              y: 0, 
              autoAlpha: 1, 
              duration: 1, 
              ease: "power3.out",
              delay: 0.3
            }
          );
        }
        
        // Animate the paragraph text
        const paragraphText = section.querySelector("p");
        if (paragraphText) {
          gsap.fromTo(paragraphText,
            { y: 20, autoAlpha: 0 },
            { 
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              delay: 1.1,
              ease: "power2.out"
            }
          );
        }
        
        // Animate the scroll button with a continuous bounce
        const scrollButton = section.querySelector("button");
        if (scrollButton) {
          gsap.fromTo(scrollButton,
            { y: 20, autoAlpha: 0 },
            { 
              y: 0, 
              autoAlpha: 1, 
              duration: 0.8,
              delay: 1.5,
              ease: "power2.out",
              onComplete: () => {
                // Add the continuous bounce animation after the entrance animation
                gsap.to(scrollButton, {
                  y: "10px",
                  repeat: -1,
                  yoyo: true,
                  duration: 1,
                  ease: "sine.inOut"
                });
              }
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
