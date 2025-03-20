
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useAnimatedText } from './hooks/useAnimatedText';

/**
 * AnimatedText Component
 * 
 * Renders animated text in the hero section with:
 * - Fluid typography that scales consistently across all devices
 * - Improved responsive design for mobile (including Android)
 * - Animation effects with proper fallbacks for accessibility
 */
const AnimatedText = () => {
  const {
    text2Ref,
    orgNameRef,
    containerRef,
    lineWidth,
    lineOpacity
  } = useAnimatedText();

  return (
    <div className="space-y-4 md:space-y-8" ref={containerRef}>
      <h1 
        ref={orgNameRef}
        className="text-raade-gold-start text-[clamp(0.9rem,2vw,1.5rem)] font-medium tracking-wide uppercase font-alegreyasans content-fade-in"
        aria-label="Rice Association for African Development"
      >
        Rice Association for African Development
      </h1>

      <div className="relative">
        <h2 className="text-[clamp(1.75rem,6vw,4.5rem)] font-bold tracking-wide font-zillahighlight">
          <div className="text-white content-fade-in" style={{animationDelay: '100ms'}}>We can't wait for tomorrow.</div>
          <div 
            ref={text2Ref} 
            className="text-raade-gold-start content-fade-in" 
            style={{animationDelay: '300ms'}}
            aria-live="polite"
          ></div>
        </h2>
        
        <motion.div 
          style={{ 
            width: lineWidth,
            opacity: lineOpacity
          }}
          className="absolute -bottom-4 left-0 h-1 bg-raade-gold-start"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders
export default memo(AnimatedText);
