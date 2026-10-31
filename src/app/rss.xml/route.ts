import { getAllEntries } from "@/lib/content";

export const instant = false;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const entries = await getAllEntries();

  const items = entries
    .map((entry) => {
      const link = `${siteUrl}/${entry.type}s/${entry.slug}`;
      return `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <description>${escapeXml(entry.summary)}</description>
      <pubDate>${new Date(entry.date).toUTCString()}</pubDate>
      <category>${entry.type}</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>The Detonators</title>
    <link>${siteUrl}</link>
    <description>Timeline of events, hackathons, and posts from The Detonators.</description>
    <language>en</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}