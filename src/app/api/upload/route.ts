import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import fs from "node:fs";
import path from "node:path";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminEmails = (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    if (!adminEmails.includes(session.user.email.toLowerCase())) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    if (file.size === 0) {
      return NextResponse.json({ error: "Empty file." }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large (max 5 MB)." },
        { status: 413 }
      );
    }
    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type." },
        { status: 415 }
      );
    }

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import("@vercel/blob");
      const blob = await put(file.name, file, { access: "public" });
      return NextResponse.json({ url: blob.url });
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    const ext = path.extname(file.name) || ".bin";
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    const filePath = path.join(uploadsDir, safeName);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({ url: `/uploads/${safeName}` });
  } catch (error) {
    return NextResponse.json(
      { error: "Upload failed." },
      { status: 500 }
    );
  }
}