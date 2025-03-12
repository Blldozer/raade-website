
import { useEffect } from 'react';
import gsap from 'gsap';

export const useContentAnimation = (contentRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (!contentRef.current) return;
    
    const tl = gsap.timeline();
    
    tl.fromTo(contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1 }
    );
    
    return () => {
      tl.kill();
    };
  }, [contentRef]);
};

export default useContentAnimation;
