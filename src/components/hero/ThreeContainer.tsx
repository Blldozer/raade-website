// components/hero/ThreeContainer.tsx
import { Canvas } from '@react-three/fiber';
import { Suspense, ReactNode } from 'react';

export function ThreeContainer({ children }: { children: ReactNode }) {
  return (
    <Canvas className="absolute inset-0" camera={{ position: [0, 0, 5] }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {children}
      </Suspense>
    </Canvas>
  );
}