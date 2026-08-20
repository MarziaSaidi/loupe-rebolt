"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function AnnotationPopover({
  defaultPrompt,
  onSubmit,
  onCancel,
}: {
  defaultPrompt: string;
  onSubmit: (text: string) => void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState(defaultPrompt);

  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      className="absolute left-3 right-3 top-full z-40 mt-3 rounded-xl border border-border bg-surface p-3 shadow-[0_8px_24px_-8px_rgba(20,20,15,0.22)]"
    >
      <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-accent-ink">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M2 10 L2 8.2 L7.8 2.4 L9.6 4.2 L3.8 10 Z" stroke="currentColor" strokeWidth="1.1" fill="var(--accent-soft)" />
          <path d="M6.4 3.8 L8.2 5.6" stroke="currentColor" strokeWidth="1.1" />
        </svg>
        Point at what should change
      </div>
      <p className="mb-2 text-[12px] leading-snug text-muted">
        Use the suggested note below, or write your own — Loupe matches it to the closest supported edit for this view.
      </p>
      <textarea
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={2}
        className="w-full resize-none rounded-lg border border-border bg-canvas px-3 py-2 text-[14px] text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft"
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            if (value.trim()) onSubmit(value.trim());
          }
          if (e.key === "Escape") onCancel();
        }}
      />
      <div className="mt-2 flex items-center justify-between">
        <span className="font-mono text-[11px] text-muted">⌘ + Enter to send</span>
        <div className="flex gap-1.5">
          <button
            onClick={onCancel}
            className="rounded-md px-2.5 py-1.5 text-[13px] font-medium text-ink-soft outline-none transition hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-accent-soft"
          >
            Cancel
          </button>
          <button
            onClick={() => value.trim() && onSubmit(value.trim())}
            disabled={!value.trim()}
            className="rounded-md bg-accent px-3 py-1.5 text-[13px] font-medium text-white outline-none transition hover:bg-accent-ink focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-offset-2 disabled:opacity-40"
          >
            Send to Rebolt
          </button>
        </div>
      </div>
    </motion.div>
  );
}
