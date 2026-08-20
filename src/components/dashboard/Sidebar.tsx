"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { NAV_ITEMS, BRAND } from "@/lib/constants";

const icons: Record<string, React.ReactNode> = {
  grid: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  globe: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9z" />
    </svg>
  ),
  "credit-card": (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  ),
  settings: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
};

export default function Sidebar() {
  const pathname = usePathname();
  const { user, sidebarOpen } = useApp();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen w-[250px] bg-surface-950/80 backdrop-blur-xl border-r border-white/5 flex flex-col z-40 transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      {/* Logo */}
      <div className="h-16 px-5 flex items-center gap-2 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-violet-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-brand-500/20">
          O
        </div>
        <span className="text-base font-semibold tracking-tight text-white">
          {BRAND.name}
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150 group ${
                isActive
                  ? "text-white bg-white/5"
                  : "text-white/40 hover:text-white/70 hover:bg-white/[0.03]"
              }`}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-brand-400"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}

              <span className={isActive ? "text-brand-400" : "text-white/30 group-hover:text-white/50"}>
                {icons[item.icon]}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Deploy button */}
      <div className="px-3 py-3 border-t border-white/5">
        <DeployButton />
      </div>

      {/* User */}
      <div className="px-4 py-4 border-t border-white/5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
          {user?.name?.charAt(0) || "U"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">
            {user?.name || "User"}
          </p>
          <p className="text-xs text-white/30 truncate">
            {user?.email || ""}
          </p>
        </div>
      </div>
    </aside>
  );
}

function DeployButton() {
  const { setDeployModalOpen } = useApp();

  return (
    <button
      onClick={() => setDeployModalOpen(true)}
      className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-brand-500 to-violet-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-brand-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
    >
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 5v14M5 12h14" />
      </svg>
      New Deployment
    </button>
  );
}
