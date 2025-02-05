
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// African-inspired symbols
const symbols = ['◆', '●', '■', '▲', '○', '□', '△'];

const ParticleField = () => {
  const [particleCount, setParticleCount] = useState(20);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setParticleCount(window.innerWidth < 768 ? 12 : 20);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(particleCount)].map((_, i) => {
        const isLarge = i < particleCount * 0.3;
        const size = isLarge ? 40 : 24;
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        return (
          <motion.div
            key={i}
            className="absolute cursor-grab active:cursor-grabbing"
            style={{
              fontSize: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              color: '#FBB03B',
              textShadow: `0 0 ${isLarge ? 20 : 10}px rgba(251, 176, 59, 0.4)`,
              pointerEvents: 'auto'
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, isLarge ? 0.3 : 0.15, 0],
              scale: [0.8, 1.2, 0.8],
              x: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
              ],
              y: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
              ],
              rotate: [0, 360]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}
            whileHover={{
              scale: 1.2,
              opacity: 1,
              transition: { duration: 0.2 }
            }}
            onHoverStart={() => setHoveredId(i)}
            onHoverEnd={() => setHoveredId(null)}
          >
            {symbol}
            {hoveredId === i && (
              <div className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap bottom-full mb-2 px-2 py-1 text-xs bg-black/75 text-white rounded opacity-100 pointer-events-none">
                Click and drag me!
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ParticleField;
