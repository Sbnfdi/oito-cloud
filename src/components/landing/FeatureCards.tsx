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
    title: "Instant Deployments",
    description:
      "Zero-config builds, automated edge provisioning, and instant rollbacks for Next.js & static apps.",
  },
  {
    icon: "🌐",
    title: "Custom Domain Routing",
    description:
      "White-labeled DNS routing engine with automated SSL provisioning and CNAME record generation.",
  },
  {
    icon: "🔄",
    title: "GitHub Plumbing Sync",
    description:
      "Git Data API integration that creates private repositories and pushes batch commits seamlessly.",
  },
  {
    icon: "🛡️",
    title: "Multi-Provider Architecture",
    description:
      "Provider-agnostic HostingAdapter pattern allowing seamless switching between Vercel and VPS Webhooks.",
  },
  {
    icon: "📊",
    title: "Real-Time Telemetry",
    description:
      "Live status indicator dots, deployment logs, and infrastructure monitoring across edge nodes.",
  },
  {
    icon: "🏷️",
    title: "White-Label System",
    description:
      "Fully brandable PaaS dashboard architecture with customizable design systems and DNS masks.",
  },
];
