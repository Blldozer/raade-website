
import { useState, useEffect, useRef } from 'react';
import { throttle } from './useNavBackgroundUtils';

interface SectionPosition {
  top: number;
  bottom: number;
  background: string;
}

/**
 * Hook to calculate and cache section positions for efficient background detection
 * Prevents recalculating positions on every scroll event
 */
export const useSectionPositions = () => {
  const [sectionPositions, setSectionPositions] = useState<SectionPosition[]>([]);
  const isMounted = useRef(true);
  
  // Calculate all section positions
  const calculateSectionPositions = () => {
    try {
      if (!isMounted.current) return;
      
      const positions: SectionPosition[] = [];
      document.querySelectorAll('section, div[data-background]').forEach(section => {
        const rect = section.getBoundingClientRect();
        const scrollY = window.scrollY;
        positions.push({
          top: rect.top + scrollY,
          bottom: rect.bottom + scrollY,
          background: section.getAttribute('data-background') || 'light'
        });
      });
      
      setSectionPositions(positions);
    } catch (error) {
      console.error('Error calculating section positions:', error);
    }
  };
  
  // Calculate initial positions and update on resize
  useEffect(() => {
    // Initial calculation
    calculateSectionPositions();
    
    // Recalculate on resize but throttle to avoid performance issues
    const handleResize = throttle(() => {
      if (!isMounted.current) return;
      calculateSectionPositions();
    }, 200);

    window.addEventListener('resize', handleResize);
    
    return () => {
      isMounted.current = false;
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return { sectionPositions, calculateSectionPositions };
};
