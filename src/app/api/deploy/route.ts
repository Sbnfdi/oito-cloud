import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { pushFiles } from "@/lib/github";
import { v4 as uuid } from "uuid";

// Import adapters to register them
import "@/lib/adapters/VercelAdapter";
import "@/lib/adapters/VPSAdapter";
import { getAdapter } from "@/lib/adapters/HostingAdapter";

/**
 * POST /api/deploy — Trigger a deployment
 *
 * Body: {
 *   projectId: string,
 *   files?: Array<{ path: string, content: string }>  // base64 content
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectId, files } = body;

    if (!projectId) {
      return NextResponse.json(
        { error: "projectId is required" },
        { status: 400 }
      );
    }

    const db = getDb();

    // 1. Get the project
    const projectResult = await db.execute({
      sql: "SELECT * FROM projects WHERE id = ?",
      args: [projectId],
    });

    if (projectResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    const project = projectResult.rows[0];
    const deploymentId = uuid();

    // 2. Create deployment record
    await db.execute({
      sql: `INSERT INTO deployments (id, project_id, status)
            VALUES (?, ?, 'pending')`,
      args: [deploymentId, projectId],
    });

    // Update project status to building
    await db.execute({
      sql: "UPDATE projects SET status = 'building', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      args: [projectId],
    });

    // 3. Push files to GitHub (if provided)
    if (files && files.length > 0 && project.github_repo) {
      const [owner, repo] = (project.github_repo as string).split("/");
      try {
        await pushFiles(owner, repo, files, `deploy: ${deploymentId}`);
        await db.execute({
          sql: "UPDATE deployments SET status = 'syncing' WHERE id = ?",
          args: [deploymentId],
        });
      } catch (err) {
        console.error("GitHub push failed:", err);
        await db.execute({
          sql: "UPDATE deployments SET status = 'error', logs = ? WHERE id = ?",
          args: [`GitHub push failed: ${err}`, deploymentId],
        });
        await db.execute({
          sql: "UPDATE projects SET status = 'failed', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
          args: [projectId],
        });
        return NextResponse.json(
          { error: "Failed to push files to GitHub", deploymentId },
          { status: 500 }
        );
      }
    }

    // 4. Trigger deployment via adapter
    try {
      const adapter = getAdapter(project.adapter as string);
      const result = await adapter.deploy(projectId, {
        type: "github",
        repoFullName: project.github_repo as string,
        branch: "main",
      });

      await db.execute({
        sql: "UPDATE deployments SET status = 'deploying', provider_deploy_id = ? WHERE id = ?",
        args: [result.id, deploymentId],
      });

      if (result.url) {
        await db.execute({
          sql: "UPDATE projects SET live_url = ?, status = 'live', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
          args: [result.url, projectId],
        });
      }

      return NextResponse.json({
        deploymentId,
        providerDeployId: result.id,
        url: result.url,
        status: result.status,
      });
    } catch (err) {
      console.error("Deployment failed:", err);
      await db.execute({
        sql: "UPDATE deployments SET status = 'error', logs = ? WHERE id = ?",
        args: [`Deployment failed: ${err}`, deploymentId],
      });
      await db.execute({
        sql: "UPDATE projects SET status = 'failed', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        args: [projectId],
      });
      return NextResponse.json(
        { error: "Deployment failed", deploymentId },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("POST /api/deploy error:", error);
    return NextResponse.json(
      { error: "Failed to process deployment" },
      { status: 500 }
    );
  }
}
