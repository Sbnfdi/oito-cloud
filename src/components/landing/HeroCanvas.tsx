"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import ServerNode from "./ServerNode";
import ParticleField from "./ParticleField";

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [morphProgress, setMorphProgress] = useState(0);

  // Listen for scroll-driven morph progress from GSAP
  useEffect(() => {
    const handleProgress = (e: CustomEvent) => {
      setMorphProgress(e.detail);
    };
    window.addEventListener("morph-progress" as string, handleProgress as EventListener);
    return () => window.removeEventListener("morph-progress" as string, handleProgress as EventListener);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      id="hero-canvas"
      style={{ opacity: 0 }} // GSAP will animate this in
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={0.8} color="#06b6d4" />
          <pointLight position={[-5, -3, 3]} intensity={0.5} color="#8b5cf6" />

          {/* Server node (visible before morph) */}
          <group visible={morphProgress < 0.95}>
            <ServerNode morphProgress={morphProgress} />
          </group>

          {/* Particle field (always present, driven by morph) */}
          <ParticleField progress={morphProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
