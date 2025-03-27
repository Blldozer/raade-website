
import { useEffect } from 'react';
import { useResponsive } from './useResponsive';

/**
 * Custom hook for Index page functionality
 * Centralizes initialization of page-specific state and effects
 */
export const useIndexPage = () => {
  const { isMobile, isTablet } = useResponsive();
  
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
    isTablet
  };
};

export default useIndexPage;
