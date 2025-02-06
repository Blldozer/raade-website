import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

interface ParticleSystemProps {
  count?: number;
  size?: number;
  color?: string;
  spread?: number;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  count = 1000,
  size = 0.1,
  color = '#FBB03B',
  spread = 10,
}) => {
  const particlesRef = useRef<THREE.Points>(null);

  // Generate random positions
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * spread;
    }
    return positions;
  }, [count, spread]);

  // Animation
  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles}
          count={particles.length / 3} // Fix: Ensure correct count
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={size} color={new THREE.Color(color)} transparent />
    </points>
  );
};

const ParticleScene = () => (
  <Canvas camera={{ position: [0, 0, 15] }}>
    <ambientLight />
    <ParticleSystem count={1000} size={0.1} color="#FBB03B" spread={10} />
  </Canvas>
);

export default ParticleSystem;