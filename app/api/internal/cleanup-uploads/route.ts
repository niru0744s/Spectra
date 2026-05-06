import { NextRequest, NextResponse } from "next/server";
import { cleanupExpiredUploads } from "@/lib/storage";

export async function POST(req: NextRequest) {
  const token = req.headers.get("x-cleanup-token");
  const expected = process.env.CLEANUP_TOKEN;

  if (!expected || token !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = cleanupExpiredUploads();
    return NextResponse.json({
      ok: true,
      deleted: result.deleted,
      remaining: result.remaining,
    });
  } catch (error) {
    console.error("Cleanup failed:", error);
    return NextResponse.json(
      { error: "Cleanup failed" },
      { status: 500 }
    );
  }
}
