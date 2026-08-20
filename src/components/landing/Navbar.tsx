"use client";

import Link from "next/link";
import { BRAND } from "@/lib/constants";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass" id="main-nav">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-violet-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-brand-500/20">
            O
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            {BRAND.name}
          </span>
        </Link>

        {/* Nav Items */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            data-nav-item
            className="text-sm text-white/60 hover:text-white transition-colors duration-200"
            style={{ opacity: 0 }}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            data-nav-item
            className="text-sm text-white/60 hover:text-white transition-colors duration-200"
            style={{ opacity: 0 }}
          >
            How It Works
          </a>
          <a
            href="#pricing"
            data-nav-item
            className="text-sm text-white/60 hover:text-white transition-colors duration-200"
            style={{ opacity: 0 }}
          >
            Pricing
          </a>
          <Link
            href="/dashboard"
            data-nav-item
            className="text-sm px-4 py-2 rounded-lg bg-brand-500/10 text-brand-400 hover:bg-brand-500/20 border border-brand-500/20 hover:border-brand-500/40 transition-all duration-200"
            style={{ opacity: 0 }}
          >
            Dashboard
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white/60 hover:text-white"
          aria-label="Toggle menu"
          data-nav-item
          style={{ opacity: 0 }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
