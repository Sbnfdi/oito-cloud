"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function BillingPage() {
  return (
    <>
      <DashboardHeader title="Billing" />

      <div className="flex-1 p-6">
        {/* Current plan */}
        <div className="glass-card rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-400/30 to-transparent" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-white/30 uppercase tracking-wider mb-1">
                Current Plan
              </p>
              <h2 className="text-2xl font-bold text-white">
                Pro <span className="gradient-text">Plan</span>
              </h2>
              <p className="text-sm text-white/40 mt-1">
                Unlimited deployments, custom domains, and priority support.
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white">
                $29<span className="text-sm text-white/30 font-normal">/mo</span>
              </p>
              <button className="mt-2 text-xs text-brand-400 hover:text-brand-300 transition-colors">
                Manage Subscription →
              </button>
            </div>
          </div>
        </div>

        {/* Usage stats */}
        <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4">
          Usage This Month
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Deployments", used: 47, limit: "Unlimited", pct: 0 },
            { label: "Bandwidth", used: 12.4, limit: "100 GB", pct: 12 },
            { label: "Build Minutes", used: 230, limit: "1,000 min", pct: 23 },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl px-5 py-4">
              <p className="text-xs text-white/30 mb-2">{stat.label}</p>
              <p className="text-lg font-semibold text-white">
                {stat.used}
                <span className="text-xs text-white/20 font-normal ml-1">
                  / {stat.limit}
                </span>
              </p>
              {stat.pct > 0 && (
                <div className="mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-violet-500"
                    style={{ width: `${stat.pct}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Invoices */}
        <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4">
          Recent Invoices
        </h3>
        <div className="glass-card rounded-xl overflow-hidden">
          {[
            { date: "Aug 1, 2026", amount: "$29.00", status: "Paid" },
            { date: "Jul 1, 2026", amount: "$29.00", status: "Paid" },
            { date: "Jun 1, 2026", amount: "$29.00", status: "Paid" },
          ].map((invoice, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-5 py-4 border-b border-white/5 last:border-0"
            >
              <span className="text-sm text-white/60">{invoice.date}</span>
              <span className="text-sm text-white font-mono">
                {invoice.amount}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                {invoice.status}
              </span>
              <button className="text-xs text-brand-400/60 hover:text-brand-400 transition-colors">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
