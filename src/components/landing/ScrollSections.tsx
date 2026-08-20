"use client";

import FeatureCards from "./FeatureCards";

export default function ScrollSections() {
  return (
    <>
      {/* Morph trigger section — this is where the 3D morph happens */}
      <section
        id="scroll-morph-section"
        className="relative min-h-[80vh] flex items-center justify-center"
      >
        <div className="text-center px-6 max-w-3xl" data-scroll-reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-400 mb-4">
            Automated Infrastructure
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            From one node to a{" "}
            <span className="gradient-text">global network</span>
          </h2>
          <p className="text-white/40 text-lg leading-relaxed">
            Watch your single deployment transform into a distributed network
            of edge nodes. Our platform automatically scales your infrastructure
            across regions for the fastest possible delivery.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 px-6">
        <div className="text-center mb-16" data-scroll-reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-400 mb-4">
            Platform Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Everything you need to{" "}
            <span className="gradient-text">ship faster</span>
          </h2>
        </div>
        <FeatureCards />
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16" data-scroll-reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-400 mb-4">
              Simple Process
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Three steps to{" "}
              <span className="gradient-text">production</span>
            </h2>
          </div>

          <div className="space-y-12">
            {steps.map((step, i) => (
              <div
                key={step.title}
                data-scroll-reveal
                className="flex items-start gap-6"
              >
                {/* Step number */}
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500/20 to-violet-500/20 flex items-center justify-center border border-white/5">
                  <span className="text-2xl font-bold gradient-text">
                    {i + 1}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/40 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div
          className="max-w-3xl mx-auto text-center glass-card rounded-3xl p-12 md:p-16"
          data-scroll-reveal
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Ready to <span className="gradient-text">deploy</span>?
          </h2>
          <p className="text-white/40 mb-8 max-w-lg mx-auto">
            Join teams shipping production apps in minutes, not hours.
            Start with our free tier — no credit card required.
          </p>
          <a
            href="/dashboard"
            className="inline-flex px-8 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-violet-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-brand-500/30 transition-all duration-300 hover:scale-105"
          >
            Get Started Free →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <span>© 2026 oitocloud. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/60 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white/60 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white/60 transition-colors">
              Docs
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

const steps = [
  {
    title: "Upload Your Code",
    description:
      "Drag and drop your project files or connect your GitHub repository. We support all major frameworks — Next.js, Vite, React, Node.js, and more.",
  },
  {
    title: "We Handle the Rest",
    description:
      "Our engine automatically creates a private repository, provisions a server, builds your project, and deploys it to the edge. Real-time progress updates keep you informed.",
  },
  {
    title: "Go Live Instantly",
    description:
      "Your project is live with a custom domain, SSL certificate, and CDN — all configured automatically. Point your DNS and you're in production.",
  },
];
