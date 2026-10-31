import type { Entry } from "@/lib/content";
import EntryCard from "./EntryCard";

export default function Timeline({ entries }: { entries: Entry[] }) {
  const byYear = entries.reduce<Record<string, Entry[]>>((acc, e) => {
    const year = e.date.slice(0, 4);
    (acc[year] ??= []).push(e);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => (a < b ? 1 : -1));

  return (
    <section id="timeline" className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="font-display text-3xl sm:text-4xl">Timeline</h2>
        <p className="text-sm font-bold uppercase tracking-wider">
          Events · Hackathons · Posts
        </p>
      </div>
      {years.map((year) => (
        <div key={year} className="mb-10">
          <div className="mb-4 inline-block brutal-border brutal-shadow bg-accent-pink px-3 py-1 font-display text-xl">
            {year}
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {byYear[year].map((entry) => (
              <EntryCard key={`${entry.type}-${entry.slug}`} entry={entry} />
            ))}
          </div>
        </div>
      ))}
      {entries.length === 0 && (
        <div className="brutal-border brutal-shadow bg-white p-6 text-center">
          No entries yet. Add MDX files under content/.
        </div>
      )}
    </section>
  );
}