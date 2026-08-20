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
          {project.adapter}
        </span>
        <span className="text-[11px] text-[var(--text-tertiary)]">
          {timeAgo}
        </span>
      </div>

      {/* GitHub Repo */}
      {project.githubRepo && (
        <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-tertiary)] opacity-60">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          {project.githubRepo}
        </div>
      )}
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
