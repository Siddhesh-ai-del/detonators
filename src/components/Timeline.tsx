"use client";

import { useMemo, useState } from "react";
import type { Entry, EntryType } from "@/lib/content";
import EntryCard from "./EntryCard";

const TYPES: (EntryType | "all")[] = ["all", "event", "hackathon", "post"];

export default function Timeline({ entries }: { entries: Entry[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<EntryType | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => {
      if (type !== "all" && e.type !== type) return false;
      if (!q) return true;
      return (
        e.title.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [entries, query, type]);

  const byYear = filtered.reduce<Record<string, Entry[]>>((acc, e) => {
    const year = e.date.slice(0, 4);
    (acc[year] ??= []).push(e);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => (a < b ? 1 : -1));

  return (
    <section id="timeline" className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-display text-3xl sm:text-4xl">Timeline</h2>
        <p className="text-sm font-bold uppercase tracking-wider">
          Events · Hackathons · Posts
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          placeholder="Search entries…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full brutal-border px-3 py-2 sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`border-[3px] border-fg px-3 py-1 text-xs font-bold uppercase tracking-wider brutal-shadow-sm brutal-hover ${
                type === t ? "bg-accent-yellow" : "bg-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
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
      {filtered.length === 0 && (
        <div className="brutal-border brutal-shadow bg-white p-6 text-center">
          No entries match your search.
        </div>
      )}
    </section>
  );
}