"use client";

import Image from "next/image";
import FeatureCards from "./FeatureCards";

export default function ScrollSections() {
  return (
    <>
      {/* 3D Morph Trigger Section */}
      <section
        id="scroll-morph-section"
        className="relative min-h-[70vh] flex items-center justify-center py-20"
      >
        <div className="text-center px-6 max-w-3xl" data-scroll-reveal>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--corner-color)] mb-4 inline-block px-3 py-1 bg-white/5 border border-[var(--border-color)]">
            DISTRIBUTED EDGE ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extralight uppercase tracking-tight text-[var(--text-primary)] mb-6">
            From single node to{" "}
            <span className="gradient-text">global mesh</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-sm font-mono leading-relaxed max-w-xl mx-auto">
            Watch single server instances transform into a zero-latency distributed mesh.
            Automatically routed across global edge nodes for optimal response speed.
          </p>
        </div>
      </section>

      {/* Platform Interface Showcase Image Section */}
      <section className="relative py-20 px-6 max-w-6xl mx-auto">
        <div data-scroll-reveal className="corner-box glass-card p-3 relative overflow-hidden group">
          <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border-color)] mb-3 font-mono text-[11px] text-[var(--text-tertiary)]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-[var(--text-secondary)]">oitocloud-dashboard-v2.sys</span>
            </div>
            <span>LIVE MONITORING ENGINE</span>
          </div>
          <div className="relative w-full aspect-[16/9] rounded-none overflow-hidden border border-[var(--border-color)]">
            <Image
              src="/hero_preview.jpg"
              alt="oitocloud Dashboard Interface"
              fill
              className="object-cover group-hover:scale-[1.01] transition-transform duration-500"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative py-24 px-6">
        <div className="text-center mb-16" data-scroll-reveal>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--corner-color)] mb-3 inline-block px-3 py-1 bg-white/5 border border-[var(--border-color)]">
            SYSTEM CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-extralight uppercase tracking-tight text-[var(--text-primary)]">
            Built for speed and <span className="gradient-text">scale</span>
          </h2>
        </div>
        <FeatureCards />
      </section>

      {/* Infrastructure Showcase Image Section */}
      <section className="relative py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div data-scroll-reveal className="space-y-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--corner-color)] inline-block px-3 py-1 bg-white/5 border border-[var(--border-color)]">
              MULTI-PROVIDER ADAPTERS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extralight uppercase tracking-tight text-[var(--text-primary)]">
              Deploy to Vercel or <span className="gradient-text">your own VPS</span>
            </h2>
            <p className="text-xs font-mono text-[var(--text-tertiary)] leading-relaxed">
              Our abstract HostingAdapter engine abstracts cloud providers away. Deploy frontend apps to Vercel REST API for edge speed, or trigger Webhooks for self-hosted Docker clusters (Coolify, CapRover, custom VPS).
            </p>
            <div className="pt-2 flex gap-4">
              <a
                href="/docs"
                className="px-5 py-2.5 corner-box bg-white/5 border border-[var(--border-color)] font-mono text-xs text-[var(--text-primary)] hover:border-[var(--corner-color)] transition-colors uppercase tracking-wider"
              >
                Read Adapter Docs →
              </a>
            </div>
          </div>

          <div data-scroll-reveal className="corner-box glass-card p-3">
            <div className="relative w-full aspect-[16/9] overflow-hidden border border-[var(--border-color)]">
              <Image
                src="/multi_provider.jpg"
                alt="Multi Provider Hosting Architecture"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DNS Security Showcase Section */}
      <section className="relative py-24 px-6 max-w-6xl mx-auto border-t border-[var(--border-color)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div data-scroll-reveal className="order-2 md:order-1 corner-box glass-card p-3">
            <div className="relative w-full aspect-[16/9] overflow-hidden border border-[var(--border-color)]">
              <Image
                src="/dns_security.jpg"
                alt="White-Label DNS Security Routing"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div data-scroll-reveal className="order-1 md:order-2 space-y-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--corner-color)] inline-block px-3 py-1 bg-white/5 border border-[var(--border-color)]">
              WHITE-LABEL DNS ROUTING
            </span>
            <h2 className="text-2xl sm:text-4xl font-extralight uppercase tracking-tight text-[var(--text-primary)]">
              Mask underlying <span className="gradient-text">infrastructure</span>
            </h2>
            <p className="text-xs font-mono text-[var(--text-tertiary)] leading-relaxed">
              Provide white-labeled A and CNAME record configuration instructions directly to your users. Automated SSL certificates and custom domain mapping hide backend hosting providers completely under your brand.
            </p>
            <div className="pt-2">
              <a
                href="/features"
                className="px-5 py-2.5 corner-box bg-brand-500/10 border border-brand-500/30 font-mono text-xs text-brand-400 hover:bg-brand-500/20 transition-colors uppercase tracking-wider"
              >
                View DNS Architecture →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-28 px-6">
        <div
          className="max-w-3xl mx-auto text-center corner-box glass-card p-12 md:p-16 relative"
          data-scroll-reveal
        >
          <div className="crosshair top-3 left-3" />
          <div className="crosshair top-3 right-3" />
          <div className="crosshair bottom-3 left-3" />
          <div className="crosshair bottom-3 right-3" />

          <h2 className="text-3xl sm:text-4xl font-extralight uppercase tracking-tight text-[var(--text-primary)] mb-4">
            Ready to <span className="gradient-text">deploy your stack</span>?
          </h2>
          <p className="text-xs font-mono text-[var(--text-tertiary)] mb-8 max-w-lg mx-auto leading-relaxed">
            Join developers building production web apps on oitocloud. Start deploying in under 60 seconds with zero credit card required.
          </p>
          <a
            href="/dashboard"
            className="inline-flex px-8 py-3.5 corner-box bg-gradient-to-r from-brand-500 to-violet-500 text-white font-mono text-xs uppercase tracking-[0.15em] font-semibold hover:scale-105 transition-all duration-300"
          >
            Launch Dashboard Now [→]
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[var(--border-color)]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--text-tertiary)]">
          <span>© 2026 oitocloud inc. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="/features" className="hover:text-[var(--text-primary)] transition-colors">
              Features
            </a>
            <a href="/pricing" className="hover:text-[var(--text-primary)] transition-colors">
              Pricing
            </a>
            <a href="/docs" className="hover:text-[var(--text-primary)] transition-colors">
              Docs
            </a>
            <a href="/dashboard" className="hover:text-[var(--text-primary)] transition-colors">
              Dashboard
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
