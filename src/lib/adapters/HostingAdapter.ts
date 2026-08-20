import type { DeploymentResult, ProjectConfig, DeploySource } from "@/types";

/**
 * Abstract Hosting Adapter interface.
 *
 * Implement this to add support for a new hosting provider.
 * The adapter pattern allows switching between Vercel, VPS, or
 * any future provider without changing the deployment logic.
 */
export interface HostingAdapter {
  /** Provider name identifier */
  readonly name: string;

  /** Create a new project on the hosting platform */
  createProject(config: ProjectConfig): Promise<{ projectId: string }>;

  /** Trigger a deployment */
  deploy(projectId: string, source: DeploySource): Promise<DeploymentResult>;

  /** Poll deployment status */
  getDeploymentStatus(deployId: string): Promise<DeploymentResult>;

  /** Remove a project from the hosting platform */
  deleteProject(projectId: string): Promise<void>;
}

/**
 * Registry of available adapters.
 * Use getAdapter() to retrieve an adapter by name.
 */
const adapterRegistry = new Map<string, HostingAdapter>();

export function registerAdapter(adapter: HostingAdapter): void {
  adapterRegistry.set(adapter.name, adapter);
}

export function getAdapter(name: string): HostingAdapter {
  const adapter = adapterRegistry.get(name);
  if (!adapter) {
    throw new Error(
      `Hosting adapter "${name}" not found. Available: ${[...adapterRegistry.keys()].join(", ")}`
    );
  }
  return adapter;
}

export function listAdapters(): string[] {
  return [...adapterRegistry.keys()];
}
