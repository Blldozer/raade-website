
import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';

// A lightweight text typing effect without GSAP
const useTypingEffect = (text: string, speed: number = 80) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Skip animation if user prefers reduced motion
      setDisplayText(text);
      setIsComplete(true);
      return;
    }
    
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
        setIsComplete(true);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed]);
  
  return { displayText, isComplete };
};

export const useAnimatedText = () => {
  const text2Ref = useRef<HTMLDivElement>(null);
  const orgNameRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use native scrolling for better performance
  const { scrollY } = useScroll({
    // Use default options for better TypeScript compatibility
  });
  
  // Transform values based on scroll position
  const lineWidth = useTransform(scrollY, [0, 200], ["0%", "100%"]);
  const lineOpacity = useTransform(scrollY, [0, 200], [0, 1]);
  
  // Use our custom lightweight typing effect - Fixed the typo by writing the full "We're"
  const { displayText, isComplete } = useTypingEffect("We're building it today.", 80);
  
  useEffect(() => {
    // Apply text content when typing is complete
    if (text2Ref.current) {
      text2Ref.current.textContent = displayText;
    }
    
    // Simple shake animation when typing completes
    if (isComplete && orgNameRef.current) {
      const element = orgNameRef.current;
      
      // Check if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;
      
      // Use a simple CSS animation instead of GSAP
      element.classList.add('shake-animation');
      
      // Remove animation class after it completes
      const removeAnimation = () => {
        element.classList.remove('shake-animation');
      };
      
      element.addEventListener('animationend', removeAnimation, { once: true });
      
      return () => {
        element.removeEventListener('animationend', removeAnimation);
      };
    }
  }, [displayText, isComplete]);
  
  return {
    text2Ref,
    orgNameRef,
    containerRef,
    lineWidth,
    lineOpacity
  };
};

export default useAnimatedText;
