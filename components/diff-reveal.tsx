"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";

export function DiffReveal({
  before,
  after,
}: {
  before: React.ReactNode;
  after: React.ReactNode;
}) {
  const [pct, setPct] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.min(100, Math.max(0, raw)));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative grid overflow-hidden rounded-lg border border-border bg-surface select-none"
      onPointerMove={(e) => {
        if (dragging.current) updateFromClientX(e.clientX);
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
    >
      {/* Before layer, full — occupies the same grid cell as After so the
          container auto-sizes to whichever layer is taller. Padding-top
          on both layers (not just an overlay) reserves real space for the
          tag instead of floating it on top of the table's header row —
          it can't hang outside the box either, since the outer container
          clips to rounded corners and the After layer is itself clipped
          by clip-path, which would erase anything positioned above it. */}
      <div className="relative bg-surface pt-9" style={{ gridArea: "1 / 1" }}>
        <div className="pointer-events-none absolute left-3 top-2.5 z-0 rounded-full border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
          Before
        </div>
        {before}
      </div>

      {/* After layer, clipped. Needs its own opaque background — without
          one, transparent rows let the Before layer show through wherever
          After is visible, since both share the same grid cell. */}
      <div
        className="relative z-[5] bg-surface pt-9"
        style={{ gridArea: "1 / 1", clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        <div className="pointer-events-none absolute left-3 top-2.5 z-10 rounded-full bg-accent px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-white">
          After
        </div>
        {after}
      </div>

      {/* Divider + handle */}
      <div
        className="absolute inset-y-0 z-20 w-px bg-accent"
        style={{ left: `${pct}%` }}
      >
        <motion.div
          role="slider"
          tabIndex={0}
          aria-label="Drag to compare before and after"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
          onPointerDown={(e) => {
            dragging.current = true;
            (e.target as Element).setPointerCapture?.(e.pointerId);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPct((p) => Math.max(0, p - 4));
            if (e.key === "ArrowRight") setPct((p) => Math.min(100, p + 4));
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          className="absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-border bg-surface shadow-[0_2px_8px_rgba(20,20,15,0.18)] outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
            <path d="M4 1 L1 5 L4 9" stroke="var(--ink-soft)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 1 L13 5 L10 9" stroke="var(--ink-soft)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

export function ChangeList({ changes }: { changes: string[] }) {
  return (
    <ul className="space-y-1.5">
      {changes.map((c, i) => (
        <motion.li
          key={c}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08 * i, duration: 0.25 }}
          className="flex items-start gap-2 text-[13px] text-ink-soft"
        >
          <svg className="mt-1 h-2.5 w-2.5 flex-shrink-0 text-accent" viewBox="0 0 8 8" fill="currentColor" aria-hidden>
            <circle cx="4" cy="4" r="4" />
          </svg>
          <span>{c}</span>
        </motion.li>
      ))}
    </ul>
  );
}
