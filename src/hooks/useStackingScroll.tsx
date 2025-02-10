
import { useEffect, useRef } from 'react';

interface StackingScrollOptions {
  threshold?: number[];
  rootMargin?: string;
  index?: number;
}

export const useStackingScroll = (options: StackingScrollOptions = {}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (section.classList.contains('future-showcase-section')) {
            return; // Skip transform for this section
          }
          
          // Reverse the transform direction for proper stacking
          const scrollProgress = entry.intersectionRatio;
          section.style.transform = `translateY(${(1 - scrollProgress) * -100}%)`;
          section.style.opacity = `${scrollProgress}`;
        });
      },
      {
        threshold: Array.from({ length: 100 }, (_, i) => i / 100),
        rootMargin: options.rootMargin || "0px",
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [options]);

  return sectionRef;
};
