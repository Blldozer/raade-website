
import { useEffect, useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

export const useAnimatedText = () => {
  const text2Ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const orgNameRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const lineWidth = useTransform(scrollY, [0, 200], ["0%", "100%"]);
  const lineOpacity = useTransform(scrollY, [0, 200], [0, 1]);

  useEffect(() => {
    const tl = gsap.timeline();
    
    if (text2Ref.current && orgNameRef.current) {
      gsap.set(text2Ref.current, {
        opacity: 1,
        text: ""
      });
      
      gsap.set(orgNameRef.current, { opacity: 1 });

      tl.to(text2Ref.current, {
        duration: 3,
        text: "We're building it today.",
        ease: "none"
      })
      .to(orgNameRef.current, {
        keyframes: [
          { x: -2, duration: 0.1 },
          { x: 2, duration: 0.1 },
          { x: -2, duration: 0.1 },
          { x: 2, duration: 0.1 },
          { x: 0, duration: 0.1 }
        ],
        ease: "none"
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  return {
    text2Ref,
    lineRef,
    orgNameRef,
    containerRef,
    lineWidth,
    lineOpacity
  };
};

export default useAnimatedText;
