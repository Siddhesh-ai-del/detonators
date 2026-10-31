import Image from "next/image";
import Link from "next/link";
import type { Entry } from "@/lib/content";
import Badge from "./Badge";

export default function EntryCard({ entry }: { entry: Entry }) {
  return (
    <article className="brutal-border brutal-shadow bg-white brutal-hover overflow-hidden">
      {entry.image && (
        <div className="relative aspect-[16/9] w-full border-b-[3px] border-fg">
          <Image
            src={entry.image}
            alt={entry.imageAlt ?? entry.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-3">
          <Badge type={entry.type} />
          <time className="text-sm font-mono font-bold" dateTime={entry.date}>
            {new Date(entry.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          {typeof entry.views === "number" && (
            <span className="text-xs font-bold uppercase tracking-wider text-muted">
              {entry.views} views
            </span>
          )}
        </div>
      <h3 className="mt-3 font-display text-xl leading-tight">
        <Link href={`/${entry.type}s/${entry.slug}`} className="hover:underline">
          {entry.title}
        </Link>
      </h3>
      {entry.summary && (
        <p className="mt-2 text-sm leading-relaxed">{entry.summary}</p>
      )}
      {entry.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <li
              key={tag}
              className="border-2 border-fg bg-accent-lime px-2 py-0.5 text-xs font-bold"
            >
              #{tag}
            </li>
          ))}
        </ul>
      )}
      </div>
    </article>
  );
}