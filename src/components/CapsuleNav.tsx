"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import TopCapsule from "./TopCapsule";

export default function CapsuleNav() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const isAdmin = !!user?.email && adminEmails.includes(user.email.toLowerCase());

  return (
    <TopCapsule ariaLabel="Top navigation">
      <Link
        href="/"
        className="font-[family-name:var(--font-inter)] text-lg font-semibold tracking-[-0.01em] text-fg"
      >
        The Detonators
      </Link>
      <div className="flex items-center gap-4 sm:gap-8">
        <Link
          href="#timeline"
          className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-muted transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-fg"
        >
          <span className="mr-1.5 text-accent-yellow">01.</span>Timeline
        </Link>
        {user && isAdmin ? (
          <>
            <Link
              href="/new"
              className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-muted transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-fg"
            >
              <span className="mr-1.5 text-accent-yellow">02.</span>New entry
            </Link>
            <span className="hidden text-xs text-[#6B6660] sm:inline">
              {user.email}
            </span>
          </>
        ) : (
          <Link
            href="/login"
            className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-muted transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-fg"
          >
            <span className="mr-1.5 text-accent-yellow">02.</span>Sign in
          </Link>
        )}
      </div>
    </TopCapsule>
  );
}