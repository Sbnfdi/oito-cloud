import type { DeploymentResult, ProjectConfig, DeploySource } from "@/types";
import { type HostingAdapter, registerAdapter } from "./HostingAdapter";

const VERCEL_API = "https://api.vercel.com";

/**
 * VercelAdapter — deploys projects via the Vercel REST API.
 *
 * - createProject() → POST /v9/projects
 * - deploy()        → POST /v13/deployments
 * - getDeploymentStatus() → GET /v13/deployments/{id}
 * - deleteProject() → DELETE /v9/projects/{id}
 */
class VercelAdapter implements HostingAdapter {
  readonly name = "vercel";

  private get token(): string {
    const t = process.env.VERCEL_TOKEN;
    if (!t) throw new Error("VERCEL_TOKEN environment variable is required");
    return t;
  }

  private headers(): HeadersInit {
    return {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };
  }

  async createProject(config: ProjectConfig): Promise<{ projectId: string }> {
    const body: Record<string, unknown> = {
      name: config.slug,
      framework: config.framework || "nextjs",
    };

    if (config.githubRepo) {
      body.gitRepository = {
        type: "github",
        repo: config.githubRepo,
      };
    }

    const res = await fetch(`${VERCEL_API}/v9/projects`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Vercel createProject failed: ${res.status} ${err}`);
    }

    const data = await res.json();
    return { projectId: data.id };
  }

  async deploy(
    projectId: string,
    source: DeploySource
  ): Promise<DeploymentResult> {
    const [, repo] = source.repoFullName.split("/");

    const res = await fetch(`${VERCEL_API}/v13/deployments`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify({
        name: repo,
        project: projectId,
        gitSource: {
          type: "github",
          repo: source.repoFullName,
          ref: source.branch,
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Vercel deploy failed: ${res.status} ${err}`);
    }

    const data = await res.json();
    return {
      id: data.id,
      url: data.url ? `https://${data.url}` : null,
      status: mapVercelStatus(data.readyState || data.status),
    };
  }

  async getDeploymentStatus(deployId: string): Promise<DeploymentResult> {
    const res = await fetch(`${VERCEL_API}/v13/deployments/${deployId}`, {
      headers: this.headers(),
    });

    if (!res.ok) {
      throw new Error(`Vercel getDeploymentStatus failed: ${res.status}`);
    }

    const data = await res.json();
    return {
      id: data.id,
      url: data.url ? `https://${data.url}` : null,
      status: mapVercelStatus(data.readyState),
    };
  }

  async deleteProject(projectId: string): Promise<void> {
    const res = await fetch(`${VERCEL_API}/v9/projects/${projectId}`, {
      method: "DELETE",
      headers: this.headers(),
    });

    if (!res.ok && res.status !== 404) {
      throw new Error(`Vercel deleteProject failed: ${res.status}`);
    }
  }
}

function mapVercelStatus(
  state: string
): DeploymentResult["status"] {
  switch (state) {
    case "READY":
      return "ready";
    case "BUILDING":
    case "INITIALIZING":
      return "building";
    case "ERROR":
    case "CANCELED":
      return "error";
    default:
      return "pending";
  }
}

// Self-register
const vercelAdapter = new VercelAdapter();
registerAdapter(vercelAdapter);

export default vercelAdapter;
