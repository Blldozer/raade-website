import { useEffect, useRef } from 'react';
import { useSectionAwareNavigation } from './navigation/useSectionAwareNavigation';

/**
 * Main hook to manage navigation background color based on current scroll position
 * This is a compositor hook that combines multiple smaller hooks for better maintainability
 * 
 * @param initialBackground - The initial background to use ('light' or 'dark')
 */
export function useNavBackground() {
  const { currentSection } = useSectionAwareNavigation();
  const prevSection = useRef(currentSection);

  useEffect(() => {
    if (currentSection !== prevSection.current) {
      prevSection.current = currentSection;
    }
  }, [currentSection]);

  return { currentSection };
}
