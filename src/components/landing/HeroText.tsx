"use client";

import { BRAND } from "@/lib/constants";

export default function HeroText() {
  return (
    <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
      {/* Technical Status & System Coordinates */}
      <div
        data-hero-cta
        className="mb-8 px-4 py-1.5 corner-box bg-white/5 border border-[var(--border-color)] text-[11px] font-mono text-[var(--corner-color)] tracking-[0.2em] uppercase flex items-center gap-3"
        style={{ opacity: 0 }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        <span>SYS.STATUS: ONLINE</span>
        <span className="opacity-30">|</span>
        <span>DEPLOY ENGINE V2.4</span>
      </div>

      {/* Main Wordmark — Architectural Mask */}
      <div className="hero-mask w-full">
        <h1
          data-hero-text
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-[-0.05em] uppercase leading-none text-[var(--text-primary)]"
          style={{ transform: "translateY(118%)", opacity: 0 }}
        >
          <span className="gradient-text">{BRAND.name}</span>
        </h1>
      </div>

      {/* Subtitle / Tagline */}
      <p
        data-hero-subtitle
        className="mt-6 text-sm sm:text-base md:text-lg font-mono text-[var(--text-secondary)] max-w-2xl leading-relaxed tracking-wide"
        style={{ opacity: 0 }}
      >
        {BRAND.tagline}{" "}
        <span className="text-[var(--text-tertiary)]">{BRAND.description}</span>
      </p>

      {/* CTA Buttons with Architectural Corner Brackets */}
      <div className="mt-10 flex flex-col sm:flex-row gap-5">
        <a
          href="/dashboard"
          data-hero-cta
          className="px-8 py-3.5 corner-box bg-gradient-to-r from-brand-500 to-violet-500 text-white font-mono text-xs uppercase tracking-[0.15em] font-semibold hover:shadow-lg hover:shadow-brand-500/20 transition-all duration-300 hover:scale-105"
          style={{ opacity: 0 }}
        >
          [ INITIALIZE DEPLOYMENT ]
        </a>
        <a
          href="#features"
          data-hero-cta
          className="px-8 py-3.5 corner-box glass text-[var(--text-primary)] font-mono text-xs uppercase tracking-[0.15em] hover:bg-white/10 transition-all duration-300"
          style={{ opacity: 0 }}
        >
          EXPLORE ARCHITECTURE
        </a>
      </div>

      {/* Architectural Scroll Indicator */}
      <div
        data-scroll-indicator
        className="mt-16 flex flex-col items-center gap-2 text-[var(--text-tertiary)]"
        style={{ opacity: 0 }}
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase">
          SCROLL TO UNROLL GRID
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-[var(--corner-color)] to-transparent animate-pulse" />
      </div>
    </div>
  );
}
