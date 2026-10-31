import Image from "next/image";
import Link from "next/link";
import type { Entry } from "@/lib/content";
import Badge from "./Badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function EntryDetail({ entry }: { entry: Entry }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/"
        className="inline-block border-[3px] border-fg bg-accent-yellow px-3 py-1 text-sm font-bold brutal-shadow-sm brutal-hover"
      >
        ← Back
      </Link>
      <article className="mt-6 brutal-border brutal-shadow bg-white overflow-hidden">
        {entry.image && (
          <div className="relative aspect-[16/9] w-full border-b-[3px] border-fg">
            <Image
              src={entry.image}
              alt={entry.imageAlt ?? entry.title}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="p-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge type={entry.type} />
          <time className="font-mono text-sm font-bold" dateTime={entry.date}>
            {new Date(entry.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        <h1 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
          {entry.title}
        </h1>
        {entry.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
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
        <div className="prose-brutal mt-6">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{entry.body}</ReactMarkdown>
        </div>
        {entry.images && entry.images.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {entry.images.map((src, i) => (
              <div
                key={src + i}
                className="relative aspect-[4/3] brutal-border brutal-shadow bg-white overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`${entry.title} photo ${i + 1}`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
        </div>
      </article>
    </main>
  );
}