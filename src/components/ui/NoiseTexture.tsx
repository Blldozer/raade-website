
import React from 'react';
import { cn } from '@/lib/utils';

interface NoiseTextureProps {
  className?: string;
  opacity?: number;
  blendMode?: 'multiply' | 'screen' | 'overlay' | 'soft-light' | 'hard-light';
  scale?: number;
}

/**
 * NoiseTexture Component - Adds a subtle noise effect to enhance visual depth
 * 
 * Features:
 * - SVG-based noise that's lightweight and performant
 * - Configurable opacity, blend mode and scale
 * - Works seamlessly with glassmorphism effects
 * - Compatible with light and dark themes
 */
const NoiseTexture: React.FC<NoiseTextureProps> = ({
  className,
  opacity = 0.05,
  blendMode = 'soft-light',
  scale = 250
}) => {
  // Generate noise pattern using SVG with reduced file size
  const noiseSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${scale}" height="${scale}" viewBox="0 0 ${scale} ${scale}">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
        <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)"/>
    </svg>
  `;

  // Convert SVG to base64 for use in CSS
  const encodedSvg = btoa(noiseSvg);
  
  return (
    <div 
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        backgroundImage: `url("data:image/svg+xml;base64,${encodedSvg}")`,
        opacity: opacity,
        mixBlendMode: blendMode,
      }}
    />
  );
};

export default NoiseTexture;
