"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export default function Navbar() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--border-color)]"
      id="main-nav"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">
        {/* Left: Logo & Technical Badge */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 corner-box bg-white/5 flex items-center justify-center text-xs font-mono font-bold text-[var(--corner-color)] border border-[var(--border-color)]">
              OITO
            </div>
            <span className="text-sm font-light tracking-[0.2em] uppercase text-[var(--text-primary)]">
              {BRAND.name}
            </span>
          </Link>
          <span className="hidden sm:inline-block text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-widest pl-3 border-l border-[var(--border-color)]">
            ARCH.V2
          </span>
        </div>

        {/* Center Crosshair Accent */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
          <div className="crosshair" />
        </div>

        {/* Right: Nav Items & AM/PM Theme Switch */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              data-nav-item
              className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors uppercase tracking-wider"
              style={{ opacity: 0 }}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              data-nav-item
              className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors uppercase tracking-wider"
              style={{ opacity: 0 }}
            >
              Architecture
            </a>
            <Link
              href="/dashboard"
              data-nav-item
              className="text-xs font-mono px-3 py-1.5 corner-box bg-brand-500/10 text-brand-400 hover:bg-brand-500/20 border border-brand-500/30 transition-all uppercase tracking-wider"
              style={{ opacity: 0 }}
            >
              Dashboard [→]
            </Link>
          </div>

          {/* AM / PM Theme Switcher (vanlent.dev aesthetic) */}
          <button
            onClick={toggleTheme}
            data-nav-item
            className="corner-box px-3 py-1 bg-white/5 border border-[var(--border-color)] text-xs font-mono text-[var(--text-primary)] hover:border-[var(--corner-color)] transition-all flex items-center gap-1.5"
            style={{ opacity: 0 }}
            aria-label="Toggle AM/PM theme"
          >
            <span className={theme === "light" ? "text-[var(--corner-color)] font-bold" : "text-[var(--text-tertiary)]"}>
              AM
            </span>
            <span className="text-[var(--text-tertiary)]">/</span>
            <span className={theme === "dark" ? "text-[var(--corner-color)] font-bold" : "text-[var(--text-tertiary)]"}>
              PM
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
