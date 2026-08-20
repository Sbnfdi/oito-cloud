"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function ServerNode({ morphProgress = 0 }: { morphProgress?: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const wireframeRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const ringsRef = useRef<THREE.Group>(null!);
  const { pointer } = useThree();

  // Smooth mouse tracking
  const smoothMouse = useRef({ x: 0, y: 0 });

  // Create ring geometries
  const ringCount = 3;
  const rings = useMemo(() => {
    return Array.from({ length: ringCount }, (_, i) => ({
      radius: 1.6 + i * 0.4,
      rotationSpeed: 0.3 + i * 0.15,
      tilt: (Math.PI / 6) * (i + 1),
    }));
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth mouse interpolation for parallax
    smoothMouse.current.x += (pointer.x * 0.3 - smoothMouse.current.x) * 2 * delta;
    smoothMouse.current.y += (pointer.y * 0.2 - smoothMouse.current.y) * 2 * delta;

    // Apply parallax rotation
    groupRef.current.rotation.y = smoothMouse.current.x + state.clock.elapsedTime * 0.15;
    groupRef.current.rotation.x = smoothMouse.current.y + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

    // Pulsing inner sphere
    if (innerRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      innerRef.current.scale.setScalar(pulse);
    }

    // Rotate rings
    if (ringsRef.current) {
      ringsRef.current.children.forEach((ring, i) => {
        ring.rotation.z += delta * rings[i].rotationSpeed;
        ring.rotation.x += delta * 0.1;
      });
    }

    // Wireframe slow rotation
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += delta * 0.08;
      wireframeRef.current.rotation.z += delta * 0.05;
    }

    // Scale down as morph progresses
    const scale = 1 - morphProgress * 0.3;
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef}>
      {/* Core icosahedron wireframe */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Inner glowing sphere */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.8}
          transparent
          opacity={0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Outer glow shell */}
      <mesh ref={glowRef} scale={1.8}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Orbital rings */}
      <group ref={ringsRef}>
        {rings.map((ring, i) => (
          <mesh key={i} rotation={[ring.tilt, 0, i * 0.5]}>
            <torusGeometry args={[ring.radius, 0.008, 8, 100]} />
            <meshBasicMaterial
              color={i === 0 ? "#06b6d4" : i === 1 ? "#8b5cf6" : "#22d3ee"}
              transparent
              opacity={0.3 - i * 0.05}
            />
          </mesh>
        ))}
      </group>

      {/* Floating data points */}
      <DataPoints />
    </group>
  );
}

function DataPoints() {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const count = 80;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color("#06b6d4");
    const violet = new THREE.Color("#8b5cf6");

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.3 + Math.random() * 0.8;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const color = Math.random() > 0.5 ? cyan : violet;
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}
