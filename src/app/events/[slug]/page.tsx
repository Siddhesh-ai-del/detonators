import { notFound } from "next/navigation";
import { getEntry, getAllEntries } from "@/lib/content";
import { incrementViews } from "@/lib/db-entries";
import EntryDetail from "@/components/EntryDetail";

export async function generateStaticParams() {
  const entries = await getAllEntries();
  return entries
    .filter((e) => e.type === "event")
    .map((e) => ({ slug: e.slug }));
}

export const instant = false;

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getEntry("event", slug);
  if (!entry) notFound();
  incrementViews("event", slug);
  return <EntryDetail entry={entry} />;
}