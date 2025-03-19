
import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';

/**
 * A lightweight text typing effect implementation that handles special characters properly
 * 
 * @param text - The text to be displayed character by character
 * @param speed - The speed of typing in milliseconds
 * @returns Object containing the display text and completion status
 */
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
        // Use slice instead of concatenation to handle special characters better
        setDisplayText(text.slice(0, i + 1));
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

/**
 * Hook that manages animated text transitions and scroll-based animations
 * Used in the hero section to create engaging text effects
 */
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
  
  // Ensure we're using the full "We're" text
  const animatedText = "We're building it today.";
  console.log("AnimatedText content:", animatedText); // For debugging
  
  // Use our custom lightweight typing effect
  const { displayText, isComplete } = useTypingEffect(animatedText, 80);
  
  useEffect(() => {
    // Apply text content when typing is complete
    if (text2Ref.current) {
      text2Ref.current.textContent = displayText;
      console.log("Updated text content:", displayText); // For debugging
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
