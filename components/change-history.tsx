"use client";

import { AnimatePresence, motion } from "framer-motion";

export interface HistoryEntry {
  id: string;
  regionLabel: string;
  prompt: string;
  time: string;
}

export function ChangeHistory({ entries }: { entries: HistoryEntry[] }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[12px] font-medium uppercase tracking-wide text-muted">
          Change history
        </h3>
        <span className="font-mono text-[11px] text-muted">{entries.length}</span>
      </div>

      {entries.length === 0 ? (
        <p className="mt-3 text-[13px] leading-relaxed text-muted">
          Every accepted edit shows up here — what changed, and what you asked for.
        </p>
      ) : (
        <ul className="mt-3 space-y-3">
          <AnimatePresence initial={false}>
            {entries.map((entry) => (
              <motion.li
                key={entry.id}
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 12 }}
                transition={{ duration: 0.22 }}
                className="border-l-2 border-good/60 pl-3"
              >
                <div className="flex items-center gap-1.5 text-[11.5px] font-medium text-ink">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2.5 6.2 L5 8.7 L9.5 3.5" stroke="var(--good)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {entry.regionLabel}
                </div>
                <p className="mt-0.5 text-[12.5px] leading-snug text-ink-soft">
                  &ldquo;{entry.prompt}&rdquo;
                </p>
                <span className="mt-0.5 block font-mono text-[10.5px] text-muted">
                  {entry.time}
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
