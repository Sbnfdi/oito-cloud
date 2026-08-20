"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/landing/Navbar";
import HeroText from "@/components/landing/HeroText";
import ScrollSections from "@/components/landing/ScrollSections";
import EntranceChoreography from "@/components/landing/EntranceChoreography";

// Dynamic import for R3F canvas (no SSR)
const HeroCanvas = dynamic(() => import("@/components/landing/HeroCanvas"), {
  ssr: false,
});

export default function LandingPage() {
  return (
    <main className="relative min-h-screen grid-pattern">
      {/* GSAP choreography orchestrator */}
      <EntranceChoreography />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Canvas Background */}
        <HeroCanvas />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-radial-[at_50%_50%] from-transparent via-surface-950/50 to-surface-950 z-[1]" />

        {/* Text content */}
        <div className="relative z-10">
          <HeroText />
        </div>
      </section>

      {/* Scroll Sections */}
      <ScrollSections />
    </main>
  );
}
