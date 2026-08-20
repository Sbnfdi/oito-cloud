"use client";

import Navbar from "@/components/landing/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] architectural-grid pt-24 pb-20 px-6">
      <Navbar />

      <div className="max-w-6xl mx-auto space-y-20">
        {/* Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--corner-color)] inline-block px-3 py-1 bg-white/5 border border-[var(--border-color)]">
            SYSTEM FEATURES & ARCHITECTURE
          </span>
          <h1 className="text-4xl sm:text-6xl font-extralight uppercase tracking-tight text-[var(--text-primary)]">
            Engineered for <span className="gradient-text">maximum control</span>
          </h1>
          <p className="text-xs font-mono text-[var(--text-tertiary)] leading-relaxed">
            Discover the technology behind oitocloud — from hardware-accelerated 3D shaders to abstract hosting adapters and Git plumbing integrations.
          </p>
        </div>

        {/* Feature 1: Dashboard UI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 font-mono text-xs">
            <span className="text-[10px] text-[var(--corner-color)] uppercase tracking-widest">
              FEATURE 01 // DASHBOARD CONTROL
            </span>
            <h2 className="text-2xl sm:text-4xl font-extralight uppercase text-[var(--text-primary)]">
              Glassmorphic <span className="gradient-text">Real-Time Control</span>
            </h2>
            <p className="text-[var(--text-tertiary)] leading-relaxed">
              Monitor active deployments, live URL routing, build progress, and multi-provider status from a sleek dark-mode glassmorphic dashboard.
            </p>
            <div className="pt-2">
              <Link
                href="/dashboard"
                className="inline-block px-5 py-2.5 corner-box bg-brand-500/10 border border-brand-500/30 text-brand-400 font-mono text-xs uppercase tracking-wider hover:bg-brand-500/20 transition-all"
              >
                Launch Dashboard [→]
              </Link>
            </div>
          </div>

          <div className="corner-box glass-card p-3">
            <div className="relative w-full aspect-[16/9] overflow-hidden border border-[var(--border-color)]">
              <Image
                src="/hero_preview.jpg"
                alt="Dashboard Control Interface"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Feature 2: Multi-Provider Adapters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-t border-[var(--border-color)] pt-16">
          <div className="order-2 md:order-1 corner-box glass-card p-3">
            <div className="relative w-full aspect-[16/9] overflow-hidden border border-[var(--border-color)]">
              <Image
                src="/multi_provider.jpg"
                alt="Multi-Provider Hosting Mesh"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="order-1 md:order-2 space-y-4 font-mono text-xs">
            <span className="text-[10px] text-[var(--corner-color)] uppercase tracking-widest">
              FEATURE 02 // HOSTING ADAPTERS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extralight uppercase text-[var(--text-primary)]">
              Vercel & <span className="gradient-text">Self-Hosted VPS</span>
            </h2>
            <p className="text-[var(--text-tertiary)] leading-relaxed">
              Switch hosting providers without rewriting your deployment pipeline. Use VercelAdapter for instant REST API edge hosting, or VPSAdapter for webhook triggers to Coolify, CapRover, or custom Docker servers.
            </p>
          </div>
        </div>

        {/* Feature 3: White-Label DNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-t border-[var(--border-color)] pt-16">
          <div className="space-y-4 font-mono text-xs">
            <span className="text-[10px] text-[var(--corner-color)] uppercase tracking-widest">
              FEATURE 03 // DNS MASKING
            </span>
            <h2 className="text-2xl sm:text-4xl font-extralight uppercase text-[var(--text-primary)]">
              White-Label <span className="gradient-text">Domain Routing</span>
            </h2>
            <p className="text-[var(--text-tertiary)] leading-relaxed">
              Generate custom A and CNAME record configuration tables for your clients. Hide third-party hosting references and provide automated SSL provisioning under your brand.
            </p>
          </div>

          <div className="corner-box glass-card p-3">
            <div className="relative w-full aspect-[16/9] overflow-hidden border border-[var(--border-color)]">
              <Image
                src="/dns_security.jpg"
                alt="White Label DNS Routing"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
