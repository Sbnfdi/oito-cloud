import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { v4 as uuid } from "uuid";

/**
 * GET /api/domains — List all domains
 */
export async function GET() {
  try {
    const db = getDb();
    const result = await db.execute(
      "SELECT d.*, p.name as project_name FROM domains d LEFT JOIN projects p ON d.project_id = p.id ORDER BY d.created_at DESC"
    );

    const domains = result.rows.map((row) => ({
      id: row.id,
      projectId: row.project_id,
      domain: row.domain,
      dnsConfigured: Boolean(row.dns_configured),
      projectName: row.project_name,
      createdAt: row.created_at,
    }));

    return NextResponse.json({ domains });
  } catch (error) {
    console.error("GET /api/domains error:", error);
    return NextResponse.json(
      { error: "Failed to fetch domains" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/domains — Add a domain
 *
 * Body: { domain: string, projectId: string }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { domain, projectId } = body;

    if (!domain || !projectId) {
      return NextResponse.json(
        { error: "domain and projectId are required" },
        { status: 400 }
      );
    }

    const id = uuid();
    const db = getDb();

    await db.execute({
      sql: "INSERT INTO domains (id, project_id, domain) VALUES (?, ?, ?)",
      args: [id, projectId, domain],
    });

    return NextResponse.json(
      { domain: { id, projectId, domain, dnsConfigured: false } },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/domains error:", error);
    return NextResponse.json(
      { error: "Failed to add domain" },
      { status: 500 }
    );
  }
}
