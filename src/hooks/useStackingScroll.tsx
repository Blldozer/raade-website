
import { useEffect, useRef } from 'react';

interface StackingScrollOptions {
  threshold?: number[];
  rootMargin?: string;
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
          
          const scrollProgress = 1 - entry.intersectionRatio;
          section.style.transform = `translateY(${scrollProgress * 100}%)`;
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
