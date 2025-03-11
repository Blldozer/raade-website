
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useResponsive } from './useResponsive';

gsap.registerPlugin(ScrollTrigger);

export const useTransitionHookAnimation = () => {
  const { isMobile } = useResponsive();
  
  useEffect(() => {
    const section = document.querySelector('#transition-hook');
    
    if (!section) return;
    
    // Create a single animation timeline for better performance
    const tl = gsap.timeline({
      paused: true,
      defaults: { 
        ease: "power2.out",
        clearProps: "scale,opacity" // Clear properties for better performance
      }
    });
    
    // Get all elements we need to animate
    const heading = section.querySelector("h2");
    const paragraphText = section.querySelector("p");
    const scrollButton = section.querySelector("button");
    
    // Add all animations to the timeline
    if (heading) {
      tl.fromTo(heading, 
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8 }
      );
    }
    
    if (paragraphText) {
      tl.fromTo(paragraphText,
        { y: 15, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6 },
        "-=0.2" // Slight overlap
      );
    }
    
    if (scrollButton) {
      tl.fromTo(scrollButton,
        { y: 15, autoAlpha: 0 },
        { 
          y: 0, 
          autoAlpha: 1, 
          duration: 0.6,
          onComplete: () => {
            // Separate timeline for continual bounce animation
            // Only run this animation when visible for better performance
            const buttonTl = gsap.timeline({
              repeat: -1, 
              yoyo: true,
              defaults: { ease: "sine.inOut" }
            });
            
            buttonTl.to(scrollButton, {
              y: "8px", // Reduced movement
              duration: 1
            });
            
            // Add to ScrollTrigger for visibility control
            ScrollTrigger.create({
              trigger: scrollButton,
              start: "top bottom",
              end: "bottom top",
              onEnter: () => buttonTl.play(),
              onLeave: () => buttonTl.pause(),
              onEnterBack: () => buttonTl.play(),
              onLeaveBack: () => buttonTl.pause()
            });
          }
        },
        "-=0.2" // Slight overlap
      );
    }
    
    // Create a single ScrollTrigger with performance optimizations
    ScrollTrigger.create({
      trigger: section,
      start: isMobile ? "top 85%" : "top 75%",
      once: true, // Only trigger once for better performance
      fastScrollEnd: true,
      onEnter: () => {
        // Use RAF for smoother animation start
        requestAnimationFrame(() => {
          tl.play();
        });
      }
    });
    
    return () => {
      // Proper cleanup
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [isMobile]);
};
