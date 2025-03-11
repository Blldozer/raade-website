import { useEffect, useRef } from 'react';
import { useResponsive } from './useResponsive';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Optimized parallax hook with batched animations and performance improvements
export const useOptimizedParallax = () => {
  const { isMobile, isTablet } = useResponsive();
  const ticking = useRef(false);
  const rafId = useRef<number | null>(null);
  
  useEffect(() => {
    // Skip intensive parallax on mobile
    if (isMobile) {
      // Apply simplified parallax for mobile - just basic animations
      applySimplifiedParallax();
      return;
    }
    
    // The sections that need parallax
    const sections = [
      { id: 'conference-promo', depth: 0.15 },  // Reduced depth from 0.2
      { id: 'transition-stat', depth: 0.1 },    // Reduced depth from 0.15
      { id: 'future-showcase', depth: 0.15 }    // Reduced depth from 0.25
    ];
    
    // Batch all parallax animations into a single timeline per section
    sections.forEach(({ id, depth }) => {
      const section = document.getElementById(id);
      if (!section) return;
      
      const parallaxElements = section.querySelectorAll('.parallax-element');
      if (parallaxElements.length === 0) return;
      
      // Reduce parallax effect based on device
      const adjustedDepth = isTablet ? depth * 0.5 : depth;
      
      // Create a single timeline for all elements in this section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Only update when not already ticking to throttle updates
            if (!ticking.current) {
              ticking.current = true;
              
              // Use RAF for smoother updates
              if (rafId.current) {
                cancelAnimationFrame(rafId.current);
              }
              
              rafId.current = requestAnimationFrame(() => {
                // Set will-change for better performance during scrolling
                parallaxElements.forEach(el => {
                  if (el instanceof HTMLElement) {
                    el.style.willChange = 'transform';
                  }
                });
                
                ticking.current = false;
              });
            }
          },
          onLeave: () => {
            // Reset will-change when section is out of view
            parallaxElements.forEach(el => {
              if (el instanceof HTMLElement) {
                el.style.willChange = 'auto';
              }
            });
          }
        }
      });
      
      // Add all elements to the timeline at once
      parallaxElements.forEach((element, index) => {
        // Calculate layered depth but keep it minimal
        const elementDepth = adjustedDepth * (1 + (index * 0.05));
        
        // Add to timeline (all at position 0 so they run in parallel)
        tl.to(element, {
          y: `${elementDepth * 100}%`,
          ease: "none",
        }, 0);
      });
    });
    
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      
      // Clean up all ScrollTriggers to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => {
        trigger.kill();
      });
    };
  }, [isMobile, isTablet]);
  
  // Simplified parallax for mobile devices - just basic fade animations
  const applySimplifiedParallax = () => {
    const sections = ['conference-promo', 'transition-stat', 'future-showcase'];
    
    sections.forEach(id => {
      const section = document.getElementById(id);
      if (!section) return;
      
      const parallaxElements = section.querySelectorAll('.parallax-element');
      if (parallaxElements.length === 0) return;
      
      // Create a simple ScrollTrigger for fade-in effect instead of parallax
      ScrollTrigger.create({
        trigger: section,
        start: "top 90%",
        once: true, // Only trigger once for better performance
        onEnter: () => {
          gsap.to(parallaxElements, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "power1.out"
          });
        }
      });
    });
  };
};
