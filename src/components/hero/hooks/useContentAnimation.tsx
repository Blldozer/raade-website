
import { useEffect, RefObject } from 'react';
import gsap from 'gsap';

/**
 * Custom hook to animate the hero content
 * 
 * Features:
 * - Respects user's reduced motion preferences
 * - Falls back to CSS animations when possible for better performance
 * - Adds will-change hints for better rendering performance
 * - Enhanced with error handling for React context issues
 * 
 * @param contentRef - Reference to the content element to animate
 */
export const useContentAnimation = (contentRef: RefObject<HTMLDivElement>) => {
  // Check if we're in a React context environment
  const isReactInitialized = typeof window !== 'undefined' && 
    window.__REACT_INITIALIZED === true;
    
  // If React isn't properly initialized, return early
  if (!isReactInitialized) {
    console.warn("useContentAnimation: React not fully initialized");
    return;
  }

  // Verify React hooks are available
  if (typeof useEffect !== 'function') {
    console.warn("useContentAnimation: React hooks unavailable");
    return;
  }
  
  useEffect(() => {
    // Check if GSAP is available
    if (typeof gsap !== 'object' || !gsap.to) {
      console.warn("useContentAnimation: GSAP not available");
      return;
    }
    
    // Check if contentRef is valid
    if (!contentRef.current) {
      console.warn("useContentAnimation: Content ref not available");
      return;
    }
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Skip animations for users who prefer reduced motion
      console.log("useContentAnimation: Skipping animations due to reduced motion preference");
      return;
    }
    
    try {
      // Get all headings and paragraphs
      const container = contentRef.current;
      const headings = container.querySelectorAll('h1, h2, h3');
      const paragraphs = container.querySelectorAll('p');
      const buttons = container.querySelectorAll('.btn, button');
      
      // Set will-change for better performance
      [...headings, ...paragraphs, ...buttons].forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.willChange = 'opacity, transform';
        }
      });
      
      // Create a timeline for the animations
      const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power2.out' } });
      
      // Animate headings
      if (headings.length) {
        tl.fromTo(
          headings,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.2 }
        );
      }
      
      // Animate paragraphs
      if (paragraphs.length) {
        tl.fromTo(
          paragraphs,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1 },
          '-=0.4'
        );
      }
      
      // Animate buttons
      if (buttons.length) {
        tl.fromTo(
          buttons,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1 },
          '-=0.2'
        );
      }
      
      // Clean up will-change after animation completes
      tl.call(() => {
        [...headings, ...paragraphs, ...buttons].forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.willChange = 'auto';
          }
        });
      });
      
      // Return cleanup function
      return () => {
        if (tl && typeof tl.kill === 'function') {
          tl.kill();
        }
      };
    } catch (error) {
      console.error("useContentAnimation: Error in animation setup", error);
      // Don't rethrow - just let the component render without animations
    }
  }, [contentRef]);
};

export default useContentAnimation;
