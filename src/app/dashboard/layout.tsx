"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import DeployModal from "@/components/dashboard/DeployModal";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-950 grid-pattern">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <main className="lg:ml-[250px] min-h-screen flex flex-col">
        {children}
      </main>

      {/* Deploy modal (global overlay) */}
      <DeployModal />
    </div>
  );
}
