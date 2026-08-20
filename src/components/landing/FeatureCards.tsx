"use client";

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {features.map((feature, i) => (
        <div
          key={feature.title}
          data-scroll-reveal
          className="glass-card-premium p-8 flex flex-col justify-between group relative overflow-hidden"
          style={{ transitionDelay: `${i * 60}ms` }}
        >
          {/* Subtle top glow line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div>
            {/* Colorful Icon Badge */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/10">
              {feature.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed">
              {feature.description}
            </p>
          </div>

          {/* Accent Badge */}
          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-cyan-400/80">
            <span>{feature.accent}</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      ))}
    </div>
  );
}

const features = [
  {
    icon: "⚡",
    title: "oitocloud Edge Engine",
    description:
      "Zero-config builds, automated edge provisioning, and instant rollbacks on our high-speed global cloud network.",
    accent: "SUB-30MS LATENCY",
  },
  {
    icon: "🌐",
    title: "Custom Domain Routing",
    description:
      "Native domain routing engine with automated SSL provisioning and instant DNS record generation.",
    accent: "AUTO SSL & CNAME",
  },
  {
    icon: "🔒",
    title: "oitocloud Code Vault",
    description:
      "Private source code storage and automated versioning. Every push triggers our proprietary CI/CD pipeline.",
    accent: "ENCRYPTED REPO STORAGE",
  },
  {
    icon: "🛡️",
    title: "Dedicated Compute Mesh",
    description:
      "Scalable cloud architecture offering shared edge routing and high-performance dedicated compute clusters.",
    accent: "ISOLATED CLUSTERS",
  },
  {
    icon: "📊",
    title: "Real-Time Telemetry",
    description:
      "Live status indicators, build logs, and performance metrics across oitocloud global compute nodes.",
    accent: "LIVE BUILD LOGS",
  },
  {
    icon: "🏷️",
    title: "White-Label System",
    description:
      "Fully brandable platform. Custom domain routing, custom branding, and generic DNS instructions under your brand.",
    accent: "100% BRANDABLE",
  },
];
