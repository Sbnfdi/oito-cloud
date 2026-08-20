"use client";

import Link from "next/link";

export default function HeroText() {
  return (
    <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-5xl mx-auto pt-28 pb-16">
      {/* Glowing Status Badge */}
      <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-xs font-semibold text-cyan-300 shadow-lg shadow-cyan-500/10 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>⚡ NEXT-GEN CLOUD INFRASTRUCTURE ENGINE</span>
      </div>

      {/* Main Bold Display Headline */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.08] text-white">
        Deploy Full-Stack Apps at{" "}
        <span className="gradient-headline block sm:inline">the Speed of Light</span>
      </h1>

      {/* High-Contrast Subtitle */}
      <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
        White-labeled cloud hosting, automated edge deployments, and instant domain routing — powered by oitocloud&apos;s high-speed compute mesh.
      </p>

      {/* High-Impact CTA Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
        <Link
          href="/dashboard"
          className="btn-glow-primary px-8 py-4 text-base font-bold w-full sm:w-auto flex items-center justify-center gap-3 group"
        >
          <span>Start Deploying Free</span>
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
        <Link
          href="/features"
          className="btn-glass-secondary px-8 py-4 text-base font-semibold w-full sm:w-auto flex items-center justify-center gap-2"
        >
          <span>Explore Architecture</span>
          <svg
            className="w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* Live Metrics Counter Bar */}
      <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl w-full">
        {[
          { label: "Global Uptime SLA", value: "99.99%" },
          { label: "Average Edge Latency", value: "< 24ms" },
          { label: "Active Deployments", value: "150k+" },
          { label: "Custom Domains", value: "45k+" },
        ].map((metric) => (
          <div key={metric.label} className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight gradient-accent">
              {metric.value}
            </span>
            <span className="text-xs text-slate-400 font-medium mt-1">
              {metric.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
