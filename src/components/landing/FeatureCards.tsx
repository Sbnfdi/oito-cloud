"use client";

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {features.map((feature, i) => (
        <div
          key={feature.title}
          data-scroll-reveal
          className="glass-card corner-box rounded-none p-8 group relative"
          style={{ transitionDelay: `${i * 60}ms` }}
        >
          {/* Top-right index counter */}
          <div className="absolute top-4 right-4 font-mono text-[10px] text-[var(--text-tertiary)]">
            0{i + 1} // 06
          </div>

          {/* Icon */}
          <div className="w-10 h-10 rounded-none bg-white/5 border border-[var(--border-color)] flex items-center justify-center mb-6 text-xl">
            {feature.icon}
          </div>

          {/* Title */}
          <h3 className="text-base font-mono uppercase tracking-wider text-[var(--text-primary)] mb-3">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-xs font-mono text-[var(--text-tertiary)] leading-relaxed">
            {feature.description}
          </p>

          {/* Bottom Accent line */}
          <div className="mt-6 h-px w-full bg-[var(--border-color)] group-hover:bg-[var(--corner-color)] transition-colors duration-300" />
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
  },
  {
    icon: "🌐",
    title: "oitocloud Custom Domains",
    description:
      "Native domain routing engine with automated SSL provisioning and instant DNS record generation.",
  },
  {
    icon: "🔒",
    title: "oitocloud Code Vault",
    description:
      "Private source code storage and automated versioning. Every push triggers our proprietary CI/CD pipeline.",
  },
  {
    icon: "🛡️",
    title: "oitocloud Dedicated Compute",
    description:
      "Scalable cloud architecture offering both shared edge routing and high-performance dedicated compute clusters.",
  },
  {
    icon: "📊",
    title: "Real-Time Telemetry",
    description:
      "Live status indicators, build logs, and performance metrics across oitocloud global compute nodes.",
  },
  {
    icon: "🏷️",
    title: "White-Label Cloud System",
    description:
      "Fully brandable platform. Custom domain routing, custom branding, and generic DNS instructions under your brand.",
  },
];
