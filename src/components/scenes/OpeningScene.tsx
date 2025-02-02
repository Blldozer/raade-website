import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';


const OpeningScene = ({ onComplete }: { onComplete?: () => void }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => onComplete?.()
    });

    gsap.set([textRef.current, '.raade-symbol'], { opacity: 0, y: 20 });
    
    tl.to('.raade-symbol', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out"
    })
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out"
    }, "-=0.8")
    .to({}, { duration: 1.5 })
    .to(overlayRef.current, {
      background: "linear-gradient(45deg, #1A365D, #0A1829)",
      opacity: 1,
      duration: 1.2,
      ease: "power2.inOut"
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(to bottom right, #000000, #1A365D)"
      }}
    >
      <div ref={textRef} className="text-center">
        {/* Container for logo and text alignment */}
        <div className="flex items-start gap-8">
          {/* Logo container - height matches text container */}
          <div className="h-[200px] flex items-center">
            
          </div>
          
          {/* Text container with fixed width for alignment */}
          <div className="w-[800px]">
            <h1 className="text-8xl font-bold text-white mb-6 tracking-[0.5em] !leading-none">
              RAADE
            </h1>
            <p className="text-base uppercase tracking-[0.385em] text-white/90 !leading-none">
              RICE ASSOCIATION FOR AFRICAN DEVELOPMENT
            </p>
          </div>
        </div>
      </div>
      
      <div 
        ref={overlayRef}
        className="absolute inset-0 opacity-0"
        style={{
          background: "linear-gradient(45deg, #1A365D, #000)"
        }}
      />
    </div>
  );
};

export default OpeningScene;