// ─── Project Types ───────────────────────────────────────────────

export type ProjectStatus = 'live' | 'building' | 'failed' | 'idle';
export type AdapterType = 'vercel' | 'vps';

export interface Project {
  id: string;
  name: string;
  slug: string;
  githubRepo: string | null;
  status: ProjectStatus;
  liveUrl: string | null;
  adapter: AdapterType;
  createdAt: string;
  updatedAt: string;
}

// ─── Domain Types ────────────────────────────────────────────────

export interface Domain {
  id: string;
  projectId: string;
  domain: string;
  dnsConfigured: boolean;
  createdAt: string;
}

export interface DNSRecord {
  type: 'A' | 'CNAME' | 'TXT';
  host: string;
  value: string;
  ttl: number;
}

export interface DNSInstructions {
  domain: string;
  records: DNSRecord[];
  provider: string;
  instructions: string;
}

// ─── Deployment Types ────────────────────────────────────────────

export type DeployStatus = 'pending' | 'syncing' | 'provisioning' | 'deploying' | 'ready' | 'error';

export interface Deployment {
  id: string;
  projectId: string;
  status: DeployStatus;
  providerDeployId: string | null;
  logs: string | null;
  startedAt: string;
  completedAt: string | null;
}

export interface DeployStep {
  id: string;
  label: string;
  description: string;
  status: 'pending' | 'active' | 'complete' | 'error';
}

// ─── Upload Types ────────────────────────────────────────────────

export interface UploadedFile {
  path: string;
  content: string; // base64
  size: number;
}

// ─── Adapter Types ───────────────────────────────────────────────

export interface ProjectConfig {
  name: string;
  slug: string;
  framework?: string;
  githubRepo?: string;
}

export interface DeploySource {
  type: 'github';
  repoFullName: string;
  branch: string;
}

export interface DeploymentResult {
  id: string;
  url: string | null;
  status: 'pending' | 'building' | 'ready' | 'error';
}

// ─── Nav Types ───────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}
