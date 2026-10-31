import { NextResponse } from "next/server";
import { db } from "@/lib/auth";

export async function GET() {
  try {
    db.prepare("SELECT 1").get();
    return NextResponse.json({ status: "ok", timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Database unavailable" },
      { status: 503 }
    );
  }
}