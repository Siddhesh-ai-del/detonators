export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="brutal-border brutal-shadow-lg bg-accent-yellow p-6 sm:p-10">
        <p className="text-sm font-bold uppercase tracking-widest">
          The Detonators
        </p>
        <h1 className="mt-2 font-display text-4xl leading-none sm:text-6xl md:text-7xl">
          We build bold
          <br />
          software, fast.
        </h1>
        <p className="mt-4 max-w-2xl text-base font-medium sm:text-lg">
          A neo-brutalist timeline of our events, hackathons, and posts — proof
          that we ship.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#timeline"
            className="brutal-border brutal-shadow bg-fg px-4 py-2 text-sm font-bold text-bg brutal-hover"
          >
            View timeline ↓
          </a>
          <a
            href="https://github.com"
            className="brutal-border brutal-shadow bg-white px-4 py-2 text-sm font-bold brutal-hover"
          >
            GitHub
          </a>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Events", value: "2" },
          { label: "Hackathons", value: "2" },
          { label: "Posts", value: "5" },
        ].map((s) => (
          <div
            key={s.label}
            className="brutal-border brutal-shadow bg-white p-4 text-center brutal-hover"
          >
            <div className="font-display text-3xl">{s.value}</div>
            <div className="text-xs font-bold uppercase tracking-wider">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}