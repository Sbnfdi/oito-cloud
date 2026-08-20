import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { createRepository } from "@/lib/github";
import { v4 as uuid } from "uuid";

// Import adapters to register them
import "@/lib/adapters/VercelAdapter";
import "@/lib/adapters/VPSAdapter";
import { getAdapter } from "@/lib/adapters/HostingAdapter";

/**
 * GET /api/projects — List all projects
 */
export async function GET() {
  try {
    const db = getDb();
    const result = await db.execute("SELECT * FROM projects ORDER BY created_at DESC");

    const projects = result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      githubRepo: row.github_repo,
      status: row.status,
      liveUrl: row.live_url,
      adapter: row.adapter,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/projects — Create a new project
 *
 * Body: { name: string, adapter?: 'vercel' | 'vps', framework?: string }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, adapter: adapterName = "vercel", framework } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Project name is required" },
        { status: 400 }
      );
    }

    const id = uuid();
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    // 1. Create GitHub repo
    let githubRepo: string | null = null;
    try {
      const repo = await createRepository(slug);
      githubRepo = `${repo.owner}/${repo.repo}`;
    } catch (err) {
      console.warn("GitHub repo creation skipped:", err);
    }

    // 2. Create hosting project via adapter
    let providerProjectId: string | null = null;
    try {
      const adapter = getAdapter(adapterName);
      const result = await adapter.createProject({
        name,
        slug,
        framework,
        githubRepo: githubRepo || undefined,
      });
      providerProjectId = result.projectId;
    } catch (err) {
      console.warn("Hosting project creation skipped:", err);
    }

    // 3. Save to database
    const db = getDb();
    await db.execute({
      sql: `INSERT INTO projects (id, name, slug, github_repo, status, adapter)
            VALUES (?, ?, ?, ?, 'idle', ?)`,
      args: [id, name, slug, githubRepo, adapterName],
    });

    return NextResponse.json({
      project: {
        id,
        name,
        slug,
        githubRepo,
        status: "idle",
        liveUrl: null,
        adapter: adapterName,
        providerProjectId,
      },
    }, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
