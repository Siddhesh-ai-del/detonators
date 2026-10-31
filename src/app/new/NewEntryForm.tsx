"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewEntryForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const tags = String(formData.get("tags") ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      type: formData.get("type"),
      title: formData.get("title"),
      date: formData.get("date"),
      summary: formData.get("summary"),
      tags,
      image: formData.get("image"),
      imageAlt: formData.get("imageAlt"),
      body: formData.get("body"),
    };

    const res = await fetch("/api/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Failed to publish.");
      setPending(false);
      return;
    }

    const data = await res.json();
    router.push(`/${data.type}s/${data.slug}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wider">Type</span>
        <select
          name="type"
          defaultValue="post"
          className="mt-1 w-full brutal-border px-3 py-2"
        >
          <option value="post">Post</option>
          <option value="event">Event</option>
          <option value="hackathon">Hackathon</option>
        </select>
      </label>
      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wider">Title</span>
        <input name="title" required className="mt-1 w-full brutal-border px-3 py-2" />
      </label>
      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wider">Date</span>
        <input
          name="date"
          type="date"
          required
          defaultValue={new Date().toISOString().slice(0, 10)}
          className="mt-1 w-full brutal-border px-3 py-2"
        />
      </label>
      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wider">Summary</span>
        <input name="summary" className="mt-1 w-full brutal-border px-3 py-2" />
      </label>
      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wider">
          Tags (comma separated)
        </span>
        <input name="tags" className="mt-1 w-full brutal-border px-3 py-2" />
      </label>
      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wider">Image URL</span>
        <input
          name="image"
          placeholder="/images/placeholder.svg"
          className="mt-1 w-full brutal-border px-3 py-2"
        />
      </label>
      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wider">Image alt</span>
        <input name="imageAlt" className="mt-1 w-full brutal-border px-3 py-2" />
      </label>
      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wider">Body (Markdown)</span>
        <textarea
          name="body"
          rows={8}
          className="mt-1 w-full brutal-border px-3 py-2 font-mono text-sm"
        />
      </label>
      {error && (
        <p className="border-[3px] border-fg bg-accent-pink px-3 py-2 text-sm font-bold">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="brutal-border brutal-shadow bg-accent-yellow px-4 py-2 font-bold brutal-hover disabled:opacity-60"
      >
        {pending ? "Publishing…" : "Publish"}
      </button>
    </form>
  );
}