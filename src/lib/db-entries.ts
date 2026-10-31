import { libsqlClient, type DbEntryRow } from "@/lib/auth";
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

export async function getDbEntries(): Promise<Entry[]> {
  const result = await libsqlClient.execute("SELECT * FROM entries ORDER BY date DESC");
  return (result.rows as unknown as DbEntryRow[]).map(rowToEntry);
}

export async function getDbEntry(
  type: EntryType,
  slug: string
): Promise<Entry | null> {
  const result = await libsqlClient.execute({
    sql: "SELECT * FROM entries WHERE type = ? AND slug = ?",
    args: [type, slug],
  });
  const row = result.rows[0] as unknown as DbEntryRow | undefined;
  return row ? rowToEntry(row) : null;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createDbEntry(input: {
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
}): Promise<Entry> {
  const base = slugify(input.title) || "entry";
  let slug = `u-${base}`;

  // Ensure uniqueness.
  let suffix = 1;
  while (true) {
    const existing = await libsqlClient.execute({
      sql: "SELECT 1 FROM entries WHERE slug = ?",
      args: [slug],
    });
    if (existing.rows.length === 0) break;
    slug = `u-${base}-${suffix++}`;
  }

  const now = new Date().toISOString();
  await libsqlClient.execute({
    sql: `INSERT INTO entries (slug, type, title, date, summary, tags, image, imageAlt, images, body, authorEmail, views, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
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
      0,
      now,
    ],
  });

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

export async function incrementViews(type: EntryType, slug: string): Promise<void> {
  await libsqlClient.execute({
    sql: "UPDATE entries SET views = views + 1 WHERE type = ? AND slug = ?",
    args: [type, slug],
  });
}