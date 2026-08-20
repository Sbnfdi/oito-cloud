import { createClient, type Client } from "@libsql/client";

let client: Client | null = null;

export function getDb(): Client {
  if (!client) {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!url) {
      // Fallback to local SQLite for development
      client = createClient({
        url: "file:local.db",
      });
    } else {
      client = createClient({
        url,
        authToken,
      });
    }
  }
  return client;
}

export async function initializeDatabase(): Promise<void> {
  const db = getDb();

  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      github_repo TEXT,
      status TEXT DEFAULT 'idle',
      live_url TEXT,
      adapter TEXT DEFAULT 'vercel',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS domains (
      id TEXT PRIMARY KEY,
      project_id TEXT REFERENCES projects(id),
      domain TEXT UNIQUE NOT NULL,
      dns_configured INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS deployments (
      id TEXT PRIMARY KEY,
      project_id TEXT REFERENCES projects(id),
      status TEXT DEFAULT 'pending',
      provider_deploy_id TEXT,
      logs TEXT,
      started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      completed_at DATETIME
    );
  `);
}

// Initialize on first import (server-side only)
if (typeof window === "undefined") {
  initializeDatabase().catch(console.error);
}
