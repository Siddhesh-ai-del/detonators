import { notFound } from "next/navigation";
import { getEntry, getAllEntries } from "@/lib/content";
import EntryDetail from "@/components/EntryDetail";

export async function generateStaticParams() {
  const entries = await getAllEntries();
  return entries
    .filter((e) => e.type === "post")
    .map((e) => ({ slug: e.slug }));
}

export const instant = false;

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getEntry("post", slug);
  if (!entry) notFound();
  return <EntryDetail entry={entry} />;
}