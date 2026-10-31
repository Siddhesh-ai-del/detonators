"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { createDbEntry } from "@/lib/db-entries";
import type { EntryType } from "@/lib/content";

export async function createEntryAction(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.email) {
    redirect("/login");
  }

  const type = String(formData.get("type") ?? "post") as EntryType;
  const title = String(formData.get("title") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const tagsRaw = String(formData.get("tags") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();
  const imageAlt = String(formData.get("imageAlt") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!title || !date) {
    throw new Error("Title and date are required.");
  }

  const tags = tagsRaw
    ? tagsRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const entry = await createDbEntry({
    type,
    title,
    date,
    summary,
    tags,
    image: image || undefined,
    imageAlt: imageAlt || undefined,
    body,
    authorEmail: session.user.email,
  });

  redirect(`/${type}s/${entry.slug}`);
}