import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import * as THREE from "three";

// Fallback component when 3D context fails
const FallbackComponent = () => (
  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
    <div className="text-center p-4">
      <h3 className="text-lg font-semibold text-gray-800">3D Visualization Unavailable</h3>
      <p className="text-sm text-gray-600">Please try refreshing the page</p>
    </div>
  </div>
);

// Loading component while 3D context initializes
const LoadingComponent = () => (
  <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
    <div className="text-center p-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-raade-navy mx-auto mb-4"></div>
      <p className="text-sm text-gray-600">Loading 3D Environment...</p>
    </div>
  </div>
);

const Scene: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCanvasReady, setCanvasReady] = useState(false);
  
  console.log("Scene component rendering, Canvas ready:", isCanvasReady);

  return (
    <div className="w-full h-[600px] relative">
      <ErrorBoundary
        FallbackComponent={FallbackComponent}
        onError={(error) => {
          console.error("Error in 3D Scene:", error);
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ background: '#f0f0f0' }}
          onCreated={() => {
            console.log("Canvas created successfully");
            setCanvasReady(true);
          }}
        >
          <Suspense fallback={<primitive object={new THREE.Object3D()} />}>
            {isCanvasReady && (
              <>
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
              </>
            )}
          </Suspense>
        </Canvas>
      </ErrorBoundary>
      {!isCanvasReady && <LoadingComponent />}
    </div>
  );
};

export default Scene;