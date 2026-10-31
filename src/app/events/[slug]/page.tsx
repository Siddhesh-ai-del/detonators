import { notFound } from "next/navigation";
import { getEntry } from "@/lib/content";
import EntryDetail from "@/components/EntryDetail";

import { getAllEntries } from "@/lib/content";

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
  return <EntryDetail entry={entry} />;
}