import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

const BasicSphere = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#1B365D" metalness={0.4} roughness={0.7} />
    </mesh>
  );
};

export default BasicSphere;