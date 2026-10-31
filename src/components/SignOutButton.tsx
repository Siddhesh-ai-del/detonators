"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await authClient.signOut();
        router.push("/");
        router.refresh();
      }}
      className="border-[3px] border-transparent px-2 py-1 text-sm font-bold uppercase tracking-wider transition-colors hover:border-fg hover:bg-accent-pink"
    >
      Sign out
    </button>
  );
}