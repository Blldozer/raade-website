
import React, { memo } from 'react';
import { useAnimatedText } from './hooks/useAnimatedText';
import { motion } from '../motion/SafeMotion'; // Use our safe wrapper

/**
 * AnimatedText Component
 * 
 * Renders animated text in the hero section with:
 * - Fluid typography that scales consistently across all devices
 * - Improved responsive design for mobile (including Android)
 * - Animation effects with proper fallbacks for accessibility
 * - Enhanced error handling to prevent React context errors
 */
const AnimatedText = () => {
  // Check if we're in a React context environment by testing window flag
  const isReactInitialized = typeof window !== 'undefined' && 
    window.__REACT_INITIALIZED === true;
  
  // If React isn't properly initialized, render a static version right away
  if (!isReactInitialized) {
    console.warn("AnimatedText: React not fully initialized, rendering static version");
    return renderStaticVersion();
  }
  
  // Use a try-catch block to handle any hook errors
  try {
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
            >
              We're building it today.
            </div>
          </h2>
          
          <RenderAnimatedLine lineWidth={lineWidth} lineOpacity={lineOpacity} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("AnimatedText: Error rendering with animation hooks", error);
    return renderStaticVersion();
  }
};

// Separate component for the animated line to handle motion values safely
const RenderAnimatedLine = ({ 
  lineWidth, 
  lineOpacity 
}) => {
  try {
    return (
      <motion.div 
        style={{ 
          width: lineWidth,
          opacity: lineOpacity
        }}
        className="absolute -bottom-4 left-0 h-1 bg-raade-gold-start"
        aria-hidden="true"
      />
    );
  } catch (error) {
    console.error("AnimatedLine: Error rendering with motion", error);
    // Fallback to static line if motion fails
    return (
      <div 
        className="absolute -bottom-4 left-0 h-1 bg-raade-gold-start w-full"
        aria-hidden="true"
      />
    );
  }
};

// Static version as fallback
function renderStaticVersion() {
  return (
    <div className="space-y-4 md:space-y-8">
      <h1 
        className="text-raade-gold-start text-[clamp(0.9rem,2vw,1.5rem)] font-medium tracking-wide uppercase font-alegreyasans"
        aria-label="Rice Association for African Development"
      >
        Rice Association for African Development
      </h1>

      <div className="relative">
        <h2 className="text-[clamp(1.75rem,6vw,4.5rem)] font-bold tracking-wide font-zillahighlight">
          <div className="text-white">We can't wait for tomorrow.</div>
          <div 
            className="text-raade-gold-start"
            aria-live="polite"
          >
            We're building it today.
          </div>
        </h2>
        
        <div 
          className="absolute -bottom-4 left-0 h-1 bg-raade-gold-start w-full"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

// Memoize component to prevent unnecessary re-renders
export default memo(AnimatedText);
