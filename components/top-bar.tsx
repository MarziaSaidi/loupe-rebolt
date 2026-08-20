export function TopBar() {
  return (
    <div className="bg-chrome text-chrome-ink">
      <div className="mx-auto flex max-w-[1040px] items-center gap-3 px-6 py-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-accent text-[13px] font-semibold text-white">
          R
        </div>
        <div className="flex items-center gap-1.5 text-[13px] text-chrome-muted">
          <span className="text-chrome-ink">Ridgeline Machining Co.</span>
          <span aria-hidden>/</span>
          <span className="text-chrome-ink">Inventory &amp; Orders</span>
        </div>
        <span className="rounded-full border border-chrome-line px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-chrome-muted">
          Draft
        </span>
        <div className="ml-auto flex items-center gap-3">
          <span
            className="hidden items-center gap-1.5 rounded-full bg-[#1c1d20] px-2.5 py-1 font-mono text-[11px] text-chrome-muted sm:flex"
            title="This is an independent concept prototype, not an official Rebolt product."
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.1" />
              <path d="M6 5.2 V8.6 M6 3.6 V3.7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
            Concept, not shipped by Rebolt
          </span>
          <span className="font-mono text-[11px] text-chrome-muted">Built with Rebolt</span>
          <div className="h-6 w-6 rounded-full bg-[#2a2b2f]" />
        </div>
      </div>
    </div>
  );
}
