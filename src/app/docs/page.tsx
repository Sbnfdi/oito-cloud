"use client";

import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Image from "next/image";

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<"engine" | "vault" | "dns" | "api">("engine");

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] architectural-grid pt-24 pb-20 px-6">
      <Navbar />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--corner-color)] inline-block px-3 py-1 bg-white/5 border border-[var(--border-color)]">
            oitocloud SYSTEM ARCHITECTURE & API DOCUMENTATION
          </span>
          <h1 className="text-4xl sm:text-6xl font-extralight uppercase tracking-tight text-[var(--text-primary)]">
            Cloud <span className="gradient-text">Documentation</span>
          </h1>
          <p className="text-xs font-mono text-[var(--text-tertiary)] leading-relaxed">
            Everything you need to understand oitocloud proprietary cloud engine architecture, Code Vault storage, domain routing, and platform APIs.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-3 border-b border-[var(--border-color)] pb-4 font-mono text-xs">
          {[
            { id: "engine", label: "01 // Cloud Compute Engine" },
            { id: "vault", label: "02 // oitocloud Code Vault" },
            { id: "dns", label: "03 // Domain Manager" },
            { id: "api", label: "04 // Platform API" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 corner-box uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "bg-brand-500/20 text-brand-400 border border-brand-500/40"
                  : "bg-white/5 text-[var(--text-tertiary)] border border-[var(--border-color)] hover:text-[var(--text-primary)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === "engine" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 font-mono text-xs">
                  <h3 className="text-xl font-extralight uppercase text-[var(--text-primary)]">
                    oitocloud <span className="gradient-text">Cloud Engine Architecture</span>
                  </h3>
                  <p className="text-[var(--text-tertiary)] leading-relaxed">
                    oitocloud runs on a high-speed proprietary cloud mesh designed for instant deployment of full-stack Next.js applications, static frontends, and microservices.
                  </p>
                  <p className="text-[var(--text-tertiary)] leading-relaxed">
                    Deployments are executed across shared global edge nodes for minimum latency or dedicated compute clusters for enterprise isolation.
                  </p>
                </div>
                <div className="corner-box glass-card p-3">
                  <div className="relative w-full aspect-[16/9] overflow-hidden border border-[var(--border-color)]">
                    <Image
                      src="/multi_provider.jpg"
                      alt="oitocloud Cloud Engine Architecture"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="corner-box glass-card p-6 font-mono text-xs overflow-x-auto space-y-2">
                <div className="text-[10px] text-[var(--corner-color)] uppercase tracking-wider mb-2">
                  oitocloud Compute Engine Interface
                </div>
                <pre className="text-white/80 leading-relaxed">
{`export interface OitoCloudEngine {
  readonly clusterVersion: "2.4-stable";
  createCloudProject(config: ProjectConfig): Promise<{ projectId: string }>;
  deployToEdge(projectId: string, source: DeploySource): Promise<DeploymentResult>;
  getClusterStatus(deployId: string): Promise<DeploymentResult>;
  purgeDeployment(projectId: string): Promise<void>;
}`}
                </pre>
              </div>
            </div>
          )}

          {activeTab === "vault" && (
            <div className="space-y-8">
              <div className="space-y-4 font-mono text-xs">
                <h3 className="text-xl font-extralight uppercase text-[var(--text-primary)]">
                  oitocloud <span className="gradient-text">Code Vault & CI/CD Pipeline</span>
                </h3>
                <p className="text-[var(--text-tertiary)] leading-relaxed">
                  Source code uploaded to oitocloud is stored in an encrypted Code Vault. Files are indexed into atomic transaction trees and deployed directly to oitocloud edge nodes.
                </p>
              </div>

              {/* Code Snippet */}
              <div className="corner-box glass-card p-6 font-mono text-xs overflow-x-auto space-y-2">
                <div className="text-[10px] text-[var(--corner-color)] uppercase tracking-wider mb-2">
                  oitocloud Atomic Deployment Transaction
                </div>
                <pre className="text-white/80 leading-relaxed">
{`export async function deployToVault(projectId: string, files: Array<{path: string, content: string}>) {
  // 1. Initialize Code Vault transaction
  const vault = await oitoCloudVault.createTransaction({ projectId });

  // 2. Commit atomic code snapshot to oitocloud storage
  const snapshot = await vault.commitFiles(files, { encryption: "AES-256-GCM" });

  // 3. Trigger build & distribute across oitocloud global mesh
  const deployment = await oitoCloudMesh.deploySnapshot(snapshot.id);
  return deployment;
}`}
                </pre>
              </div>
            </div>
          )}

          {activeTab === "dns" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 font-mono text-xs">
                  <h3 className="text-xl font-extralight uppercase text-[var(--text-primary)]">
                    Native <span className="gradient-text">Domain Manager</span>
                  </h3>
                  <p className="text-[var(--text-tertiary)] leading-relaxed">
                    Connect custom domain names directly to oitocloud cloud nodes. Our automated Domain Manager issues SSL certificates and provides clear A and CNAME record configuration instructions.
                  </p>
                </div>
                <div className="corner-box glass-card p-3">
                  <div className="relative w-full aspect-[16/9] overflow-hidden border border-[var(--border-color)]">
                    <Image
                      src="/dns_security.jpg"
                      alt="oitocloud Domain Manager"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="space-y-6 font-mono text-xs">
              <h3 className="text-xl font-extralight uppercase text-[var(--text-primary)] mb-6">
                Platform <span className="gradient-text">REST API Reference</span>
              </h3>

              {[
                {
                  method: "POST",
                  path: "/api/projects",
                  desc: "Initialize a new project and secure storage in oitocloud Code Vault.",
                },
                {
                  method: "POST",
                  path: "/api/deploy",
                  desc: "Trigger a deployment snapshot and build across oitocloud edge nodes.",
                },
                {
                  method: "GET",
                  path: "/api/domains/[id]/dns",
                  desc: "Generate DNS configuration instructions for custom domain routing.",
                },
              ].map((api) => (
                <div key={api.path} className="corner-box glass-card p-6 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-brand-500/20 text-brand-400 border border-brand-500/30 font-bold">
                      {api.method}
                    </span>
                    <span className="text-sm font-semibold text-[var(--text-primary)]">
                      {api.path}
                    </span>
                  </div>
                  <p className="text-[var(--text-tertiary)] pt-2 leading-relaxed">
                    {api.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
