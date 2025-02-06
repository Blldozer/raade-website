// src/components/particles/utils/physics.ts

import * as Matter from 'matter-js';
import { ParticleSettings } from '../types';

export function createPhysicsEngine(settings: ParticleSettings) {
  const engine = Matter.Engine.create({
    gravity: { x: 0, y: 0, scale: 0 }
  });

  const bodies = Array.from({ length: settings.count }, () => {
    const x = (Math.random() - 0.5) * settings.spread;
    const y = (Math.random() - 0.5) * settings.spread;
    
    return Matter.Bodies.circle(
      x + settings.spread/2,
      y + settings.spread/2,
      settings.size * 10,
      {
        friction: 0,
        frictionAir: 0.02,
        restitution: 0.8,
        render: { visible: false }
      }
    );
  });

  Matter.World.add(engine.world, bodies);
  return { engine, bodies };
}

export function createExplosion(
  bodies: Matter.Body[],
  centerIndex: number,
  force: number,
  spread: number
) {
  const centerBody = bodies[centerIndex];
  if (!centerBody) return;

  bodies.forEach((body, i) => {
    if (i === centerIndex) return;

    const distance = Matter.Vector.magnitude(
      Matter.Vector.sub(body.position, centerBody.position)
    );

    if (distance < spread) {
      const forceMagnitude = (1 - distance/spread) * force * 0.05;
      const forceVector = Matter.Vector.mult(
        Matter.Vector.normalise(
          Matter.Vector.sub(body.position, centerBody.position)
        ),
        forceMagnitude
      );
      
      Matter.Body.applyForce(body, body.position, forceVector);
    }
  });
}