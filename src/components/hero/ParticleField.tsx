import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// African-inspired symbols
const symbols = ['◆', '●', '■', '▲', '○', '□', '△'];

const ParticleField = () => {
  const [particleCount, setParticleCount] = useState(20);

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
            className="absolute text-[#FBB03B] opacity-0"
            style={{
              fontSize: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              textShadow: `0 0 ${isLarge ? 20 : 10}px rgba(251, 176, 59, 0.4)`
            }}
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
          >
            {symbol}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ParticleField;