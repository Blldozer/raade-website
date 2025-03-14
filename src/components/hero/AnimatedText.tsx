import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useAnimatedText } from './hooks/useAnimatedText';

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
        className="text-raade-gold-start text-base sm:text-lg md:text-2xl font-medium tracking-wide uppercase font-alegreyasans content-fade-in"
        aria-label="Rice Association for African Development"
      >
        Rice Association for African Development
      </h1>

      <div className="relative">
        <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide font-zillahighlight">
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
