import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const symbols = ['◆', '●', '■', '▲', '○', '□', '△'];

interface PopParticle {
  angle: number;
  speed: number;
  size: number;
  rotation: number;
  lifetime: number;
}

interface Particle {
  id: number;
  symbol: string;
  isLarge: boolean;
  isPopped: boolean;
  chargeLevel: number;
  popParticles?: PopParticle[];
}

const ParticleField = () => {
  const [particleCount, setParticleCount] = useState(20);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const chargeTimerRef = useRef<number | null>(null);
  const mouseDownRef = useRef(false);
  const clickTimeoutRef = useRef<number | null>(null);

  // Responsive particle count management
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const count = width < 768 ? 12 : width < 1024 ? 16 : 20;
      setParticleCount(count);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize particles
  useEffect(() => {
    setParticles([...Array(particleCount)].map((_, i) => ({
      id: i,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      isLarge: i < particleCount * 0.3,
      isPopped: false,
      chargeLevel: 0
    })));
  }, [particleCount]);

  const startCharging = useCallback((id: number) => {
    mouseDownRef.current = true;
    
    // Set a timeout to distinguish between click and hold
    clickTimeoutRef.current = window.setTimeout(() => {
      const chargeInterval = setInterval(() => {
        if (!mouseDownRef.current) {
          clearInterval(chargeInterval);
          return;
        }
        
        setParticles(prev => 
          prev.map(p => p.id === id ? {
            ...p,
            chargeLevel: Math.min(p.chargeLevel + 0.1, 1)
          } : p)
        );
      }, 50);
      
      chargeTimerRef.current = chargeInterval as unknown as number;
    }, 200); // Wait 200ms to determine if it's a hold
  }, []);

  const releaseCharge = useCallback((id: number) => {
    mouseDownRef.current = false;
    if (chargeTimerRef.current) {
      clearInterval(chargeTimerRef.current);
    }
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    setParticles(prev => {
      const particle = prev.find(p => p.id === id);
      if (!particle) return prev;

      const chargeLevel = particle.chargeLevel;
      
      // Quick click = basic pop, Hold = charged pop
      const isQuickClick = chargeLevel === 0;
      const numParticles = isQuickClick ? 8 : Math.floor(chargeLevel * 20) + 8;
      const baseSpeed = isQuickClick ? 15 : chargeLevel * 40 + 15;

      const popParticles = [...Array(numParticles)].map(() => ({
        angle: Math.random() * Math.PI * 2,
        speed: baseSpeed + (Math.random() * 10 - 5),
        size: Math.random() * 2 + (chargeLevel * 2),
        rotation: Math.random() * 720 - 360,
        lifetime: isQuickClick ? 0.3 : 0.2 + (chargeLevel * 0.5) + (Math.random() * 0.3)
      }));

      return prev.map(p => p.id === id ? {
        ...p,
        isPopped: true,
        popParticles,
        chargeLevel: 0
      } : p);
    });

    // Respawn particle after animation
    setTimeout(() => {
      setParticles(prev =>
        prev.map(p =>
          p.id === id ? {
            ...p,
            isPopped: false,
            symbol: symbols[Math.floor(Math.random() * symbols.length)],
            popParticles: undefined
          } : p
        )
      );
    }, 800);
  }, []);

  return (
    <div className="absolute inset-0 z-30 pointer-events-auto">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              zIndex: 40
            }}
            animate={{
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
            <motion.div
              className="relative cursor-pointer inline-flex items-center justify-center"
              style={{
                width: particle.isLarge ? '40px' : '24px',
                height: particle.isLarge ? '40px' : '24px',
              }}
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 }
              }}
              onMouseDown={() => startCharging(particle.id)}
              onMouseUp={() => releaseCharge(particle.id)}
              onMouseLeave={() => {
                if (mouseDownRef.current) {
                  releaseCharge(particle.id);
                }
              }}
              onHoverStart={() => setHoveredId(particle.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              <motion.span 
                className="pointer-events-none"
                style={{
                  fontSize: `${particle.isLarge ? 40 : 24}px`,
                  color: '#FBB03B',
                  textShadow: `0 0 ${particle.isLarge ? 20 : 10}px rgba(251, 176, 59, ${0.4 + particle.chargeLevel * 0.6})`,
                }}
                animate={{
                  scale: 1 + particle.chargeLevel * 0.5,
                  opacity: particle.isPopped ? 0 : (particle.isLarge ? 0.3 : 0.15) + particle.chargeLevel * 0.85
                }}
              >
                {particle.symbol}
              </motion.span>

              {/* Charge indicator */}
              {particle.chargeLevel > 0 && (
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    border: '2px solid #FBB03B',
                    opacity: particle.chargeLevel
                  }}
                  animate={{
                    scale: 1 + particle.chargeLevel * 0.3
                  }}
                />
              )}

              {/* Tooltip */}
              {hoveredId === particle.id && window.innerWidth >= 768 && (
                <div className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap bottom-full mb-2 px-2 py-1 text-xs bg-black/75 text-white rounded opacity-100 pointer-events-none">
                  Click or hold to pop!
                </div>
              )}

              {/* Pop effect particles */}
              {particle.isPopped && particle.popParticles && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ scale: 1 }}
                  animate={{
                    scale: [1, 2],
                    opacity: [1, 0],
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {particle.popParticles.map((popParticle, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-[#FBB03B] rounded-full pointer-events-none"
                      initial={{ 
                        x: 0, 
                        y: 0,
                        scale: popParticle.size
                      }}
                      animate={{
                        x: Math.cos(popParticle.angle) * popParticle.speed,
                        y: Math.sin(popParticle.angle) * popParticle.speed,
                        rotate: popParticle.rotation,
                        opacity: 0,
                      }}
                      transition={{ 
                        duration: popParticle.lifetime,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ParticleField;