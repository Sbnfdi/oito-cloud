"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { MeshTransmissionMaterial } from "@react-three/drei";

export default function ServerNode({ morphProgress = 0 }: { morphProgress?: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const glassRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const gridRef = useRef<THREE.Group>(null!);
  const { pointer } = useThree();

  // Smooth mouse inertia & physics
  const smoothMouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Geometry attributes for architectural wireframe sphere
  const { positions, linePositions } = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    const lines: number[] = [];

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.35 + Math.random() * 0.25;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Connect nearby points to build grid web
      if (i > 0 && i % 3 === 0) {
        lines.push(pos[(i - 1) * 3], pos[(i - 1) * 3 + 1], pos[(i - 1) * 3 + 2]);
        lines.push(x, y, z);
      }
    }

    return {
      positions: pos,
      linePositions: new Float32Array(lines),
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth mouse inertia (vanlent.dev fluid interaction)
    smoothMouse.current.targetX = pointer.x * 0.6;
    smoothMouse.current.targetY = pointer.y * 0.4;

    smoothMouse.current.x += (smoothMouse.current.targetX - smoothMouse.current.x) * 3.5 * delta;
    smoothMouse.current.y += (smoothMouse.current.targetY - smoothMouse.current.y) * 3.5 * delta;

    // Floating parallax rotation
    groupRef.current.rotation.y = smoothMouse.current.x + state.clock.elapsedTime * 0.2;
    groupRef.current.rotation.x = -smoothMouse.current.y + Math.sin(state.clock.elapsedTime * 0.6) * 0.08;

    // Pulse inner core
    if (innerRef.current) {
      const s = 0.65 + Math.sin(state.clock.elapsedTime * 2.2) * 0.05;
      innerRef.current.scale.setScalar(s);
    }

    // Rotate outer grid structure
    if (gridRef.current) {
      gridRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }

    // Scale down node when scroll morph progresses
    const scale = 1 - morphProgress * 0.35;
    groupRef.current.scale.setScalar(Math.max(0.01, scale));
  });

  return (
    <group ref={groupRef}>
      {/* Central Architectural Glass Sphere */}
      <mesh ref={glassRef} scale={1.1}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={0.92}
          roughness={0.15}
          ior={1.33}
          chromaticAberration={0.08}
          anisotropy={0.1}
          distortion={0.3}
          distortionScale={0.4}
          temporalDistortion={0.1}
          color="#06b6d4"
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.5, 2]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#06b6d4"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.9}
          wireframe
        />
      </mesh>

      {/* Outer Wireframe Grid Structure */}
      <group ref={gridRef}>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.035}
            color="#22d3ee"
            transparent
            opacity={0.8}
            sizeAttenuation
          />
        </points>

        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[linePositions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#06b6d4"
            transparent
            opacity={0.25}
          />
        </lineSegments>

        {/* Concentric Architectural Rings */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.7, 0.005, 16, 120]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[2.0, 0.004, 16, 120]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
        </mesh>
      </group>
    </group>
  );
}
