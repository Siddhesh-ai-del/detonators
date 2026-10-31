import { db, type DbEntryRow } from "@/lib/auth";
import type { Entry, EntryType } from "@/lib/content";

function rowToEntry(row: DbEntryRow): Entry {
  return {
    slug: row.slug,
    type: row.type,
    title: row.title,
    date: row.date,
    summary: row.summary,
    tags: safeParseArray(row.tags),
    image: row.image ?? undefined,
    imageAlt: row.imageAlt ?? undefined,
    images: safeParseArray(row.images),
    body: row.body,
    views: row.views ?? 0,
  };
}

function safeParseArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export function getDbEntries(): Entry[] {
  const rows = db
    .prepare("SELECT * FROM entries ORDER BY date DESC")
    .all() as DbEntryRow[];
  return rows.map(rowToEntry);
}

export function getDbEntry(type: EntryType, slug: string): Entry | null {
  const row = db
    .prepare("SELECT * FROM entries WHERE type = ? AND slug = ?")
    .get(type, slug) as DbEntryRow | undefined;
  return row ? rowToEntry(row) : null;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function createDbEntry(input: {
  type: EntryType;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  images?: string[];
  body: string;
  authorEmail?: string;
}): Entry {
  const base = slugify(input.title) || "entry";
  let slug = base;
  let suffix = 1;
  while (
    db.prepare("SELECT 1 FROM entries WHERE slug = ?").get(slug) ||
    // avoid colliding with static slugs by prefixing db entries
    false
  ) {
    slug = `${base}-${suffix++}`;
  }
  // Prefix to avoid colliding with static content slugs
  slug = `u-${slug}`;

  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO entries (slug, type, title, date, summary, tags, image, imageAlt, images, body, authorEmail, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    slug,
    input.type,
    input.title,
    input.date,
    input.summary,
    JSON.stringify(input.tags),
    input.image || null,
    input.imageAlt || null,
    JSON.stringify(input.images ?? []),
    input.body,
    input.authorEmail || null,
    now
  );

  return {
    slug,
    type: input.type,
    title: input.title,
    date: input.date,
    summary: input.summary,
    tags: input.tags,
    image: input.image,
    imageAlt: input.imageAlt,
    images: input.images,
    body: input.body,
    views: 0,
  };
}

export function incrementViews(type: EntryType, slug: string): void {
  db.prepare(
    "UPDATE entries SET views = views + 1 WHERE type = ? AND slug = ?"
  ).run(type, slug);
}