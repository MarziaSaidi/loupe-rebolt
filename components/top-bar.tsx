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
        <span className="rounded-full border border-chrome-line px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-wide text-chrome-muted">
          Draft
        </span>
        <div className="ml-auto flex items-center gap-2 font-mono text-[11px] text-chrome-muted">
          <span className="hidden sm:inline">Built with Rebolt</span>
          <div className="h-6 w-6 rounded-full bg-[#2a2b2f]" />
        </div>
      </div>
    </div>
  );
}
