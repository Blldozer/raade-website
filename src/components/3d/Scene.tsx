import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

const Scene: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full h-[600px] relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: '#f0f0f0' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;