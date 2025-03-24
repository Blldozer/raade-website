
import { useState, useEffect } from 'react';

interface BackgroundDetectionProps {
  initialBackground: 'light' | 'dark';
  sectionPositions: Array<{
    top: number;
    bottom: number;
    background: string;
  }>;
}

/**
 * Hook to detect which section background should be active based on scroll position
 * @param props - Configuration properties
 */
export const useBackgroundDetection = (props: BackgroundDetectionProps) => {
  const { initialBackground, sectionPositions } = props;
  const [currentBackground, setCurrentBackground] = useState<'light' | 'dark'>(initialBackground);

  useEffect(() => {
    const handleScroll = () => {
      try {
        const scrollY = window.scrollY;
        let newBackground = initialBackground;
        
        // Find which section we're currently in based on scroll position
        sectionPositions.forEach(section => {
          if (scrollY >= section.top && scrollY < section.bottom) {
            newBackground = section.background as 'light' | 'dark';
          }
        });
        
        // Update if changed
        if (newBackground !== currentBackground) {
          setCurrentBackground(newBackground);
          document.body.setAttribute('data-nav-background', newBackground);
        }
      } catch (error) {
        console.error("Error detecting background:", error);
      }
    };
    
    // Initial check
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initialBackground, sectionPositions, currentBackground]);
  
  return { currentBackground };
};
