"use client";

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {features.map((feature, i) => (
        <div
          key={feature.title}
          data-scroll-reveal
          className="glass-card rounded-2xl p-8 group hover:scale-[1.02] transition-transform duration-300"
          style={{ transitionDelay: `${i * 80}ms` }}
        >
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/20 to-violet-500/20 flex items-center justify-center mb-5 group-hover:shadow-lg group-hover:shadow-brand-500/10 transition-shadow duration-300">
            <span className="text-2xl">{feature.icon}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-white mb-3">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-white/40 leading-relaxed">
            {feature.description}
          </p>

          {/* Bottom accent line */}
          <div className="mt-6 h-px w-full bg-gradient-to-r from-brand-500/20 via-violet-500/20 to-transparent" />
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
      "Push your code and watch it go live in seconds. Zero-config deployments with automatic builds, previews, and rollbacks.",
  },
  {
    icon: "🌐",
    title: "Custom Domains",
    description:
      "White-labeled domain routing with automatic DNS configuration. Your brand, your domains, no traces of the underlying infrastructure.",
  },
  {
    icon: "🔄",
    title: "GitHub Sync",
    description:
      "Automatic repository creation and code syncing. Every push triggers a fresh deployment through our CI/CD pipeline.",
  },
  {
    icon: "🛡️",
    title: "Multi-Provider",
    description:
      "Adapter-based hosting architecture. Deploy to Vercel for speed or your own VPS for control — switch anytime.",
  },
  {
    icon: "📊",
    title: "Real-time Monitoring",
    description:
      "Live deployment status, build logs, and performance metrics. Know the state of every project at a glance.",
  },
  {
    icon: "🏷️",
    title: "White-Label Ready",
    description:
      "Fully brandable platform. Custom logos, domains, and color schemes — make it yours from day one.",
  },
];
