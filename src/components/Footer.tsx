const year = 2026;

export default function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 py-10">
      <div className="brutal-border brutal-shadow bg-fg p-6 text-bg">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <p className="font-display text-2xl">The Detonators</p>
            <p className="mt-2 text-sm opacity-80">
              Building bold software, one ship at a time.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-70">
              Explore
            </p>
            <ul className="mt-2 space-y-1 text-sm font-bold">
              <li>
                <a href="#timeline" className="underline">
                  Timeline
                </a>
              </li>
              <li>
                <a href="/posts/2026-03-hello-world" className="underline">
                  About
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-70">
              Contact
            </p>
            <ul className="mt-2 space-y-1 text-sm font-bold">
              <li>
                <a href="mailto:hello@detonators.dev" className="underline">
                  hello@detonators.dev
                </a>
              </li>
              <li>
                <a href="https://github.com" className="underline">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t-2 border-bg/20 pt-4 text-xs opacity-60">
          <p>© {year} The Detonators. Neo-brutalist by design.</p>
          <p>Built with Next.js &amp; Tailwind.</p>
        </div>
      </div>
    </footer>
  );
}