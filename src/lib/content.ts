import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getDbEntries, getDbEntry } from "@/lib/db-entries";

export type EntryType = "event" | "hackathon" | "post";

export interface Entry {
  slug: string;
  type: EntryType;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  body: string;
  image?: string;
  imageAlt?: string;
  images?: string[];
  views?: number;
}

const CONTENT_ROOT = path.join(process.cwd(), "content");

const TYPE_DIRS: Record<EntryType, string> = {
  event: "events",
  hackathon: "hackathons",
  post: "posts",
};

const TYPE_LABEL: Record<EntryType, string> = {
  event: "Event",
  hackathon: "Hackathon",
  post: "Post",
};

export function typeLabel(type: EntryType): string {
  return TYPE_LABEL[type];
}

function readDir(type: EntryType): Entry[] {
  const dir = path.join(CONTENT_ROOT, TYPE_DIRS[type]);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.(md|mdx)$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        type,
        title: String(data.title ?? slug),
        date: String(data.date ?? new Date().toISOString().slice(0, 10)),
        summary: String(data.summary ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        image: data.image ? String(data.image) : undefined,
        imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
        images: Array.isArray(data.images) ? data.images.map(String) : undefined,
        body: content,
      } satisfies Entry;
    });
}

export function getStaticEntries(): Entry[] {
  return (Object.keys(TYPE_DIRS) as EntryType[]).flatMap(readDir);
}

export async function getAllEntries(): Promise<Entry[]> {
  const staticEntries = getStaticEntries();
  const dbEntries = await getDbEntries();
  return [...staticEntries, ...dbEntries].sort((a, b) =>
    a.date < b.date ? 1 : -1
  );
}

export async function getEntry(
  type: EntryType,
  slug: string
): Promise<Entry | null> {
  const dir = path.join(CONTENT_ROOT, TYPE_DIRS[type]);
  for (const ext of [".md", ".mdx"]) {
    const file = path.join(dir, `${slug}${ext}`);
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        type,
        title: String(data.title ?? slug),
        date: String(data.date ?? new Date().toISOString().slice(0, 10)),
        summary: String(data.summary ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        image: data.image ? String(data.image) : undefined,
        imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
        images: Array.isArray(data.images) ? data.images.map(String) : undefined,
        body: content,
      };
    }
  }
  return await getDbEntry(type, slug);
}

export const ENTRY_TYPES: EntryType[] = ["event", "hackathon", "post"];