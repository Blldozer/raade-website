
import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Using direct framer-motion import

const symbols = ['◆', '●', '■', '▲', '○', '□', '△'];

interface Particle {
  id: number;
  symbol: string;
  isLarge: boolean;
  isPopped: boolean;
}

/**
 * ParticleField Component
 * 
 * Creates interactive particle effects in the hero section with:
 * - Safely rendered animations using error-resistant motion components
 * - Responsive behavior for all device sizes
 * - Performance optimizations for mobile
 * - Graceful fallback when animations can't be used
 */
const ParticleField = () => {
  // Check for React initialization
  const isReactInitialized = typeof window !== 'undefined' && window.__REACT_INITIALIZED === true;
  if (!isReactInitialized) {
    console.warn("ParticleField: React not properly initialized, skipping render");
    return null; // Return nothing since this is a purely decorative component
  }

  const [particleCount, setParticleCount] = useState(12); // Reduced initial count
  const [particles, setParticles] = useState<Particle[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Memoize the resize handler
  const handleResize = useCallback(() => {
    setParticleCount(window.innerWidth < 768 ? 8 : 12); // Further reduced counts
  }, []);

  useEffect(() => {
    try {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    } catch (error) {
      console.error("ParticleField: Error in resize handler", error);
    }
  }, [handleResize]);

  // Memoize particle initialization
  useEffect(() => {
    try {
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        isLarge: i < particleCount * 0.3,
        isPopped: false
      }));
      setParticles(newParticles);
    } catch (error) {
      console.error("ParticleField: Error initializing particles", error);
      setParticles([]);
    }
  }, [particleCount]);

  // Memoize pop handler
  const handlePop = useCallback((id: number) => {
    try {
      setParticles(prev => 
        prev.map(p => p.id === id ? { ...p, isPopped: true } : p)
      );
      
      setTimeout(() => {
        setParticles(prev =>
          prev.map(p =>
            p.id === id ? { ...p, isPopped: false } : p
          )
        );
      }, 800);
    } catch (error) {
      console.error("ParticleField: Error in pop handler", error);
    }
  }, []);

  // Memoize particle styles
  const getParticleStyle = useCallback((particle: Particle) => ({
    fontSize: `${particle.isLarge ? 40 : 24}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    color: '#FBB03B',
    textShadow: `0 0 ${particle.isLarge ? 20 : 10}px rgba(251, 176, 59, 0.4)`,
    zIndex: 40
  }), []);

  try {
    return (
      <div className="absolute inset-0 z-30 pointer-events-auto">
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute cursor-pointer"
              style={getParticleStyle(particle)}
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
  } catch (error) {
    console.error("ParticleField: Error rendering component", error);
    return null; // Return nothing on error since this is decorative
  }
};

export default ParticleField;
