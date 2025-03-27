
import { useState, useEffect, useRef } from 'react';

export interface IntersectionDetectionOptions {
  threshold?: number;
  rootMargin?: string;
  excludeSections?: string[];
}

/**
 * Hook to detect which sections are currently in the viewport
 * Enhanced with proper SSR handling
 */
export const useIntersectionDetection = (options: IntersectionDetectionOptions = {}) => {
  const [currentSection, setCurrentSection] = useState<Element | null>(null);
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);
  
  // Store observer in a ref to avoid recreation on each render
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Default options
  const threshold = options.threshold || 0.5;
  const rootMargin = options.rootMargin || '0px';
  const excludeSections = options.excludeSections || [];
  
  useEffect(() => {
    // Skip in SSR/non-browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    // Create the intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Sort entries by their intersection ratio, highest first
        const sortedEntries = [...entries].sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio
        );
        
        // Find the first entry that is intersecting above the threshold
        const highestVisibleEntry = sortedEntries.find(
          (entry) => entry.isIntersecting && entry.intersectionRatio >= threshold
        );
        
        if (highestVisibleEntry) {
          setCurrentSection(highestVisibleEntry.target);
          setCurrentSectionId(
            highestVisibleEntry.target.id || 
            // Use a data attribute as fallback
            highestVisibleEntry.target.getAttribute('data-section-id') || 
            null
          );
        }
      },
      { threshold, rootMargin }
    );
    
    // Select all section elements
    const sections = document.querySelectorAll('section, [data-section]');
    
    // Filter out excluded sections
    const validSections = Array.from(sections).filter(section => {
      // Check if this section matches any exclude pattern
      return !excludeSections.some(excludePattern => {
        if (excludePattern.startsWith('.')) {
          // Class selector
          return section.classList.contains(excludePattern.substring(1));
        } else if (excludePattern.startsWith('#')) {
          // ID selector
          return section.id === excludePattern.substring(1);
        } else {
          // Tag name or other selector
          return section.tagName.toLowerCase() === excludePattern.toLowerCase();
        }
      });
    });
    
    // Observe all valid sections
    validSections.forEach(section => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });
    
    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, excludeSections]);
  
  return { currentSection, currentSectionId };
};
