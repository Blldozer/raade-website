
import { useState } from 'react';
import { useIntersectionDetection, IntersectionDetectionOptions } from './section-awareness/useIntersectionDetection';
import { useBackgroundAnalysis } from './section-awareness/useBackgroundAnalysis';
import { useScrollDirection } from './section-awareness/useScrollDirection';

/**
 * Custom hook that provides navigation state based on the current section in view
 * 
 * Features:
 * - Automatically detects which section is in view using Intersection Observer
 * - Calculates if the section has a light or dark background
 * - Tracks scroll direction to show/hide the navbar
 * - Provides a comprehensive state object for navigation styling
 * 
 * Significantly refactored for better maintainability by splitting responsibilities
 * into smaller, focused sub-hooks
 */
export function useSectionAwareNavigation(options: IntersectionDetectionOptions = {}) {
  // Use smaller, focused hooks for each responsibility
  const { currentSection, currentSectionId } = useIntersectionDetection(options);
  const { isLightBackground } = useBackgroundAnalysis(currentSection);
  const { isNavbarVisible } = useScrollDirection();
  
  // Return combined state from all hooks
  return {
    isLightBackground,
    isNavbarVisible,
    currentSection,
    currentSectionId
  };
}
