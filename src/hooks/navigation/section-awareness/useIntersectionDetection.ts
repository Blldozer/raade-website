
import { useState, useEffect, useRef, useCallback } from 'react';

export interface IntersectionDetectionOptions {
  /**
   * The CSS selector for target sections to observe
   * @default 'section, .section, [data-section]'
   */
  sectionSelector?: string;
  
  /**
   * Threshold for the Intersection Observer
   * @default 0.6
   */
  threshold?: number;
  
  /**
   * Root margin for the Intersection Observer
   * @default '0px'
   */
  rootMargin?: string;
  
  /**
   * Elements to exclude from observation
   * @default []
   */
  excludeSections?: string[];
}

/**
 * Custom hook to detect which sections are currently in the viewport
 * using Intersection Observer API
 * 
 * @param options - Configuration options for the intersection observer
 * @returns Object containing the current section and intersection handler
 */
export const useIntersectionDetection = ({
  sectionSelector = 'section, .section, [data-section]',
  threshold = 0.6,
  rootMargin = '0px',
  excludeSections = []
}: IntersectionDetectionOptions = {}) => {
  // Track the current section
  const [currentSection, setCurrentSection] = useState<Element | null>(null);
  
  // Store sections that are currently intersecting with their intersection ratios
  const intersectingSections = useRef<Map<Element, number>>(new Map());
  
  // Handle intersections detected by the observer
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      // Skip excluded sections
      if (excludeSections.some(selector => entry.target.matches(selector))) {
        return;
      }
      
      if (entry.isIntersecting) {
        // Store the section with its intersection ratio
        intersectingSections.current.set(entry.target, entry.intersectionRatio);
      } else {
        // Remove the section if it's no longer intersecting
        intersectingSections.current.delete(entry.target);
      }
    });
    
    // Find the section with the highest intersection ratio
    let highestRatio = 0;
    let topSection: Element | null = null;
    
    intersectingSections.current.forEach((ratio, section) => {
      if (ratio > highestRatio) {
        highestRatio = ratio;
        topSection = section;
      }
    });
    
    // Update the current section if it changed
    if (topSection !== currentSection) {
      setCurrentSection(topSection);
    }
  }, [currentSection, excludeSections]);
  
  // Initialize the intersection observer when the component mounts
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    });
    
    // Select all sections to observe
    const sections = document.querySelectorAll(sectionSelector);
    
    // Start observing each section
    sections.forEach(section => {
      // Skip excluded sections
      if (excludeSections.some(selector => section.matches(selector))) {
        return;
      }
      
      observer.observe(section);
    });
    
    // Cleanup function to disconnect the observer
    return () => {
      observer.disconnect();
    };
  }, [handleIntersection, sectionSelector, threshold, rootMargin, excludeSections]);
  
  // Return the current section element
  return {
    currentSection,
    currentSectionId: currentSection?.id || null
  };
};
