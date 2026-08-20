"use client";

import { useApp } from "@/context/AppContext";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProjectCard from "@/components/dashboard/ProjectCard";

export default function DashboardPage() {
  const { projects, setDeployModalOpen } = useApp();

  return (
    <>
      <DashboardHeader title="Projects" />

      <div className="flex-1 p-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Projects",
              value: projects.length,
              color: "text-white",
            },
            {
              label: "Live",
              value: projects.filter((p) => p.status === "live").length,
              color: "text-emerald-400",
            },
            {
              label: "Building",
              value: projects.filter((p) => p.status === "building").length,
              color: "text-amber-400",
            },
            {
              label: "Failed",
              value: projects.filter((p) => p.status === "failed").length,
              color: "text-red-400",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-xl px-4 py-4"
            >
              <p className="text-xs text-white/30 mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-medium text-white/50 uppercase tracking-wider">
            Active Projects
          </h2>
          <button
            onClick={() => setDeployModalOpen(true)}
            className="text-xs px-3 py-1.5 rounded-lg bg-brand-500/10 text-brand-400 hover:bg-brand-500/20 border border-brand-500/20 transition-colors"
          >
            + New Project
          </button>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-white/20"
                viewBox="0 0 24 24"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <p className="text-white/40 text-sm">No projects yet</p>
            <p className="text-white/20 text-xs mt-1">
              Click &quot;New Deployment&quot; to get started
            </p>
          </div>
        )}
      </div>
    </>
  );
}
