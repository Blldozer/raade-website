import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";

const BasicSphere = () => {
  const meshRef = useRef<Mesh>(null!);
  const [isReady, setIsReady] = useState(false);

  console.log("BasicSphere component rendering, ready state:", isReady);

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
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#2a4774" roughness={0.5} metalness={0.5} />
    </mesh>
  );
};

export default BasicSphere;