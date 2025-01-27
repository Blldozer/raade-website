import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";

const BasicSphere = () => {
  const meshRef = useRef<Mesh>(null!);
  const [isReady, setIsReady] = useState(false);

  console.log("BasicSphere component rendering, ready state:", isReady);

  // Safe animation frame handling
  useFrame(() => {
    if (meshRef.current && isReady) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh 
      ref={meshRef}
      onAfterRender={() => {
        if (!isReady) {
          console.log("Sphere mesh initialized successfully");
          setIsReady(true);
        }
      }}
    >
      <sphereGeometry args={[1, 16, 16]} />
      <meshNormalMaterial />
    </mesh>
  );
};

export default BasicSphere;