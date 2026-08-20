import { NextRequest, NextResponse } from "next/server";
import { MAX_UPLOAD_SIZE } from "@/lib/constants";

/**
 * POST /api/upload — Process file uploads
 *
 * Accepts multipart/form-data with file(s).
 * Returns a list of processed files ready for GitHub commit.
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files: Array<{ path: string; content: string; size: number }> = [];

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        if (value.size > MAX_UPLOAD_SIZE) {
          return NextResponse.json(
            { error: `File "${value.name}" exceeds ${MAX_UPLOAD_SIZE / (1024 * 1024)}MB limit` },
            { status: 400 }
          );
        }

        const buffer = Buffer.from(await value.arrayBuffer());
        const content = buffer.toString("base64");

        files.push({
          path: key || value.name,
          content,
          size: value.size,
        });
      }
    }

    if (files.length === 0) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      files: files.map((f) => ({
        path: f.path,
        size: f.size,
        content: f.content,
      })),
      totalFiles: files.length,
      totalSize: files.reduce((sum, f) => sum + f.size, 0),
    });
  } catch (error) {
    console.error("POST /api/upload error:", error);
    return NextResponse.json(
      { error: "Failed to process upload" },
      { status: 500 }
    );
  }
}
