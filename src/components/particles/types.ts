// src/components/particles/types.ts

import * as Matter from 'matter-js';
import * as THREE from 'three';

export interface ParticleSettings {
  count: number;
  size: number;
  color: string;
  spread: number;
}

export interface PhysicsState {
  engine: Matter.Engine;
  bodies: Matter.Body[];
}

export interface ParticleData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  color: THREE.Color;
  charge: number;
}