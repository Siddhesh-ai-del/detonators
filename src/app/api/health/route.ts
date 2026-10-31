import { NextResponse } from "next/server";
import { libsqlClient } from "@/lib/auth";

export async function GET() {
  try {
    await libsqlClient.execute("SELECT 1");
    return NextResponse.json({ status: "ok", timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Database unavailable" },
      { status: 503 }
    );
  }
}