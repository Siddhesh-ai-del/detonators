import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, "auth.db"));
export { db };

export const auth = betterAuth({
  database: db,
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
});

// Ensure our entries table exists.
db.exec(`
  CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    summary TEXT NOT NULL DEFAULT '',
    tags TEXT NOT NULL DEFAULT '[]',
    image TEXT,
    imageAlt TEXT,
    images TEXT NOT NULL DEFAULT '[]',
    body TEXT NOT NULL DEFAULT '',
    authorEmail TEXT,
    views INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL
  );
`);

export type DbEntryRow = {
  id: number;
  slug: string;
  type: "event" | "hackathon" | "post";
  title: string;
  date: string;
  summary: string;
  tags: string;
  image: string | null;
  imageAlt: string | null;
  images: string;
  body: string;
  authorEmail: string | null;
  views: number;
  createdAt: string;
};

try {
  db.exec("ALTER TABLE entries ADD COLUMN views INTEGER NOT NULL DEFAULT 0;");
} catch {
  // Column already exists.
}