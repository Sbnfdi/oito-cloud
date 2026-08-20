"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";

const MOCK_DOMAINS = [
  { id: "dom_001", domain: "marketing.oitocloud.app", project: "Marketing Site", dnsConfigured: true },
  { id: "dom_002", domain: "api.shop.oitocloud.app", project: "E-Commerce API", dnsConfigured: true },
  { id: "dom_003", domain: "blog.oitocloud.app", project: "Blog Platform", dnsConfigured: true },
  { id: "dom_004", domain: "app.example.com", project: "Dashboard v2", dnsConfigured: false },
];

export default function DomainsPage() {
  return (
    <>
      <DashboardHeader title="Domains" />

      <div className="flex-1 p-6">
        {/* Add domain */}
        <div className="glass-card rounded-xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white mb-1">
              Add Custom Domain
            </h3>
            <p className="text-xs text-white/30">
              Point your domain to oitocloud for white-labeled hosting.
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="example.com"
              className="flex-1 sm:w-64 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-brand-400/50 transition-all"
            />
            <button className="px-4 py-2 rounded-lg bg-brand-500/20 text-brand-400 text-sm font-medium hover:bg-brand-500/30 transition-colors border border-brand-500/20">
              Add
            </button>
          </div>
        </div>

        {/* Domain list */}
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr_auto_auto] gap-4 px-5 py-3 border-b border-white/5 text-xs text-white/30 uppercase tracking-wider">
            <span>Domain</span>
            <span>Project</span>
            <span>DNS</span>
            <span>Actions</span>
          </div>

          {MOCK_DOMAINS.map((domain) => (
            <div
              key={domain.id}
              className="grid grid-cols-[1fr_1fr_auto_auto] gap-4 px-5 py-4 border-b border-white/5 last:border-0 items-center hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-sm text-white font-mono truncate">
                {domain.domain}
              </span>
              <span className="text-sm text-white/50 truncate">
                {domain.project}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  domain.dnsConfigured
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-amber-500/10 text-amber-400"
                }`}
              >
                {domain.dnsConfigured ? "Configured" : "Pending"}
              </span>
              <button className="text-xs text-brand-400/60 hover:text-brand-400 transition-colors">
                DNS Setup
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
