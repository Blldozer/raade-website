
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useAnimatedText } from './hooks/useAnimatedText';

/**
 * AnimatedText Component
 * 
 * Renders animated text in the hero section with:
 * - Balanced typography with consistent alignment
 * - Improved text scaling across all screen sizes
 * - Consistent grid-based layout for better visual harmony
 * - Animation effects with proper accessibility considerations
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
    <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto" ref={containerRef}>
      <h1 
        ref={orgNameRef}
        className="text-raade-gold-start text-[clamp(0.9rem,2vw,1.5rem)] font-medium tracking-wide uppercase font-alegreyasans content-fade-in text-center"
        aria-label="Rice Association for African Development"
      >
        Rice Association for African Development
      </h1>

      <div className="relative">
        <h2 className="text-[clamp(1.75rem,6vw,4.5rem)] font-bold tracking-wide font-zillahighlight text-center">
          <div className="text-white content-fade-in" style={{animationDelay: '100ms'}}>We can't wait for tomorrow.</div>
          <div 
            ref={text2Ref} 
            className="text-raade-gold-start content-fade-in text-center" 
            style={{animationDelay: '300ms'}}
            aria-live="polite"
          ></div>
        </h2>
        
        <motion.div 
          style={{ 
            width: lineWidth,
            opacity: lineOpacity
          }}
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-1 bg-raade-gold-start"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders
export default memo(AnimatedText);
