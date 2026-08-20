"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 1000;

// Vertex shader: morphs between server shape and distributed network
const vertexShader = `
  attribute vec3 aTarget;
  attribute float aRandom;
  uniform float uProgress;
  uniform float uTime;
  varying float vAlpha;
  varying float vRandom;

  void main() {
    vRandom = aRandom;

    // Morph between source and target
    vec3 pos = mix(position, aTarget, uProgress);

    // Organic noise displacement
    float noise = sin(pos.x * 2.5 + uTime) * cos(pos.y * 1.8 + uTime * 0.7) * 0.08;
    pos += normalize(pos) * noise * uProgress;

    // Scale with morph
    pos *= 1.0 + uProgress * 0.4;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuation
    float size = mix(1.8, 1.2, uProgress);
    gl_PointSize = size * (250.0 / -mvPosition.z);

    vAlpha = mix(0.8, 0.35 + aRandom * 0.35, uProgress);
  }
`;

// Fragment shader: glowing particles
const fragmentShader = `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uProgress;
  varying float vAlpha;
  varying float vRandom;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
    vec3 color = mix(uColor1, uColor2, vRandom * 0.5 + uProgress * 0.5);

    gl_FragColor = vec4(color, alpha);
  }
`;

export default function ParticleField({ progress = 0 }: { progress?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  const { sourcePositions, targetPositions, randoms } = useMemo(() => {
    const src = new Float32Array(PARTICLE_COUNT * 3);
    const tgt = new Float32Array(PARTICLE_COUNT * 3);
    const rnd = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta1 = Math.random() * Math.PI * 2;
      const phi1 = Math.acos(2 * Math.random() - 1);
      const r1 = 0.8 + Math.random() * 0.5;

      src[i * 3] = r1 * Math.sin(phi1) * Math.cos(theta1);
      src[i * 3 + 1] = r1 * Math.sin(phi1) * Math.sin(theta1);
      src[i * 3 + 2] = r1 * Math.cos(phi1);

      const cluster = Math.floor(Math.random() * 8);
      const clusterAngle = (cluster / 8) * Math.PI * 2;
      const clusterDist = 2 + Math.random() * 2;
      const clusterY = (Math.random() - 0.5) * 3;

      tgt[i * 3] = Math.cos(clusterAngle) * clusterDist + (Math.random() - 0.5) * 0.8;
      tgt[i * 3 + 1] = clusterY + (Math.random() - 0.5) * 0.5;
      tgt[i * 3 + 2] = Math.sin(clusterAngle) * clusterDist + (Math.random() - 0.5) * 0.8;

      rnd[i] = Math.random();
    }

    return { sourcePositions: src, targetPositions: tgt, randoms: rnd };
  }, []);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color("#06b6d4") },
      uColor2: { value: new THREE.Color("#8b5cf6") },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uProgress.value = progress;
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[sourcePositions, 3]}
        />
        <bufferAttribute
          attach="attributes-aTarget"
          args={[targetPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          args={[randoms, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
