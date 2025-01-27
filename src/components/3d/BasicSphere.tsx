import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { Mesh, TextureLoader } from "three";

const BasicSphere = () => {
  const meshRef = useRef<Mesh>(null!);
  const [isReady, setIsReady] = useState(false);
  const [globeTexture, setGlobeTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const textureLoader = new TextureLoader();
    textureLoader.load(
      // Using a basic Earth texture map
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
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

  console.log("BasicSphere component rendering, ready state:", isReady);

  useFrame(() => {
    if (meshRef.current && isReady) {
      meshRef.current.rotation.y += 0.001; // Slower initial rotation
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
      <sphereGeometry args={[2, 64, 64]} /> {/* Increased size and segments for better detail */}
      <meshStandardMaterial 
        map={globeTexture}
        metalness={0.1}
        roughness={0.7}
      />
    </mesh>
  );
};

export default BasicSphere;