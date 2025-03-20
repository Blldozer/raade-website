
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * DraggableBlock Component
 * 
 * An interactive block that can be dragged around the screen and stacked with other blocks.
 * When blocks are stacked, they move together as a unit.
 * 
 * - Uses Framer Motion for smooth drag interactions
 * - Implements collision detection for stacking behavior
 * - Supports different shapes and sizes
 * 
 * @param {string} id - Unique identifier for the block
 * @param {number} width - Block width
 * @param {number} height - Block height
 * @param {string} color - Block color
 * @param {string} initialX - Initial X position
 * @param {string} initialY - Initial Y position
 */
interface DraggableBlockProps {
  id: string;
  width: number;
  height: number;
  color: string;
  initialX: string;
  initialY: string;
}

// For collision detection and stacking
interface BlockRegistry {
  [key: string]: {
    element: HTMLElement;
    stackId: string;
    parentStack: string | null;
  };
}

// Global registry of all blocks for stacking behavior
const blockRegistry: BlockRegistry = {};
const stackGroups: { [key: string]: string[] } = {};

const DraggableBlock: React.FC<DraggableBlockProps> = ({
  id,
  width,
  height,
  color,
  initialX,
  initialY
}) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [stackId, setStackId] = useState<string>(id);
  const [parentStack, setParentStack] = useState<string | null>(null);
  
  // Register this block in the global registry when mounted
  useEffect(() => {
    if (blockRef.current) {
      blockRegistry[id] = {
        element: blockRef.current,
        stackId,
        parentStack: null
      };
      
      // Initialize this block's stack group
      if (!stackGroups[stackId]) {
        stackGroups[stackId] = [id];
      }
    }
    
    return () => {
      // Cleanup on unmount
      delete blockRegistry[id];
      if (stackGroups[stackId]) {
        stackGroups[stackId] = stackGroups[stackId].filter(blockId => blockId !== id);
        if (stackGroups[stackId].length === 0) {
          delete stackGroups[stackId];
        }
      }
    };
  }, [id, stackId]);
  
  // Check for collision with other blocks
  const checkCollision = (blockA: HTMLElement, blockB: HTMLElement) => {
    const rectA = blockA.getBoundingClientRect();
    const rectB = blockB.getBoundingClientRect();
    
    return !(
      rectA.right < rectB.left ||
      rectA.left > rectB.right ||
      rectA.bottom < rectB.top ||
      rectA.top > rectB.bottom
    );
  };
  
  // Handle stacking blocks when they overlap
  const stackBlocks = (sourceId: string, targetId: string) => {
    const sourceStackId = blockRegistry[sourceId].stackId;
    const targetStackId = blockRegistry[targetId].stackId;
    
    // Don't stack if they're already in the same stack
    if (sourceStackId === targetStackId) return;
    
    // Get all blocks in the source stack
    const sourceStack = stackGroups[sourceStackId];
    
    // Merge source stack into target stack
    sourceStack.forEach(blockId => {
      blockRegistry[blockId].stackId = targetStackId;
      blockRegistry[blockId].parentStack = targetId;
      stackGroups[targetStackId].push(blockId);
    });
    
    // Update this block's stack properties
    setStackId(targetStackId);
    setParentStack(targetId);
    
    // Clean up empty source stack
    delete stackGroups[sourceStackId];
  };
  
  const onDragEnd = () => {
    if (!blockRef.current) return;
    
    // Check for collisions with other blocks
    Object.entries(blockRegistry).forEach(([otherBlockId, otherBlock]) => {
      if (otherBlockId !== id && otherBlock.element) {
        if (checkCollision(blockRef.current!, otherBlock.element)) {
          stackBlocks(id, otherBlockId);
        }
      }
    });
  };
  
  return (
    <motion.div
      ref={blockRef}
      drag
      dragMomentum={false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      onDragEnd={onDragEnd}
      onDrag={(e, info) => {
        // Move all blocks in the same stack
        if (parentStack === null && stackGroups[stackId]) {
          stackGroups[stackId].forEach(blockId => {
            if (blockId !== id && blockRegistry[blockId]) {
              const blockElement = blockRegistry[blockId].element;
              if (blockElement) {
                // Apply the same motion to stacked blocks
                blockElement.style.transform = 
                  blockElement.style.transform + 
                  ` translate(${info.delta.x}px, ${info.delta.y}px)`;
              }
            }
          });
        }
      }}
      className="cursor-grab active:cursor-grabbing"
      whileDrag={{ scale: 1.02 }}
      style={{
        width,
        height,
        backgroundColor: `${color}20`,
        backdropFilter: 'blur(4px)',
        borderRadius: '4px',
        border: `2px solid ${color}70`,
        touchAction: 'none',
        zIndex: 10,
        position: 'relative',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}
    />
  );
};

export default DraggableBlock;
