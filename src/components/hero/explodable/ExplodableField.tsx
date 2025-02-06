import React from 'react';
import ExplodableElement from './ExplodableElement';

const ExplodableField = () => {
  // These positions create a subtle triangular composition
  const elements = [
    { x: '15%', y: '20%', size: 80 },
    { x: '85%', y: '30%', size: 60 },
    { x: '60%', y: '75%', size: 70 },
  ];

  return (
    <div className="absolute inset-0 z-20 pointer-events-auto">
      {elements.map((element, index) => (
        <div
          key={index}
          className="absolute"
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
              `}
            />
          </ExplodableElement>
        </div>
      ))}
    </div>
  );
};

export default ExplodableField;