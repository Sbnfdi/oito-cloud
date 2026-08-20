"use client";

import { useApp } from "@/context/AppContext";

export default function DashboardHeader({ title }: { title?: string }) {
  const { user, setSidebarOpen, sidebarOpen } = useApp();

  return (
    <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-surface-950/60 backdrop-blur-lg sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden text-white/50 hover:text-white transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <h1 className="text-lg font-semibold text-white">
          {title || "Projects"}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg glass text-sm text-white/30">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <span>Search...</span>
          <kbd className="ml-4 px-1.5 py-0.5 rounded text-[10px] bg-white/5 text-white/20 border border-white/5">
            ⌘K
          </kbd>
        </div>

        {/* Notifications */}
        <button className="relative text-white/40 hover:text-white transition-colors" aria-label="Notifications">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 106 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-brand-400" />
        </button>

        {/* User avatar (mobile) */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white lg:hidden">
          {user?.name?.charAt(0) || "U"}
        </div>
      </div>
    </header>
  );
}
