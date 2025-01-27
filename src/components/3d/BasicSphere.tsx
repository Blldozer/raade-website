import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

const BasicSphere = () => {
  const meshRef = useRef<Mesh>(null!);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshNormalMaterial />
    </mesh>
  );
};

export default BasicSphere;