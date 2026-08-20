import type { DeploymentResult, ProjectConfig, DeploySource } from "@/types";
import { type HostingAdapter, registerAdapter } from "./HostingAdapter";

/**
 * VPSAdapter — deploys via webhook to self-hosted infrastructure.
 *
 * Designed to work with Docker-based platforms like Coolify, CapRover,
 * or any custom deployment server that accepts webhook POSTs.
 *
 * Environment variables:
 * - VPS_WEBHOOK_URL: The endpoint to POST deployment events to
 * - VPS_SERVER_IP: The server IP for DNS A-record configuration
 */
class VPSAdapter implements HostingAdapter {
  readonly name = "vps";

  private get webhookUrl(): string {
    const url = process.env.VPS_WEBHOOK_URL;
    if (!url) throw new Error("VPS_WEBHOOK_URL environment variable is required");
    return url;
  }

  async createProject(config: ProjectConfig): Promise<{ projectId: string }> {
    const res = await fetch(this.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "create_project",
        project: {
          name: config.slug,
          framework: config.framework || "static",
          repo: config.githubRepo,
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`VPS createProject failed: ${res.status} ${err}`);
    }

    const data = await res.json();
    return { projectId: data.projectId || config.slug };
  }

  async deploy(
    projectId: string,
    source: DeploySource
  ): Promise<DeploymentResult> {
    const res = await fetch(this.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "deploy",
        projectId,
        source: {
          repo: source.repoFullName,
          branch: source.branch,
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`VPS deploy failed: ${res.status} ${err}`);
    }

    const data = await res.json();
    return {
      id: data.deploymentId || `vps-${Date.now()}`,
      url: data.url || null,
      status: "building",
    };
  }

  async getDeploymentStatus(deployId: string): Promise<DeploymentResult> {
    const res = await fetch(
      `${this.webhookUrl}?action=status&deploymentId=${deployId}`,
      { method: "GET" }
    );

    if (!res.ok) {
      return {
        id: deployId,
        url: null,
        status: "error",
      };
    }

    const data = await res.json();
    return {
      id: deployId,
      url: data.url || null,
      status: data.status || "pending",
    };
  }

  async deleteProject(projectId: string): Promise<void> {
    await fetch(this.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "delete_project",
        projectId,
      }),
    });
  }
}

// Self-register
const vpsAdapter = new VPSAdapter();
registerAdapter(vpsAdapter);

export default vpsAdapter;
