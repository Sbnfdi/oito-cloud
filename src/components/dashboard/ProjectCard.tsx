"use client";

import { motion } from "framer-motion";
import type { Project } from "@/types";
import StatusIndicator from "./StatusIndicator";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const timeAgo = getTimeAgo(project.updatedAt);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.01, y: -2 }}
      className="glass-card corner-box p-6 cursor-pointer group relative overflow-hidden"
    >
      {/* Top Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-widest block mb-1">
            PROJECT // 0{index + 1}
          </span>
          <h3 className="text-base font-mono uppercase tracking-wider text-[var(--text-primary)] truncate group-hover:text-brand-300 transition-colors">
            {project.name}
          </h3>
          <p className="text-xs text-[var(--text-tertiary)] mt-0.5 font-mono truncate">
            {project.slug}
          </p>
        </div>
        <StatusIndicator status={project.status} />
      </div>

      {/* Live URL */}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 transition-colors font-mono truncate max-w-full my-2"
        >
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
          </svg>
          {project.liveUrl.replace("https://", "")}
        </a>
      )}

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-[var(--border-color)] flex items-center justify-between font-mono text-xs">
        <span className="text-[10px] uppercase tracking-wider text-[var(--corner-color)] px-2 py-0.5 border border-[var(--border-color)] bg-white/5">
          {project.adapter === "vercel" ? "oitocloud Edge" : "oitocloud Dedicated"}
        </span>
        <span className="text-[11px] text-[var(--text-tertiary)]">
          {timeAgo}
        </span>
      </div>

      {/* Code Vault Badge */}
      <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-tertiary)] opacity-60">
        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        oitocloud Code Vault
      </div>
    </motion.div>
  );
}

function getTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}
