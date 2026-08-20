"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

export default function Navbar() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <nav
      className={`fixed top-4 left-0 right-0 z-50 max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-300`}
    >
      <div
        className={`rounded-2xl px-6 h-16 flex items-center justify-between border transition-all duration-300 ${
          scrolled
            ? "glass-panel bg-slate-950/80 border-slate-800 shadow-2xl shadow-cyan-950/20"
            : "bg-slate-900/40 backdrop-blur-md border-white/10"
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-extrabold text-sm text-cyan-400">
              O
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              {BRAND.name}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-cyan-400/80 uppercase -mt-1">
              CLOUD PLATFORM
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            href="/features"
            className="text-slate-300 hover:text-white hover:scale-105 transition-all"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-slate-300 hover:text-white hover:scale-105 transition-all"
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className="text-slate-300 hover:text-white hover:scale-105 transition-all"
          >
            Docs
          </Link>
        </div>

        {/* Action Controls & Theme Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-400/40 transition-all flex items-center gap-1.5 cursor-pointer"
            aria-label="Toggle theme"
          >
            <span className={theme === "light" ? "text-cyan-400 font-bold" : "text-slate-400"}>
              LIGHT
            </span>
            <span className="text-slate-600">/</span>
            <span className={theme === "dark" ? "text-cyan-400 font-bold" : "text-slate-400"}>
              DARK
            </span>
          </button>

          <Link
            href="/dashboard"
            className="btn-glow-primary px-5 py-2 text-sm flex items-center gap-2 group"
          >
            <span>Launch Dashboard</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}
