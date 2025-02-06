// types/particles.ts
export interface Particle {
    position: [number, number, number];
    velocity: [number, number, number];
    mass: number;
    charge: number;
    lifetime: number;
  }
  
  export interface ParticleSystemProps {
    count: number;          // Number of particles
    size: number;          // Base particle size
    color: string;         // Base particle color
    spread: number;        // How spread out particles are
    interactionRadius: number; // Distance for particle interaction
  }