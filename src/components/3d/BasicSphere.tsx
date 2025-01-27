import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { Mesh, TextureLoader, Texture } from "three";

const BasicSphere = () => {
  const meshRef = useRef<Mesh>(null!);
  const [globeTexture, setGlobeTexture] = useState<Texture | null>(null);

  useEffect(() => {
    const textureLoader = new TextureLoader();
    console.log("Loading globe texture...");
    
    textureLoader.load(
      '/assets/textures/earth-texture.jpg',
      (texture) => {
        console.log("Globe texture loaded successfully");
        setGlobeTexture(texture);
      },
      undefined,
      (error) => {
        console.error("Error loading globe texture:", error);
      }
    );
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  if (!globeTexture) {
    console.log("Waiting for globe texture...");
    return null;
  }

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        map={globeTexture}
        metalness={0.1}
        roughness={0.7}
      />
    </mesh>
  );
};

export default BasicSphere;