// src/components/particles/utils/rendering.ts

import * as THREE from 'three';
import { ParticleSettings } from '../types';

export function createParticleGeometry(settings: ParticleSettings) {
  const positions = new Float32Array(settings.count * 3);
  const colors = new Float32Array(settings.count * 3);
  const baseColor = new THREE.Color(settings.color);

  for (let i = 0; i < settings.count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * settings.spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * settings.spread;
    positions[i * 3 + 2] = 0;

    colors[i * 3] = baseColor.r;
    colors[i * 3 + 1] = baseColor.g;
    colors[i * 3 + 2] = baseColor.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  return geometry;
}