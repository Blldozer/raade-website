
import React from 'react';
import DraggableBlock from './DraggableBlock';

/**
 * ExplodableField Component
 * 
 * Displays a set of interactive building blocks throughout the hero area
 * that visitors can drag, stack and rebuild, representing the
 * design and build process visually.
 * 
 * - Strategically positioned elements create balanced composition
 * - Different sizes create visual hierarchy
 * - Blocks can be dragged and stacked for interactive exploration
 */
const ExplodableField = () => {
  // Blocks with different shapes, sizes and positions
  const blocks = [
    { x: '15%', y: '20%', width: 70, height: 70, color: '#FBB03B' },
    { x: '85%', y: '30%', width: 60, height: 90, color: '#FBB03B' },
    { x: '60%', y: '75%', width: 100, height: 60, color: '#FBB03B' },
    { x: '25%', y: '60%', width: 80, height: 50, color: '#FBB03B' },
    { x: '75%', y: '50%', width: 50, height: 80, color: '#FBB03B' },
  ];

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {blocks.map((block, index) => (
        <div
          key={index}
          className="absolute pointer-events-auto"
          style={{
            left: block.x,
            top: block.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <DraggableBlock 
            id={`block-${index}`}
            width={block.width}
            height={block.height}
            color={block.color}
            initialX={block.x}
            initialY={block.y}
          />
        </div>
      ))}
    </div>
  );
};

export default ExplodableField;
