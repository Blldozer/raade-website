// src/components/particles/ParticleSystem.tsx
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';

interface ParticleData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  originalPosition: THREE.Vector3;
  charge: number;
}

export function ParticleSystem({ 
  count = 1000, 
  size = 0.1, 
  color = '#FBB03B', 
  spread = 10 
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseDown = useRef(false);
  const selectedParticle = useRef<number | null>(null);
  const particlesData = useRef<ParticleData[]>([]);
  
  const [chargeLevel, setChargeLevel] = useState(0);
  const [hoveredParticle, setHoveredParticle] = useState<number | null>(null);
  
  const { camera, raycaster } = useThree();

  // Initialize particle system
  useEffect(() => {
    // Create particles with initial positions
    particlesData.current = Array.from({ length: count }, () => {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread
      );
      return {
        position: position.clone(),
        velocity: new THREE.Vector3(),
        originalPosition: position.clone(),
        charge: 0
      };
    });

    if (pointsRef.current) {
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const baseColor = new THREE.Color(color);

      // Initialize particle positions and colors
      particlesData.current.forEach((particle, i) => {
        positions[i * 3] = particle.position.x;
        positions[i * 3 + 1] = particle.position.y;
        positions[i * 3 + 2] = particle.position.z;
        
        colors[i * 3] = baseColor.r;
        colors[i * 3 + 1] = baseColor.g;
        colors[i * 3 + 2] = baseColor.b;
      });

      pointsRef.current.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );
      pointsRef.current.geometry.setAttribute(
        'color',
        new THREE.BufferAttribute(colors, 3)
      );
    }
  }, [count, spread, color]);
  // Precise intersection testing for better interaction
  const testIntersection = useCallback((event: ThreeEvent<PointerEvent>) => {
    if (!pointsRef.current) return null;

    // Convert mouse coordinates to normalized device coordinates
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

    const positions = pointsRef.current.geometry.attributes.position;
    const threshold = size * camera.position.z * 0.02;
    let closest = null;
    let closestDistance = Infinity;

    for (let i = 0; i < positions.count; i++) {
      const particle = new THREE.Vector3(
        positions.getX(i),
        positions.getY(i),
        positions.getZ(i)
      );

      // Project to screen space
      particle.project(camera);
      
      const dx = particle.x - x;
      const dy = particle.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < threshold && distance < closestDistance) {
        closest = i;
        closestDistance = distance;
      }
    }

    return closest;
  }, [camera, raycaster, size]);

  // Handle pointer interactions
  const handlePointerDown = useCallback((event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    mouseDown.current = true;
    const intersectedParticle = testIntersection(event);
    
    if (intersectedParticle !== null) {
      selectedParticle.current = intersectedParticle;
      
      // Start charging animation
      let charge = 0;
      const chargeInterval = setInterval(() => {
        if (!mouseDown.current) {
          clearInterval(chargeInterval);
          return;
        }
        charge = Math.min(charge + 0.1, 1);
        setChargeLevel(charge);
      }, 50);
    }
  }, [testIntersection]);

  const handlePointerUp = useCallback(() => {
    if (selectedParticle.current !== null && chargeLevel > 0) {
      // Trigger explosion
      const particle = particlesData.current[selectedParticle.current];
      const force = chargeLevel * 2;
      particle.velocity.multiplyScalar(force);
    }
    mouseDown.current = false;
    selectedParticle.current = null;
    setChargeLevel(0);
  }, [chargeLevel]);

  const handlePointerMove = useCallback((event: ThreeEvent<PointerEvent>) => {
      if (!mouseDown.current) {
        const intersected = testIntersection(event);
        setHoveredParticle(intersected);
      }
    }, [testIntersection]);

  // Animation loop
  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position;
    const colors = pointsRef.current.geometry.attributes.color;
    const baseColor = new THREE.Color(color);

    // Update particles
    particlesData.current.forEach((particle, i) => {
      // Apply forces and update position
      particle.position.add(particle.velocity.multiplyScalar(delta));
      
      // Return to original position
      const toOrigin = particle.originalPosition.clone()
        .sub(particle.position)
        .multiplyScalar(0.01);
      particle.velocity.add(toOrigin);
      
      // Apply drag
      particle.velocity.multiplyScalar(0.99);

      // Update geometry
      positions.setXYZ(
        i,
        particle.position.x,
        particle.position.y,
        particle.position.z
      );

      // Update colors based on state
      const particleColor = baseColor.clone();
      if (hoveredParticle === i) {
        particleColor.multiplyScalar(1.5);
      }
      if (selectedParticle.current === i) {
        particleColor.multiplyScalar(1 + chargeLevel);
      }

      colors.setXYZ(
        i,
        particleColor.r,
        particleColor.g,
        particleColor.b
      );
    });

    positions.needsUpdate = true;
    colors.needsUpdate = true;
  });

  // Event cleanup
  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);
    return () => window.removeEventListener('pointerup', handlePointerUp);
  }, [handlePointerUp]);

 
  return (
    <points
      ref={pointsRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={new Float32Array(count * 3)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={new Float32Array(count * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}