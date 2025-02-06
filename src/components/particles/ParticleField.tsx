// src/components/particles/ParticleField.tsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ParticleSystem } from './ParticleSystem';

export function ParticleField() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        dpr={[1, 2]}
        style={{ background: '#1A365D' }}
      >
        <Suspense fallback={null}>
          <ParticleSystem 
            count={1000}
            size={0.1}
            color="#FBB03B"
            spread={10}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}