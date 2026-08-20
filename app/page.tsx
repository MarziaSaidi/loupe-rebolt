import Link from "next/link";

function DiffMock() {
  const before = [
    { part: "RM-1042", status: "Low Stock" },
    { part: "CT-0087", status: "Low Stock" },
    { part: "FS-2210", status: "OK" },
    { part: "HY-3305", status: "OK" },
  ];
  return (
    <div className="my-6 rounded-2xl bg-[#0d0e10] p-1 shadow-[0_10px_28px_-14px_rgba(0,0,0,0.5)]">
      <div className="overflow-hidden rounded-xl bg-surface p-5">
        <div className="mb-3.5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="font-mono text-[10.5px] uppercase tracking-wide text-muted">
            Drag to compare
          </span>
        </div>
        <div className="relative h-32 overflow-hidden rounded-lg border border-border">
          <div className="absolute inset-0 bg-surface p-3.5">
            <span className="absolute left-2.5 top-2.5 rounded-full bg-black/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-white">
              Before
            </span>
            <div className="mt-6 space-y-0">
              {before.map((r) => (
                <div
                  key={r.part}
                  className="flex justify-between border-b border-border py-1.5 text-[11px] text-ink-soft"
                >
                  <span>{r.part}</span>
                  <span>{r.status}</span>
                </div>
              ))}
            </div>
          </div>
          <div
            className="absolute inset-0 bg-surface p-3.5"
            style={{ clipPath: "inset(0 45% 0 0)" }}
          >
            <span className="absolute left-2.5 top-2.5 rounded-full bg-accent px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-white">
              After
            </span>
            <div className="mt-6 space-y-0">
              {before.map((r) => (
                <div
                  key={r.part}
                  className="flex items-center justify-between border-b border-border py-[7px] text-[11px]"
                >
                  <span>{r.part}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[9px] ${
                      r.status === "Low Stock"
                        ? "bg-warning-soft text-warning"
                        : "bg-good-soft text-good"
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            className="absolute inset-y-0 w-0.5 bg-accent"
            style={{ left: "55%" }}
          >
            <div className="absolute left-1/2 top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
              <svg width="12" height="9" viewBox="0 0 14 10" fill="none" aria-hidden>
                <path d="M4 1 L1 5 L4 9" stroke="var(--ink-soft)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 1 L13 5 L10 9" stroke="var(--ink-soft)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TryButton() {
  return (
    <Link
      href="/prototype"
      className="inline-flex items-center gap-2 rounded-[9px] bg-accent px-[18px] py-[11px] text-[14.5px] font-semibold text-white outline-none transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      Try the Loupe prototype <span aria-hidden>→</span>
    </Link>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <div className="mx-auto max-w-[660px] px-6 py-16">
        <span className="mb-5 inline-block rounded-[5px] bg-accent-soft px-2.5 py-1 font-mono text-[12px] uppercase tracking-wide text-accent-ink">
          Portfolio case study
        </span>
        <h1 className="mb-3 text-[clamp(32px,5.5vw,44px)] font-extrabold leading-[1.08] tracking-tight text-balance">
          Building Loupe
        </h1>
        <p className="mb-11 max-w-[480px] text-[18px] leading-[1.55] text-ink-soft">
          A concept for Rebolt — a drag-to-compare interaction that makes AI
          edits something you can see, not just trust.
        </p>

        <TryButton />

        <section className="mt-11">
          <h2 className="mb-3.5 text-[13px] font-bold uppercase tracking-wide text-muted">
            The Opportunity
          </h2>
          <p className="text-[16px] leading-[1.68] text-ink">
            Rebolt makes building software through AI incredibly fast. But
            once an app exists, making changes becomes a different problem.
            You ask the AI to edit something, it changes the app, and you
            have to trust that it understood what you meant.
          </p>
          <p className="mt-3.5 text-[16px] leading-[1.68] text-ink">
            I saw an opportunity to make that second step more visual and
            more trustworthy.
          </p>
        </section>

        <section className="mt-11">
          <h2 className="mb-3.5 text-[13px] font-bold uppercase tracking-wide text-muted">
            What I Built
          </h2>
          <p className="text-[16px] leading-[1.68] text-ink">
            I built <strong className="font-semibold">Loupe</strong>, a
            concept for an AI editing loop.
          </p>
          <p className="mt-3.5 text-[16px] leading-[1.68] text-ink">
            Point at what you want to change. Add a short instruction. The AI
            applies the edit. Then drag a slider across the screen to see
            exactly what changed, in place.
          </p>
          <p className="mt-3.5 text-[16.5px] font-semibold text-ink">
            Keep it or undo it.
          </p>
          <p className="mt-3.5 text-[16px] leading-[1.68] text-ink">
            The important part is the comparison. The same content stays
            aligned on both sides, so dragging the slider reveals the change
            directly instead of asking you to figure it out from two
            separate screens.
          </p>

          <DiffMock />
          <p className="text-center text-[12.5px] text-muted">
            Same row, same position, on both sides — the drag reveals a
            change instead of describing one.
          </p>

          <p className="mt-6 text-[16px] leading-[1.68] text-ink">
            The drag is the idea, not a feature added to it. A static
            &ldquo;here&rsquo;s the redesign&rdquo; screen asks you to trust
            a description. A side-by-side asks you to spot the differences
            yourself. A wipe you control puts the same pixel under your
            cursor in both states at once — you&rsquo;re shown the change,
            not told about it, at whatever pace you choose. That&rsquo;s a
            different trust mechanism, and it&rsquo;s the one thing none of
            the AI app builders I looked at — Lovable, v0, Replit, Copilot
            Studio — have solved cleanly for a second edit, only a first
            one.
          </p>
        </section>

        <section className="mt-11">
          <h2 className="mb-3.5 text-[13px] font-bold uppercase tracking-wide text-muted">
            Why This Interaction
          </h2>
          <p className="text-[16px] leading-[1.68] text-ink">
            Most AI tools show you the result and ask you to trust it.
          </p>
          <p className="mt-3.5 text-[16px] leading-[1.68] text-ink">
            I wanted to try something different:
          </p>
          <p className="my-4 border-l-2 border-accent pl-3.5 text-[17px] font-semibold leading-[1.5] text-ink">
            What if the AI showed you exactly what it changed?
          </p>
          <p className="text-[16px] leading-[1.68] text-ink">
            The slider makes the edit tangible. You can move it back and
            forth and immediately see the difference between the original
            and the new version.
          </p>
          <p className="mt-3.5 text-[16px] leading-[1.68] text-ink">
            That felt like a better interaction for the second prompt — not
            just generating again, but reviewing and refining what already
            exists.
          </p>
        </section>

        <section className="mt-11">
          <h2 className="mb-3.5 text-[13px] font-bold uppercase tracking-wide text-muted">
            The Result
          </h2>
          <p className="text-[16px] leading-[1.68] text-ink">
            I turned the idea into a working prototype in{" "}
            <strong className="font-semibold">Next.js and TypeScript</strong>
            , with a real interactive before-and-after comparison.
          </p>
          <p className="mt-3.5 text-[16px] leading-[1.68] text-ink">
            The prototype isn&rsquo;t trying to rebuild Rebolt. It explores
            one specific product opportunity:
          </p>
          <p className="my-4 border-l-2 border-accent pl-3.5 text-[17px] font-semibold leading-[1.5] text-ink">
            AI-generated software should feel editable, reviewable, and
            trustworthy — not like a black box.
          </p>
          <div className="mt-2">
            <TryButton />
          </div>
        </section>

        <footer className="mt-14 border-t border-border pt-5 font-mono text-[12px] text-muted">
          Built by Marzia Saidi — an independent concept, not affiliated
          with or endorsed by Rebolt.{" "}
          <a
            href="https://github.com/MarziaSaidi/loupe-rebolt"
            className="underline decoration-border underline-offset-2 hover:text-ink-soft"
          >
            View the code
          </a>
          .
        </footer>
      </div>
    </div>
  );
}
