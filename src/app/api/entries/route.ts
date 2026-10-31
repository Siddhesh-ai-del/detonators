import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { createDbEntry } from "@/lib/db-entries";
import type { EntryType } from "@/lib/content";

export async function POST(request: Request) {
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

  const body = await request.json();
  const type = (body.type ?? "post") as EntryType;
  const title = String(body.title ?? "").trim();
  const date = String(body.date ?? "").trim();
  const summary = String(body.summary ?? "").trim();
  const tags = Array.isArray(body.tags)
    ? body.tags.map(String)
    : String(body.tags ?? "")
        .split(",")
        .map((t: string) => t.trim())
        .filter(Boolean);
  const image = body.image ? String(body.image).trim() : undefined;
  const imageAlt = body.imageAlt ? String(body.imageAlt).trim() : undefined;
  const entryBody = String(body.body ?? "").trim();

  if (!title || !date) {
    return NextResponse.json(
      { error: "Title and date are required." },
      { status: 400 }
    );
  }

  const entry = createDbEntry({
    type,
    title,
    date,
    summary,
    tags,
    image,
    imageAlt,
    body: entryBody,
    authorEmail: session.user.email,
  });

  return NextResponse.json({ slug: entry.slug, type: entry.type });
}