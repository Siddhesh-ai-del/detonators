"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });
    if (error) {
      setError(error.message ?? "Sign up failed");
      setLoading(false);
      return;
    }
    router.push("/new");
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <div className="brutal-border brutal-shadow bg-white p-6">
        <h1 className="font-display text-3xl">Join The Detonators</h1>
        <p className="mt-2 text-sm">
          Create a member account to contribute to the timeline.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wider">Name</span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full brutal-border px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wider">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full brutal-border px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wider">Password</span>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full brutal-border px-3 py-2"
            />
          </label>
          {error && (
            <p className="border-[3px] border-fg bg-accent-pink px-3 py-2 text-sm font-bold">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full brutal-border brutal-shadow bg-accent-yellow px-4 py-2 font-bold brutal-hover disabled:opacity-60"
          >
            {loading ? "Creating…" : "Create account"}
          </button>
        </form>
        <p className="mt-4 text-sm">
          Already a member?{" "}
          <a href="/login" className="font-bold underline">
            Sign in
          </a>
        </p>
      </div>
    </main>
  );
}