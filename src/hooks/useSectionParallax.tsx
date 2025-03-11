import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useResponsive } from './useResponsive';

gsap.registerPlugin(ScrollTrigger);

export const useSectionParallax = (sectionId: string, depth: number = 0.2) => {
  const { isMobile, isTablet } = useResponsive();
  
  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const parallaxElements = section.querySelectorAll('.parallax-element');
    
    if (parallaxElements.length === 0) return;
    
    // OPTIMIZATION 1: Reduce parallax depth further to improve performance
    const adjustedDepth = isMobile ? depth * 0.2 : isTablet ? depth * 0.3 : depth * 0.5;
    
    // Create a container for all animations in this section
    const sectionTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        // OPTIMIZATION 2: Add a lower refresh rate to reduce calculations
        scrub: 2, // Increased value for smoother but less CPU-intensive parallax
        invalidateOnRefresh: false, // Don't recalculate on window resize
      }
    });
    
    // OPTIMIZATION 3: Limit the number of parallax elements we process
    const maxParallaxElements = 4; // Only apply parallax to a limited number of elements
    const elementsToAnimate = Array.from(parallaxElements).slice(0, maxParallaxElements);
    
    elementsToAnimate.forEach((element, index) => {
      // Reduce the depth variation between elements to minimize overlapping issues
      const elementDepth = adjustedDepth * (1 + (index * 0.05));
      
      if (element instanceof Element) {
        const currentStyles = window.getComputedStyle(element);
        const currentZIndex = parseInt(currentStyles.zIndex) || 0;
        element.setAttribute('style', `${element.getAttribute('style') || ''}; z-index: ${100 - Math.round(elementDepth * 100)};`);
      }
      
      sectionTimeline.to(element, {
        y: `${elementDepth * 100}%`,
        ease: "none",
      }, 0);
    });
    
    return () => {
      // Clean up the ScrollTrigger
      if (sectionTimeline.scrollTrigger) {
        sectionTimeline.scrollTrigger.kill();
      }
    };
  }, [sectionId, depth, isMobile, isTablet]);
};
