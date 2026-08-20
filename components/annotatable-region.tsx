"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { RegionStatus, Scenario } from "@/lib/scenarios";
import { AnnotationPopover } from "./annotation-popover";
import { ProcessingOverlay } from "./processing-overlay";
import { DiffReveal, ChangeList } from "./diff-reveal";
import { ActionBar } from "./action-bar";

const STOPWORDS = new Set([
  "the", "a", "an", "to", "this", "and", "for", "on", "in", "it", "that",
  "what", "should", "be", "can", "i", "or", "at", "of", "is", "are", "with",
  "from", "me", "my", "tell", "whats", "dont",
]);

function tokenize(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOPWORDS.has(w)),
  );
}

/** Loose word-overlap check against the seeded prompt — not real NLP, just
 * enough to tell a genuinely unrelated note from a paraphrase or tweak of
 * the suggested one, so the demo can be honest about which it got. */
function isCloseMatch(input: string, seed: string): boolean {
  const a = tokenize(input);
  const b = tokenize(seed);
  if (a.size === 0 || b.size === 0) return true;
  let overlap = 0;
  for (const w of a) if (b.has(w)) overlap++;
  return overlap / Math.min(a.size, b.size) >= 0.34;
}

export function AnnotatableRegion({
  scenario,
  status,
  onStatusChange,
  beforeContent,
  afterContent,
  compareBefore,
  compareAfter,
  onAccept,
  onUndo,
  disabled,
  nudge,
}: {
  scenario: Scenario;
  status: RegionStatus;
  onStatusChange: (s: RegionStatus) => void;
  beforeContent: React.ReactNode;
  afterContent: React.ReactNode;
  /** Alternate "before" rendering used only inside the diff comparison,
   * when the idle "before" uses a denser layout than makes sense to diff
   * against directly (e.g. a compact row height). Defaults to beforeContent. */
  compareBefore?: React.ReactNode;
  /** Alternate "after" rendering used only inside the diff comparison, when
   * the committed after-state adds constraints (e.g. a scroll cap) that
   * don't make sense mid-comparison. Defaults to afterContent. */
  compareAfter?: React.ReactNode;
  onAccept: (prompt: string) => void;
  onUndo: () => void;
  disabled?: boolean;
  nudge?: string;
}) {
  const [hover, setHover] = useState(false);
  const [lastPrompt, setLastPrompt] = useState(scenario.defaultPrompt);
  const [looseMatch, setLooseMatch] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const interactive = status === "idle" && !disabled;

  const outline =
    status === "annotating"
      ? "border-accent ring-2 ring-accent/25"
      : hover && interactive
        ? "border-accent/60"
        : "border-transparent";

  return (
    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`relative rounded-lg border-2 border-dashed transition-colors duration-150 ${outline}`}
        onClick={() => {
          if (status === "idle") {
            if (disabled) return;
            onStatusChange("annotating");
          } else if (status === "done") {
            setShowNudge(true);
            setTimeout(() => setShowNudge(false), 2200);
          }
        }}
      >
        <div className={status === "annotating" ? "pointer-events-none" : ""}>
          {status === "done" ? afterContent : beforeContent}
        </div>

        <AnimatePresence>
          {interactive && hover && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange("annotating");
              }}
              className="absolute -top-9 right-3 z-20 flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[12px] font-medium text-white shadow-[0_2px_8px_rgba(0,106,254,0.35)] outline-none focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M2 10 L2 8.2 L7.8 2.4 L9.6 4.2 L3.8 10 Z" fill="white" />
              </svg>
              Annotate
            </motion.button>
          )}
        </AnimatePresence>

        {status === "done" && (
          <div className="pointer-events-none absolute -top-9 right-3 z-20 flex items-center gap-1 rounded-full border border-border bg-good-soft px-2.5 py-1 text-[11px] font-medium text-good shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2.5 6.2 L5 8.7 L9.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Refined
          </div>
        )}

        <AnimatePresence>
          {status === "annotating" && (
            <AnnotationPopover
              defaultPrompt={scenario.defaultPrompt}
              onCancel={() => onStatusChange("idle")}
              onSubmit={(text) => {
                setLastPrompt(text);
                setLooseMatch(!isCloseMatch(text, scenario.defaultPrompt));
                onStatusChange("processing");
              }}
            />
          )}
        </AnimatePresence>

        {status === "processing" && (
          <ProcessingOverlay
            steps={scenario.processingSteps}
            onComplete={() => onStatusChange("reviewing")}
          />
        )}

        <AnimatePresence>
          {showNudge && nudge && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-9 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-surface-2 px-3 py-1.5 text-[12px] text-ink shadow-md"
            >
              {nudge}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {status === "reviewing" && (
        <div className="mt-3 animate-[fadeUp_0.25s_ease-out]">
          {looseMatch && (
            <div className="mb-2 flex items-center gap-1.5 text-[12px] text-muted">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="flex-shrink-0">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.1" />
                <path d="M6 5.2 V8.6 M6 3.6 V3.7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
              Showing Loupe&rsquo;s closest supported edit for this view — not an exact read of your note.
            </div>
          )}
          <DiffReveal before={compareBefore ?? beforeContent} after={compareAfter ?? afterContent} />
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
            <div className="rounded-xl border border-border bg-surface px-4 py-3">
              <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted">
                What changed
              </div>
              <ChangeList changes={scenario.changes} />
            </div>
          </div>
          <ActionBar
            onAccept={() => onAccept(lastPrompt)}
            onUndo={() => onUndo()}
          />
        </div>
      )}
    </div>
  );
}
