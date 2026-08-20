import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

/**
 * GET /api/projects/[id] — Get project by ID
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();
    const result = await db.execute({
      sql: "SELECT * FROM projects WHERE id = ?",
      args: [id],
    });

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    const row = result.rows[0];
    return NextResponse.json({
      project: {
        id: row.id,
        name: row.name,
        slug: row.slug,
        githubRepo: row.github_repo,
        status: row.status,
        liveUrl: row.live_url,
        adapter: row.adapter,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      },
    });
  } catch (error) {
    console.error("GET /api/projects/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/projects/[id] — Update project
 *
 * Body: Partial<{ name, status, liveUrl }>
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const db = getDb();

    const updates: string[] = [];
    const args: string[] = [];

    if (body.name !== undefined) {
      updates.push("name = ?");
      args.push(body.name);
    }
    if (body.status !== undefined) {
      updates.push("status = ?");
      args.push(body.status);
    }
    if (body.liveUrl !== undefined) {
      updates.push("live_url = ?");
      args.push(body.liveUrl);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    updates.push("updated_at = CURRENT_TIMESTAMP");
    args.push(id);

    await db.execute({
      sql: `UPDATE projects SET ${updates.join(", ")} WHERE id = ?`,
      args,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH /api/projects/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/projects/[id] — Delete project
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();

    // Delete associated deployments and domains first
    await db.execute({
      sql: "DELETE FROM deployments WHERE project_id = ?",
      args: [id],
    });
    await db.execute({
      sql: "DELETE FROM domains WHERE project_id = ?",
      args: [id],
    });
    await db.execute({
      sql: "DELETE FROM projects WHERE id = ?",
      args: [id],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/projects/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
