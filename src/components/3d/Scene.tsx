import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

const Scene: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full h-[600px] relative">
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            minDistance={3}
            maxDistance={8}
          />
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;