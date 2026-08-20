"use client";

import { BRAND } from "@/lib/constants";

export default function HeroText() {
  return (
    <div className="relative z-10 flex flex-col items-center text-center px-6">
      {/* Badge */}
      <div
        data-hero-cta
        className="mb-6 px-4 py-1.5 rounded-full glass text-xs font-medium text-brand-400 tracking-wider uppercase"
        style={{ opacity: 0 }}
      >
        ✦ Cloud Hosting Platform
      </div>

      {/* Main wordmark — masked container */}
      <div className="hero-mask">
        <h1
          data-hero-text
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none"
          style={{ transform: "translateY(118%)", opacity: 0 }}
        >
          <span className="gradient-text">{BRAND.name}</span>
        </h1>
      </div>

      {/* Subtitle */}
      <p
        data-hero-subtitle
        className="mt-6 text-lg sm:text-xl text-white/50 max-w-xl leading-relaxed"
        style={{ opacity: 0 }}
      >
        {BRAND.tagline}{" "}
        <span className="text-white/30">{BRAND.description}</span>
      </p>

      {/* CTA Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <a
          href="/dashboard"
          data-hero-cta
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-violet-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-brand-500/30 transition-all duration-300 hover:scale-105"
          style={{ opacity: 0 }}
        >
          Start Deploying
        </a>
        <a
          href="#features"
          data-hero-cta
          className="px-8 py-3 rounded-xl glass text-white/80 font-semibold text-sm hover:bg-white/10 transition-all duration-300"
          style={{ opacity: 0 }}
        >
          See Features
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        data-scroll-indicator
        className="mt-20 flex flex-col items-center gap-2 text-white/30"
        style={{ opacity: 0 }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
        <svg
          className="w-5 h-5 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}
