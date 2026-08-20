"use client";

import { motion } from "framer-motion";
import type { ProjectStatus } from "@/types";

const statusConfig: Record<
  ProjectStatus,
  { color: string; bg: string; label: string; pulse: boolean }
> = {
  live: {
    color: "#10b981",
    bg: "rgba(16, 185, 129, 0.15)",
    label: "Live",
    pulse: true,
  },
  building: {
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.15)",
    label: "Building",
    pulse: true,
  },
  failed: {
    color: "#ef4444",
    bg: "rgba(239, 68, 68, 0.15)",
    label: "Failed",
    pulse: false,
  },
  idle: {
    color: "#64748b",
    bg: "rgba(100, 116, 139, 0.15)",
    label: "Idle",
    pulse: false,
  },
};

export default function StatusIndicator({
  status,
  showLabel = true,
}: {
  status: ProjectStatus;
  showLabel?: boolean;
}) {
  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2">
      {/* Dot with optional pulse ring */}
      <div className="relative flex items-center justify-center">
        {/* Pulse ring */}
        {config.pulse && (
          <motion.span
            className="absolute w-3 h-3 rounded-full"
            style={{ backgroundColor: config.color }}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        )}

        {/* Core dot */}
        <span
          className="relative w-2 h-2 rounded-full"
          style={{ backgroundColor: config.color }}
        />
      </div>

      {/* Label */}
      {showLabel && (
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{
            color: config.color,
            backgroundColor: config.bg,
          }}
        >
          {config.label}
        </span>
      )}
    </div>
  );
}
