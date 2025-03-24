import { useState, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to handle section navigation within the About page
 * Manages scrolling to specific sections with improved stability
 * 
 * Features:
 * - Prevents unwanted viewport snap-back
 * - Uses native browser scrolling for smoother performance
 * - Respects user scroll position without interference
 * - Prevents multiple scroll events from competing
 */
export const useSectionNavigation = () => {
  const [activeSection, setActiveSection] = useState(5); // Start with all sections visible
  const location = useLocation();
  
  // Use a ref to track programmatic scrolling
  const isScrollingProgrammatically = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  
  // Function to scroll to a specific section
  const scrollToSection = useCallback((sectionId: string) => {
    console.log(`Attempting to scroll to section: ${sectionId}`);
    
    // Complete section map with all available sections
    const sectionMap: {[key: string]: number} = {
      'overview': 1,  // Overview/New Model is the 1st section (after hero, 0-indexed)
      'model': 1,     // Alternative ID for the same section
      'reality': 2,   // Reality is the 2nd section
      'approach': 3,  // Our Approach is the 3rd section
      'impact': 4,    // Our Impact is the 4th section
      'team': 5       // Team is the 5th section
    };
    
    // Find element to scroll to
    const element = document.getElementById(sectionId);
    if (element) {
      // Cancel any pending scroll operation
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set flag to prevent scroll events from fighting
      isScrollingProgrammatically.current = true;
      
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        // Get the element's position
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetY = rect.top + scrollTop;
        
        // Perform the scroll
        window.scrollTo({
          top: targetY,
          behavior: 'smooth'
        });
        
        // Update active section
        if (sectionMap[sectionId] !== undefined) {
          setActiveSection(sectionMap[sectionId]);
        }
        
        // Clear the programmatic scrolling flag after animation completes
        scrollTimeoutRef.current = window.setTimeout(() => {
          isScrollingProgrammatically.current = false;
        }, 1000); // Typical smooth scroll takes ~1s
      });
    } else {
      console.warn(`Element #${sectionId} not found`);
    }
  }, []);
  
  // Initialize navigation based on URL hash or state
  const initializeNavigation = useCallback(() => {
    // Set all sections visible immediately
    setActiveSection(5);
    
    // Handle direct section navigation
    if (location.hash) {
      const sectionId = location.hash.substring(1); // Remove #
      
      // Small delay to ensure elements are rendered
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    }
  }, [location.hash, scrollToSection]);

  return {
    activeSection,
    setActiveSection,
    scrollToSection,
    initializeNavigation,
    isScrollingProgrammatically: isScrollingProgrammatically.current
  };
};
