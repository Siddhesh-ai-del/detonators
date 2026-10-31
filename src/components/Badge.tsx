import type { EntryType } from "@/lib/content";

const COLORS: Record<EntryType, string> = {
  event: "bg-accent-cyan",
  hackathon: "bg-accent-pink",
  post: "bg-accent-yellow",
};

const LABELS: Record<EntryType, string> = {
  event: "Event",
  hackathon: "Hackathon",
  post: "Post",
};

export default function Badge({ type }: { type: EntryType }) {
  return (
    <span
      className={`inline-block border-[3px] border-fg px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${COLORS[type]} brutal-shadow-sm`}
    >
      {LABELS[type]}
    </span>
  );
}