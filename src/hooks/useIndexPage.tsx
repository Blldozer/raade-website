
import React, { useEffect } from 'react';
import { useResponsive } from './useResponsive';
import { useSectionTransitions } from './useSectionTransitions';
import { useSafeHook } from '@/utils/reactContextError';

/**
 * Custom hook for Index page functionality
 * Centralizes initialization of page-specific state and effects
 * Enhanced with better React hook error handling
 */
export const useIndexPage = () => {
  // Check if React is properly initialized
  if (typeof React === 'undefined' || typeof useEffect !== 'function') {
    console.warn("useIndexPage: React hooks not available");
    return {
      isMobile: false,
      isTablet: false,
      isLowPerformanceDevice: false,
      animationsEnabled: false
    };
  }
  
  try {
    // Use responsive hook safely (it already has internal fallbacks)
    const { isMobile, isTablet } = useResponsive();
    
    // Use section transitions hook - with fallback if it fails
    let sectionTransitions = { isLowPerformanceDevice: false, animationsEnabled: false };
    try {
      sectionTransitions = useSectionTransitions();
    } catch (error) {
      console.error("useIndexPage: Error in section transitions hook:", error);
    }
    
    // Set up the document on first render
    useEffect(() => {
      // Set the title
      document.title = 'RAADE - Rice Association for African Development';
      
      // Initialize the body
      document.body.setAttribute('data-page', 'index');
      document.body.classList.add('index-page');
      
      // Clean up when unmounting
      return () => {
        document.body.removeAttribute('data-page');
        document.body.classList.remove('index-page');
      };
    }, []);
    
    return {
      isMobile,
      isTablet,
      ...sectionTransitions
    };
  } catch (error) {
    console.error("useIndexPage: Critical error:", error);
    // Return sensible defaults if the hook fails
    return {
      isMobile: false,
      isTablet: false,
      isLowPerformanceDevice: false,
      animationsEnabled: false
    };
  }
};

export default useIndexPage;
