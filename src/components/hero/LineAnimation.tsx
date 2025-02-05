import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LineAnimation = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    
    const lines = svgRef.current.querySelectorAll('.line');
    
    // Reset lines with higher initial opacity for visibility testing
    gsap.set(lines, { opacity: 0 });
    
    lines.forEach(line => {
      const length = (line as SVGLineElement).getTotalLength();
      gsap.set(line, {
        strokeDasharray: length,
        strokeDashoffset: length
      });
    });

    const tl = gsap.timeline({
      delay: 0.8
    });

    // Increase opacity for better visibility
    tl.to(lines, {
      opacity: 0.3, // Increased opacity
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.inOut"
    })
    .to(lines, {
      strokeDashoffset: 0,
      duration: 2,
      stagger: 0.2,
      ease: "power4.out"
    }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <svg 
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]" // Added z-index
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 100 100"
    >
      {/* Thicker lines for better visibility */}
      <line 
        className="line stroke-white"
        x1="-10" y1="20" 
        x2="45" y2="20" 
        strokeWidth="0.3" // Increased stroke width
      />
      <line 
        className="line stroke-white"
        x1="35" y1="-10" 
        x2="35" y2="45" 
        strokeWidth="0.3"
      />
      <line 
        className="line stroke-white"
        x1="110" y1="60" 
        x2="55" y2="60" 
        strokeWidth="0.3"
      />
      <line 
        className="line stroke-white"
        x1="65" y1="110" 
        x2="65" y2="55" 
        strokeWidth="0.3"
      />
    </svg>
  );
};

export default LineAnimation;