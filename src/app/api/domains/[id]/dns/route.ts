import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { generateDNSInstructions } from "@/lib/dns";
import type { AdapterType } from "@/types";

/**
 * GET /api/domains/[id]/dns — Get DNS configuration instructions
 *
 * Returns white-labeled DNS records and instructions for the domain,
 * masking the underlying hosting provider.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();

    // Get domain and associated project
    const result = await db.execute({
      sql: `SELECT d.domain, p.adapter
            FROM domains d
            JOIN projects p ON d.project_id = p.id
            WHERE d.id = ?`,
      args: [id],
    });

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Domain not found" },
        { status: 404 }
      );
    }

    const row = result.rows[0];
    const domain = row.domain as string;
    const adapter = row.adapter as AdapterType;

    const instructions = generateDNSInstructions(domain, adapter);

    return NextResponse.json(instructions);
  } catch (error) {
    console.error("GET /api/domains/[id]/dns error:", error);
    return NextResponse.json(
      { error: "Failed to generate DNS instructions" },
      { status: 500 }
    );
  }
}
