
import React from 'react';
import ExplodableElement from './ExplodableElement';

/**
 * ExplodableField Component
 * 
 * Displays a set of interactive building blocks throughout the hero area
 * that visitors can click to "explode" and rebuild, representing the
 * design and build process visually.
 * 
 * - Strategically positioned elements create balanced composition
 * - Different sizes create visual hierarchy
 * - Interactive elements encourage exploration
 */
const ExplodableField = () => {
  // These positions create a balanced triangular composition
  const elements = [
    { x: '15%', y: '20%', size: 80 },
    { x: '85%', y: '30%', size: 60 },
    { x: '60%', y: '75%', size: 70 },
    { x: '25%', y: '60%', size: 50 },
    { x: '75%', y: '50%', size: 40 },
  ];

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {elements.map((element, index) => (
        <div
          key={index}
          className="absolute pointer-events-auto"
          style={{
            left: element.x,
            top: element.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <ExplodableElement
            x={0}
            y={0}
            width={element.size}
            height={element.size}
            color="#FBB03B"
            particleCount={12}
          >
            <div 
              className={`
                w-full h-full rounded-full 
                bg-gradient-to-br from-[#FBB03B]/20 to-[#FBB03B]/10
                backdrop-blur-sm border border-[#FBB03B]/30 
                cursor-pointer transition-all duration-300
                hover:border-[#FBB03B]/50 hover:from-[#FBB03B]/30 hover:to-[#FBB03B]/20
                flex items-center justify-center
              `}
            >
              <div className="text-white/70 text-lg font-bold hover:text-white/90 transition-colors">
                {index % 3 === 0 ? 'D' : index % 3 === 1 ? 'B' : 'S'}
              </div>
            </div>
          </ExplodableElement>
        </div>
      ))}
    </div>
  );
};

export default ExplodableField;
