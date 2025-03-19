import { useState, useEffect, useRef, useCallback } from 'react';
import { isLightColor, getElementBackgroundColor } from '@/utils/colorUtils';

interface SectionObserverOptions {
  /**
   * The CSS selector for target sections to observe
   * @default 'section, .section, [data-section]'
   */
  sectionSelector?: string;
  
  /**
   * Threshold for the Intersection Observer
   * Value between 0 and 1 indicating what percentage of the target element
   * is visible before triggering a callback
   * @default 0.6
   */
  threshold?: number;
  
  /**
   * Root margin for the Intersection Observer
   * @default '0px'
   */
  rootMargin?: string;
  
  /**
   * Elements to exclude from observation (optional)
   * @default []
   */
  excludeSections?: string[];
}

interface SectionAwareNavigationState {
  /** Whether the current section has a light background */
  isLightBackground: boolean;
  
  /** Whether the navbar should be visible (based on scroll direction) */
  isNavbarVisible: boolean;
  
  /** The current section element in view */
  currentSection: Element | null;
  
  /** ID of the current section in view */
  currentSectionId: string | null;
}

/**
 * Custom hook that provides navigation state based on the current section in view
 * 
 * Features:
 * - Automatically detects which section is in view using Intersection Observer
 * - Calculates if the section has a light or dark background
 * - Tracks scroll direction to show/hide the navbar
 * - Provides a comprehensive state object for navigation styling
 */
export function useSectionAwareNavigation({
  sectionSelector = 'section, .section, [data-section]',
  threshold = 0.6,
  rootMargin = '0px',
  excludeSections = []
}: SectionObserverOptions = {}): SectionAwareNavigationState {
  // Track the current section and its background color
  const [currentSection, setCurrentSection] = useState<Element | null>(null);
  const [isLightBackground, setIsLightBackground] = useState(false);
  
  // Manage navbar visibility based on scroll direction
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  
  // Store the last scroll position to determine scroll direction
  const lastScrollY = useRef(0);
  
  // Store sections that are currently intersecting
  const intersectingSections = useRef<Map<Element, number>>(new Map());
  
  // Analyze the background color of the current section
  const analyzeSectionBackground = useCallback((section: Element | null) => {
    if (!section) return;
    
    // Default to dark background if we can't determine the color
    let lightBackground = false;
    
    try {
      const backgroundColor = getElementBackgroundColor(section as HTMLElement);
      lightBackground = isLightColor(backgroundColor);
    } catch (error) {
      console.error('Error analyzing section background:', error);
    }
    
    setIsLightBackground(lightBackground);
  }, []);
  
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
      analyzeSectionBackground(topSection);
    }
  }, [currentSection, analyzeSectionBackground, excludeSections]);
  
  // Handle scroll to control navbar visibility
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Show navbar when scrolling up, hide when scrolling down
    // But always show when at the top of the page
    if (currentScrollY <= 0) {
      setIsNavbarVisible(true);
    } else if (currentScrollY < lastScrollY.current) {
      setIsNavbarVisible(true); // Scrolling up
    } else if (currentScrollY > lastScrollY.current) {
      setIsNavbarVisible(false); // Scrolling down
    }
    
    lastScrollY.current = currentScrollY;
  }, []);
  
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
  
  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  
  // Get the current section ID (if available)
  const currentSectionId = currentSection?.id || null;
  
  return {
    isLightBackground,
    isNavbarVisible,
    currentSection,
    currentSectionId
  };
}
