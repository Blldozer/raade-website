
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const symbols = ['◆', '●', '■', '▲', '○', '□', '△'];

interface Particle {
  id: number;
  symbol: string;
  isLarge: boolean;
  isPopped: boolean;
}

const ParticleField = () => {
  const [particleCount, setParticleCount] = useState(20);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setParticleCount(window.innerWidth < 768 ? 12 : 20);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setParticles([...Array(particleCount)].map((_, i) => ({
      id: i,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      isLarge: i < particleCount * 0.3,
      isPopped: false
    })));
  }, [particleCount]);

  const handlePop = (id: number) => {
    setParticles(prev => 
      prev.map(p => p.id === id ? { ...p, isPopped: true } : p)
    );
    
    // Respawn particle after animation
    setTimeout(() => {
      setParticles(prev =>
        prev.map(p =>
          p.id === id ? { ...p, isPopped: false } : p
        )
      );
    }, 800);
  };

  return (
    <div className="absolute inset-0 z-30 pointer-events-auto">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute cursor-pointer"
            style={{
              fontSize: `${particle.isLarge ? 40 : 24}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              color: '#FBB03B',
              textShadow: `0 0 ${particle.isLarge ? 20 : 10}px rgba(251, 176, 59, 0.4)`,
              zIndex: 40
            }}
            initial={{ opacity: 0 }}
            animate={
              particle.isPopped 
                ? {
                    scale: [1, 1.4, 0],
                    opacity: [1, 1, 0],
                  }
                : {
                    opacity: [0, particle.isLarge ? 0.3 : 0.15, 0],
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
                  }
            }
            transition={
              particle.isPopped
                ? {
                    duration: 0.4,
                    ease: "easeOut"
                  }
                : {
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 5,
                  }
            }
            onClick={() => handlePop(particle.id)}
            whileHover={{
              scale: 1.2,
              opacity: 1,
              transition: { duration: 0.2 }
            }}
            onHoverStart={() => setHoveredId(particle.id)}
            onHoverEnd={() => setHoveredId(null)}
          >
            {particle.symbol}
            {hoveredId === particle.id && (
              <div className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap bottom-full mb-2 px-2 py-1 text-xs bg-black/75 text-white rounded opacity-100 pointer-events-none">
                Click me!
              </div>
            )}
            
            {/* Pop effect particles */}
            {particle.isPopped && (
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 2],
                  opacity: [1, 0],
                }}
                transition={{ duration: 0.3 }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-[#FBB03B] rounded-full"
                    initial={{ x: 0, y: 0 }}
                    animate={{
                      x: Math.cos(i * 60 * Math.PI / 180) * 20,
                      y: Math.sin(i * 60 * Math.PI / 180) * 20,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ParticleField;
