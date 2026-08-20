"use client";

import Image from "next/image";
import FeatureCards from "./FeatureCards";
import Link from "next/link";

export default function ScrollSections() {
  return (
    <>
      {/* 3D Morph Section */}
      <section
        id="scroll-morph-section"
        className="relative min-h-[60vh] flex items-center justify-center py-20 bg-mesh-radial"
      >
        <div className="text-center px-6 max-w-3xl" data-scroll-reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            GLOBAL DISTRIBUTED COMPUTING
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            From single node to <span className="gradient-headline">global cloud mesh</span>
          </h2>
          <p className="text-slate-300 text-base font-normal leading-relaxed max-w-xl mx-auto">
            Watch single deployment instances transform into a zero-latency distributed cloud mesh.
            Automatically routed across oitocloud global edge nodes for optimal performance.
          </p>
        </div>
      </section>

      {/* Main Dashboard Interface Showcase */}
      <section className="relative py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div data-scroll-reveal className="glass-panel rounded-2xl p-4 sm:p-6 relative overflow-hidden group shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 mb-4 font-mono text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-slate-200 font-medium">oitocloud-control-center.sys</span>
            </div>
            <span className="hidden sm:inline text-cyan-400 font-semibold">LIVE CONTROL CENTER</span>
          </div>

          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
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
      <section id="features" className="relative py-28 px-4 sm:px-6">
        <div className="text-center mb-16 space-y-4" data-scroll-reveal>
          <span className="px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-semibold text-purple-300">
            SYSTEM CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Built for speed, security, and <span className="gradient-headline">scale</span>
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Everything your team needs to launch, manage, and scale production applications.
          </p>
        </div>
        <FeatureCards />
      </section>

      {/* Cloud Infrastructure Showcase */}
      <section className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div data-scroll-reveal className="space-y-6">
            <span className="px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
              PROPRIETARY COMPUTE ENGINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Powered by <span className="gradient-headline">oitocloud Cloud Nodes</span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Our cloud engine automatically provisions high-speed edge compute and dedicated clusters. Enjoy zero-configuration builds, automatic SSL, and instant global distribution.
            </p>
            <div className="pt-2">
              <Link
                href="/docs"
                className="btn-glass-secondary px-6 py-3 text-sm inline-flex items-center gap-2"
              >
                <span>Read Architecture Docs</span>
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          <div data-scroll-reveal className="glass-panel p-4 rounded-2xl">
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/multi_provider.jpg"
                alt="oitocloud Infrastructure Architecture"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DNS Domain Routing Showcase */}
      <section className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div data-scroll-reveal className="order-2 md:order-1 glass-panel p-4 rounded-2xl">
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/dns_security.jpg"
                alt="oitocloud DNS Security Routing"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div data-scroll-reveal className="order-1 md:order-2 space-y-6">
            <span className="px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-semibold text-purple-300">
              PROPRIETARY DOMAIN ROUTING
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Native DNS <span className="gradient-headline">Domain Manager</span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Connect custom domains directly to oitocloud edge nodes. Our automated DNS instruction generator provides clear A and CNAME records with instant SSL provisioning.
            </p>
            <div className="pt-2">
              <Link
                href="/features"
                className="btn-glow-primary px-6 py-3 text-sm inline-flex items-center gap-2"
              >
                <span>View Cloud Architecture</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Big CTA Banner */}
      <section className="relative py-28 px-4 sm:px-6">
        <div
          className="max-w-4xl mx-auto text-center glass-panel rounded-3xl p-10 sm:p-16 relative overflow-hidden bg-mesh-radial border-cyan-500/20"
          data-scroll-reveal
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Ready to <span className="gradient-headline">deploy your application</span>?
          </h2>
          <p className="text-slate-300 text-base mb-8 max-w-lg mx-auto leading-relaxed">
            Start shipping on oitocloud native cloud engine. Get your apps live in under 60 seconds with zero credit card required.
          </p>
          <Link
            href="/dashboard"
            className="btn-glow-primary px-10 py-4 text-base font-bold inline-flex items-center gap-3 shadow-xl"
          >
            <span>Launch Dashboard Now</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 bg-slate-950">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <span>© 2026 oitocloud inc. All rights reserved.</span>
          <div className="flex gap-6 font-medium">
            <Link href="/features" className="hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/docs" className="hover:text-white transition-colors">
              Docs
            </Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
