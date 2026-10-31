"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import NewEntryForm from "./NewEntryForm";

export default function NewEntryPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm">Loading…</p>
      </main>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="brutal-border brutal-shadow bg-white p-6">
        <h1 className="font-display text-3xl">New Timeline Entry</h1>
        <p className="mt-2 text-sm">
          Signed in as {session.user.email}. Your post will appear on the timeline.
        </p>
        <NewEntryForm />
      </div>
    </main>
  );
}