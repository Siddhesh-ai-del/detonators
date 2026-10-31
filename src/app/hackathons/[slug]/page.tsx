import { notFound } from "next/navigation";
import { getEntry, getAllEntries } from "@/lib/content";
import { incrementViews } from "@/lib/db-entries";
import EntryDetail from "@/components/EntryDetail";

export async function generateStaticParams() {
  const entries = await getAllEntries();
  return entries
    .filter((e) => e.type === "hackathon")
    .map((e) => ({ slug: e.slug }));
}

export const instant = false;

export default async function HackathonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getEntry("hackathon", slug);
  if (!entry) notFound();
  incrementViews("hackathon", slug);
  return <EntryDetail entry={entry} />;
}