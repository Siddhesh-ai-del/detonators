"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import SignOutButton from "./SignOutButton";

export default function Nav() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-fg bg-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="font-display text-lg tracking-tight sm:text-xl">
          The Detonators
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          <a
            href="#timeline"
            className="border-[3px] border-transparent px-2 py-1 text-sm font-bold uppercase tracking-wider transition-colors hover:border-fg hover:bg-accent-yellow"
          >
            Timeline
          </a>
          {user ? (
            <>
              <Link
                href="/new"
                className="border-[3px] border-fg bg-accent-yellow px-2 py-1 text-sm font-bold uppercase tracking-wider brutal-shadow-sm brutal-hover"
              >
                New entry
              </Link>
              <span className="hidden text-xs font-bold sm:inline">
                {user.email}
              </span>
              <SignOutButton />
            </>
          ) : (
            <Link
              href="/login"
              className="border-[3px] border-transparent px-2 py-1 text-sm font-bold uppercase tracking-wider transition-colors hover:border-fg hover:bg-accent-yellow"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}