import { betterAuth } from "better-auth";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import { createClient } from "@libsql/client";
import path from "node:path";
import fs from "node:fs";

const tursoUrl = process.env.TURSO_DATABASE_URL;
const tursoToken = process.env.TURSO_AUTH_TOKEN;

const client = createClient(
  tursoUrl
    ? { url: tursoUrl, authToken: tursoToken }
    : { url: `file:${path.join(process.cwd(), "data", "auth.db")}` }
);

// Ensure local data dir exists for file-based dev DB.
if (!tursoUrl) {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
}

const dialect = new LibsqlDialect({ client });

// Ensure custom entries table exists.
await client.execute(`
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

// Best-effort migration for older schemas.
try {
  await client.execute("ALTER TABLE entries ADD COLUMN views INTEGER NOT NULL DEFAULT 0;");
} catch {
  // Column already exists.
}

export { client as libsqlClient };

export const auth = betterAuth({
  database: { dialect, type: "sqlite" },
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
});

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