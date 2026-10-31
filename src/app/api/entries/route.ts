import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { createDbEntry, getDbEntries } from "@/lib/db-entries";
import { getAllEntries } from "@/lib/content";
import type { EntryType } from "@/lib/content";

const createSchema = z.object({
  type: z.enum(["event", "hackathon", "post"]).default("post"),
  title: z.string().trim().min(1).max(200),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  summary: z.string().trim().max(500).default(""),
  tags: z.array(z.string().trim().min(1).max(40)).max(20).default([]),
  image: z.string().trim().max(500).optional(),
  imageAlt: z.string().trim().max(200).optional(),
  body: z.string().max(20000).default(""),
});

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    const limit = Math.min(
      Math.max(Number(url.searchParams.get("limit") ?? 50), 1),
      100
    );
    const offset = Math.max(Number(url.searchParams.get("offset") ?? 0), 0);

    let entries = await getAllEntries();
    if (type && ["event", "hackathon", "post"].includes(type)) {
      entries = entries.filter((e) => e.type === type);
    }
    const total = entries.length;
    const page = entries.slice(offset, offset + limit);

    return NextResponse.json({ total, limit, offset, entries: page });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch entries." },
      { status: 500 }
    );
  }
}

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

    const json = await request.json();
    const parsed = createSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input.", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const entry = await createDbEntry({
      type: data.type as EntryType,
      title: data.title,
      date: data.date,
      summary: data.summary,
      tags: data.tags,
      image: data.image,
      imageAlt: data.imageAlt,
      body: data.body,
      authorEmail: session.user.email,
    });

    return NextResponse.json({ slug: entry.slug, type: entry.type }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create entry." },
      { status: 500 }
    );
  }
}