"use client";

import { motion } from "framer-motion";

export function ActionBar({
  onAccept,
  onUndo,
}: {
  onAccept: () => void;
  onUndo: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18 }}
      className="mt-3 flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-2.5 shadow-[0_1px_2px_rgba(20,20,15,0.04)]"
    >
      <span className="text-[13px] text-ink-soft">
        Drag to compare, then keep it or undo.
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={onUndo}
          className="rounded-md border border-border px-3 py-1.5 text-[13px] font-medium text-ink-soft outline-none transition hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-accent-soft"
        >
          Undo
        </button>
        <button
          onClick={onAccept}
          className="flex items-center gap-1.5 rounded-md bg-good px-3.5 py-1.5 text-[13px] font-medium text-white outline-none transition hover:brightness-105 focus-visible:ring-2 focus-visible:ring-good focus-visible:ring-offset-2"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2.5 6.2 L5 8.7 L9.5 3.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Keep it
        </button>
      </div>
    </motion.div>
  );
}
