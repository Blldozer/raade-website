
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
          const scrollProgress = entry.intersectionRatio;
          
          // Special handling for hero section
          if (section.id === 'hero') {
            section.style.transform = 'translateY(0)';
            section.style.opacity = '1';
            return;
          }
          
          // For all other sections
          if (!entry.isIntersecting && scrollProgress === 0) {
            section.style.transform = `translateY(100%)`;
            section.style.opacity = '0';
          } else {
            section.style.transform = `translateY(${(1 - scrollProgress) * 100}%)`;
            section.style.opacity = `${scrollProgress}`;
          }
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
