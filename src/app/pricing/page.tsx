"use client";

import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Link from "next/link";

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] architectural-grid pt-24 pb-20 px-6">
      <Navbar />

      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--corner-color)] inline-block px-3 py-1 bg-white/5 border border-[var(--border-color)]">
            TRANSPARENT PRICING TIERS
          </span>
          <h1 className="text-4xl sm:text-6xl font-extralight uppercase tracking-tight text-[var(--text-primary)]">
            Simple plans for <span className="gradient-text">every team</span>
          </h1>
          <p className="text-xs font-mono text-[var(--text-tertiary)] leading-relaxed">
            Deploy your static sites, full-stack Next.js apps, and microservices with white-labeled DNS routing and multi-provider adapter support.
          </p>

          {/* Monthly / Annual Billing Toggle */}
          <div className="pt-6 flex items-center justify-center gap-4 font-mono text-xs">
            <span className={!annual ? "text-[var(--text-primary)] font-semibold" : "text-[var(--text-tertiary)]"}>
              Monthly Billing
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className="w-12 h-6 rounded-full bg-white/10 p-1 flex items-center border border-[var(--border-color)] cursor-pointer transition-colors"
            >
              <div
                className={`w-4 h-4 rounded-full bg-[var(--corner-color)] transition-transform duration-200 ${
                  annual ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span className={annual ? "text-[var(--text-primary)] font-semibold" : "text-[var(--text-tertiary)]"}>
              Annual Billing <span className="text-emerald-400 font-bold ml-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-[10px]">[SAVE 20%]</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => {
            const price = annual ? tier.priceAnnual : tier.priceMonthly;

            return (
              <div
                key={tier.name}
                className={`corner-box glass-card p-8 flex flex-col justify-between relative ${
                  tier.highlight ? "border-[var(--corner-color)] bg-brand-500/[0.02]" : ""
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[var(--corner-color)] text-[var(--bg-primary)] font-mono text-[9px] font-bold uppercase tracking-widest">
                    RECOMMENDED
                  </div>
                )}

                <div>
                  <div className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
                    {tier.tagline}
                  </div>
                  <h3 className="text-2xl font-mono uppercase tracking-wider text-[var(--text-primary)] mb-4">
                    {tier.name}
                  </h3>

                  <div className="flex items-baseline gap-1 my-6 font-mono">
                    <span className="text-4xl font-extralight text-[var(--text-primary)]">
                      ${price}
                    </span>
                    <span className="text-xs text-[var(--text-tertiary)]">/month</span>
                  </div>

                  <p className="text-xs font-mono text-[var(--text-tertiary)] mb-8 leading-relaxed">
                    {tier.description}
                  </p>

                  <div className="space-y-3 font-mono text-xs border-t border-[var(--border-color)] pt-6">
                    {tier.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5 text-[var(--text-secondary)]">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10">
                  <Link
                    href="/dashboard"
                    className={`w-full block text-center py-3 corner-box font-mono text-xs uppercase tracking-wider transition-all ${
                      tier.highlight
                        ? "bg-gradient-to-r from-brand-500 to-violet-500 text-white font-semibold shadow-lg shadow-brand-500/20"
                        : "bg-white/5 border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--corner-color)]"
                    }`}
                  >
                    {tier.cta} [→]
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQs Section */}
        <div className="border-t border-[var(--border-color)] pt-16 max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--corner-color)] inline-block px-3 py-1 bg-white/5 border border-[var(--border-color)] mb-3">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extralight uppercase tracking-tight text-[var(--text-primary)]">
              Got questions? <span className="gradient-text">We have answers.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            {faqs.map((faq) => (
              <div key={faq.q} className="corner-box glass-card p-6 space-y-2">
                <h4 className="text-sm font-semibold text-[var(--text-primary)] uppercase">
                  {faq.q}
                </h4>
                <p className="text-[var(--text-tertiary)] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

const tiers = [
  {
    name: "Developer",
    tagline: "FOR HOBBYISTS & PROTOTYPES",
    priceMonthly: 0,
    priceAnnual: 0,
    description: "Ideal for personal projects, open-source landing pages, and rapid testing.",
    cta: "Start Free",
    highlight: false,
    features: [
      "Up to 3 Active Projects",
      "Vercel Adapter Integration",
      "Automatic GitHub Repository Sync",
      "White-labeled DNS Records",
      "100GB Bandwidth / month",
      "Community Support",
    ],
  },
  {
    name: "Pro",
    tagline: "FOR GROWING TEAMS & AGENCIES",
    priceMonthly: 29,
    priceAnnual: 23,
    description: "Full access to VPS Webhooks, unlimited deployments, and white-label branding.",
    cta: "Upgrade to Pro",
    highlight: true,
    features: [
      "Unlimited Active Projects",
      "Vercel + Self-Hosted VPS Adapters",
      "Custom Brand White-Labeling",
      "Instant DNS Instruction Generator",
      "1TB Bandwidth / month",
      "Priority Email & Slack Support",
      "Automatic SSL Provisioning",
    ],
  },
  {
    name: "Enterprise",
    tagline: "FOR HIGH-SCALE INFRASTRUCTURE",
    priceMonthly: 149,
    priceAnnual: 119,
    description: "Dedicated cluster orchestration, custom SLAs, and custom hosting adapters.",
    cta: "Contact Sales",
    highlight: false,
    features: [
      "Everything in Pro",
      "Custom Hosting Adapter API",
      "Dedicated VPS Infrastructure Mesh",
      "99.99% Uptime Guarantee SLA",
      "Unlimited Bandwidth & Builds",
      "Dedicated 24/7 Solutions Engineer",
      "SOC2 & GDPR Compliance",
    ],
  },
];

const faqs = [
  {
    q: "How does white-labeled hosting work?",
    a: "oitocloud generates generic A and CNAME records pointing to global edge infrastructure, allowing your clients to configure DNS without seeing third-party hosting references.",
  },
  {
    q: "Can I deploy to my own self-hosted VPS?",
    a: "Yes! Our VPSAdapter sends HTTP Webhook payloads to platforms like Coolify, CapRover, or custom Docker deployment servers.",
  },
  {
    q: "Is there a limit on GitHub repository pushes?",
    a: "No. GitHub operations use the official Git Data API (blobs, trees, commits) with no artificial limits on deployment frequency.",
  },
  {
    q: "Can I change my plan anytime?",
    a: "Yes, you can upgrade, downgrade, or cancel your subscription at any time directly from the billing dashboard.",
  },
];
