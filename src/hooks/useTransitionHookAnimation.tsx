
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useResponsive } from './useResponsive';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for transition hook animations
 * Handles animations with proper error handling and cleanup
 */
export const useTransitionHookAnimation = () => {
  const { isMobile } = useResponsive();
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  
  useEffect(() => {
    console.log("TransitionHookAnimation: Initializing");
    
    try {
      const section = document.querySelector('#transition-hook');
      
      if (!section) {
        console.warn("TransitionHookAnimation: Section not found");
        return;
      }
      
      // Create a timeline for this section
      timeline.current = gsap.timeline({ 
        paused: true,
        defaults: { 
          ease: "power2.out",
          clearProps: "scale,opacity" // Clear properties after animation
        }
      });
      
      // Get all elements we need to animate
      const heading = section.querySelector("h2");
      const paragraphText = section.querySelector("p");
      const scrollButton = section.querySelector("button");
      
      // Add animations to timeline if elements exist
      if (heading) {
        timeline.current.fromTo(heading, 
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8 }
        );
      }
      
      if (paragraphText) {
        timeline.current.fromTo(paragraphText,
          { y: 15, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6 },
          "-=0.2" // Slight overlap
        );
      }
      
      if (scrollButton) {
        timeline.current.fromTo(scrollButton,
          { y: 15, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6 },
          "-=0.2" // Slight overlap
        );
      }
      
      // Create a ScrollTrigger with error handling
      try {
        scrollTriggerRef.current = ScrollTrigger.create({
          trigger: section,
          start: isMobile ? "top 85%" : "top 75%",
          once: true, // Only trigger once for better performance
          onEnter: () => {
            try {
              if (timeline.current) {
                timeline.current.play();
              }
            } catch (err) {
              console.error("Error playing animation:", err);
            }
          }
        });
      } catch (err) {
        console.error("Error creating ScrollTrigger:", err);
      }
      
      console.log("TransitionHookAnimation: Initialized successfully");
    } catch (error) {
      console.error("Error in TransitionHookAnimation:", error);
    }
    
    // Cleanup function with error handling
    return () => {
      console.log("TransitionHookAnimation: Cleaning up");
      
      try {
        // Kill the timeline
        if (timeline.current) {
          timeline.current.kill();
          timeline.current = null;
        }
        
        // Kill the ScrollTrigger
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill();
          scrollTriggerRef.current = null;
        }
      } catch (error) {
        console.error("Error cleaning up TransitionHookAnimation:", error);
      }
    };
  }, [isMobile]);
};
