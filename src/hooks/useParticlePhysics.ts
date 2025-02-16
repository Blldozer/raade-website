
// hooks/useParticlePhysics.ts
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Particle } from '../types/particles';

export function useParticlePhysics(particles: Particle[]) {
  const particlesRef = useRef(particles);
  
  // Physics constants
  const constants = useMemo(() => ({
    gravity: 0.001,
    drag: 0.02,
    maxSpeed: 0.5,
    springStrength: 0.1
  }), []);

  useFrame((state, delta) => {
    particlesRef.current.forEach(particle => {
      // Apply forces
      applyGravity(particle, constants.gravity * delta);
      applyDrag(particle, constants.drag * delta);
      
      // Update position
      particle.position[0] += particle.velocity[0] * delta;
      particle.position[1] += particle.velocity[1] * delta;
      particle.position[2] += particle.velocity[2] * delta;
      
      // Constrain speed
      const speed = Math.sqrt(
        particle.velocity[0] ** 2 + 
        particle.velocity[1] ** 2 + 
        particle.velocity[2] ** 2
      );
      
      if (speed > constants.maxSpeed) {
        const scale = constants.maxSpeed / speed;
        particle.velocity[0] *= scale;
        particle.velocity[1] *= scale;
        particle.velocity[2] *= scale;
      }
    });
  });

  return particlesRef;
}

function applyGravity(particle: Particle, gravity: number) {
  particle.velocity[1] -= gravity;
}

function applyDrag(particle: Particle, drag: number) {
  particle.velocity[0] *= (1 - drag);
  particle.velocity[1] *= (1 - drag);
  particle.velocity[2] *= (1 - drag);
}
