import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

interface ExplodableElementProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  particleCount?: number;
  children?: React.ReactNode;
}

const ExplodableElement: React.FC<ExplodableElementProps> = ({
  x,
  y,
  width,
  height,
  color = '#FBB03B', // RAADE gold as default
  particleCount = 10,
  children
}) => {
  // Refs for canvas and animation frame
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  
  // Physics engine instances
  const engineRef = useRef<Matter.Engine>();
  const renderRef = useRef<Matter.Render>();
  
  // Track explosion state
  const [isExploding, setIsExploding] = useState(false);
  
  // Initialize physics engine and renderer
  useEffect(() => {
    if (!canvasRef.current) return;

    // Create engine and world
    const engine = Matter.Engine.create();
    engineRef.current = engine;

    // Create renderer
    const render = Matter.Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent'
      }
    });
    renderRef.current = render;

    // Start the renderer
    Matter.Render.run(render);

    // Animation loop
    const animate = () => {
      Matter.Engine.update(engine);
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
    };
  }, [width, height]);

  // Handle explosion effect
  const handleExplode = () => {
    if (!engineRef.current || isExploding) return;
    setIsExploding(true);

    // Create particles
    const particles = Array.from({ length: particleCount }).map(() => {
      const particle = Matter.Bodies.circle(
        x + width / 2 + (Math.random() - 0.5) * 10,
        y + height / 2 + (Math.random() - 0.5) * 10,
        Math.random() * 5 + 2,
        {
          render: {
            fillStyle: color
          }
        }
      );

      // Add random velocity
      Matter.Body.setVelocity(particle, {
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10
      });

      return particle;
    });

    // Add particles to world
    Matter.World.add(engineRef.current.world, particles);

    // Reset after animation
    setTimeout(() => {
      if (engineRef.current) {
        Matter.World.clear(engineRef.current.world, true);
        setIsExploding(false);
      }
    }, 2000);
  };

  return (
    <div 
      className="relative"
      style={{ width, height }}
      onMouseEnter={handleExplode}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 pointer-events-none"
        width={width}
        height={height}
      />
      <div className={`transition-opacity duration-300 ${isExploding ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </div>
  );
};

export default ExplodableElement;