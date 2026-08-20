"use client";

import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Image from "next/image";

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<"adapter" | "github" | "dns" | "api">("adapter");

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] architectural-grid pt-24 pb-20 px-6">
      <Navbar />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--corner-color)] inline-block px-3 py-1 bg-white/5 border border-[var(--border-color)]">
            ARCHITECTURE & API DOCUMENTATION
          </span>
          <h1 className="text-4xl sm:text-6xl font-extralight uppercase tracking-tight text-[var(--text-primary)]">
            Platform <span className="gradient-text">Documentation</span>
          </h1>
          <p className="text-xs font-mono text-[var(--text-tertiary)] leading-relaxed">
            Everything you need to understand the oitocloud engine architecture, custom hosting adapters, Git plumbing integrations, and REST APIs.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-3 border-b border-[var(--border-color)] pb-4 font-mono text-xs">
          {[
            { id: "adapter", label: "01 // Hosting Adapters" },
            { id: "github", label: "02 // GitHub Git Data API" },
            { id: "dns", label: "03 // White-Label DNS" },
            { id: "api", label: "04 // REST API Reference" },
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
          {activeTab === "adapter" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 font-mono text-xs">
                  <h3 className="text-xl font-extralight uppercase text-[var(--text-primary)]">
                    The Abstract <span className="gradient-text">HostingAdapter</span> Pattern
                  </h3>
                  <p className="text-[var(--text-tertiary)] leading-relaxed">
                    oitocloud uses an abstract adapter architecture. Every deployment action is routed through a unified interface (`createProject`, `deploy`, `getDeploymentStatus`, `deleteProject`).
                  </p>
                  <p className="text-[var(--text-tertiary)] leading-relaxed">
                    This decouples application logic from provider APIs, allowing developers to switch between Vercel and self-hosted VPS servers effortlessly.
                  </p>
                </div>
                <div className="corner-box glass-card p-3">
                  <div className="relative w-full aspect-[16/9] overflow-hidden border border-[var(--border-color)]">
                    <Image
                      src="/multi_provider.jpg"
                      alt="Hosting Adapter Architecture"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="corner-box glass-card p-6 font-mono text-xs overflow-x-auto space-y-2">
                <div className="text-[10px] text-[var(--corner-color)] uppercase tracking-wider mb-2">
                  src/lib/adapters/HostingAdapter.ts
                </div>
                <pre className="text-white/80 leading-relaxed">
{`export interface HostingAdapter {
  readonly name: string;
  createProject(config: ProjectConfig): Promise<{ projectId: string }>;
  deploy(projectId: string, source: DeploySource): Promise<DeploymentResult>;
  getDeploymentStatus(deployId: string): Promise<DeploymentResult>;
  deleteProject(projectId: string): Promise<void>;
}`}
                </pre>
              </div>
            </div>
          )}

          {activeTab === "github" && (
            <div className="space-y-8">
              <div className="space-y-4 font-mono text-xs">
                <h3 className="text-xl font-extralight uppercase text-[var(--text-primary)]">
                  Git Data API <span className="gradient-text">Batch Commit Workflow</span>
                </h3>
                <p className="text-[var(--text-tertiary)] leading-relaxed">
                  Instead of issuing individual REST calls per file, oitocloud leverages GitHub&apos;s low-level Git Data API. Files are converted to base64 blobs, mapped into a single Tree object, committed, and pushed to `heads/main` in one transaction.
                </p>
              </div>

              {/* Code Snippet */}
              <div className="corner-box glass-card p-6 font-mono text-xs overflow-x-auto space-y-2">
                <div className="text-[10px] text-[var(--corner-color)] uppercase tracking-wider mb-2">
                  src/lib/github.ts — Batch Git Commit
                </div>
                <pre className="text-white/80 leading-relaxed">
{`export async function pushFiles(owner: string, repo: string, files: Array<{path: string, content: string}>) {
  // 1. Get HEAD commit & base tree SHA
  const ref = await octokit.rest.git.getRef({ owner, repo, ref: "heads/main" });
  const commit = await octokit.rest.git.getCommit({ owner, repo, commit_sha: ref.data.object.sha });

  // 2. Create Blobs for each uploaded file
  const tree = await Promise.all(files.map(async (file) => {
    const blob = await octokit.rest.git.createBlob({ owner, repo, content: file.content, encoding: "base64" });
    return { path: file.path, mode: "100644", type: "blob", sha: blob.data.sha };
  }));

  // 3. Create Tree & Commit, then update branch reference
  const newTree = await octokit.rest.git.createTree({ owner, repo, base_tree: commit.data.tree.sha, tree });
  const newCommit = await octokit.rest.git.createCommit({ owner, repo, message: "deploy via oitocloud", tree: newTree.data.sha, parents: [ref.data.object.sha] });
  await octokit.rest.git.updateRef({ owner, repo, ref: "heads/main", sha: newCommit.data.sha });
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
                    White-Label <span className="gradient-text">DNS Generator</span>
                  </h3>
                  <p className="text-[var(--text-tertiary)] leading-relaxed">
                    When connecting custom domains, `generateDNSInstructions()` produces branded A and CNAME record instructions tailored to the underlying adapter without revealing provider-specific URLs.
                  </p>
                </div>
                <div className="corner-box glass-card p-3">
                  <div className="relative w-full aspect-[16/9] overflow-hidden border border-[var(--border-color)]">
                    <Image
                      src="/dns_security.jpg"
                      alt="DNS Routing Security"
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
                  desc: "Create a project, initialize private GitHub repository, and setup hosting provider.",
                },
                {
                  method: "POST",
                  path: "/api/deploy",
                  desc: "Trigger a deployment, push batch files to GitHub, and invoke adapter deployment.",
                },
                {
                  method: "GET",
                  path: "/api/domains/[id]/dns",
                  desc: "Generate white-labeled DNS configuration instructions for custom domain routing.",
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
