"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scenarios, type RegionId, type RegionStatus } from "@/lib/scenarios";
import { AnnotatableRegion } from "./annotatable-region";
import { StatRowBefore, StatRowAfter } from "./stat-row";
import { InventoryTableBefore, InventoryTableAfter } from "./inventory-table";
import { ChangeHistory, type HistoryEntry } from "./change-history";

type Statuses = Record<RegionId, RegionStatus>;

function timeNow() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

/** Lives in the section heading row, next to the label — not floating over
 * the card below it. That way it can never collide with the card's own
 * content (e.g. a header row that wraps to two lines) or with whatever
 * else is in this same heading row (e.g. an item count), since it's just
 * another item in that row, not an absolutely-positioned guess. */
function RegionBadge({
  status,
  disabled,
  onAnnotate,
}: {
  status: RegionStatus;
  disabled?: boolean;
  onAnnotate: () => void;
}) {
  if (status === "done") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-border bg-good-soft px-2.5 py-1 text-[11px] font-medium text-good">
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M2.5 6.2 L5 8.7 L9.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Refined
      </span>
    );
  }
  if (status !== "idle") return null;
  return (
    <button
      onClick={onAnnotate}
      disabled={disabled}
      className="flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[12px] font-medium text-white outline-none transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:cursor-not-allowed disabled:opacity-40"
    >
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path d="M2 10 L2 8.2 L7.8 2.4 L9.6 4.2 L3.8 10 Z" fill="white" />
      </svg>
      Annotate
    </button>
  );
}

export function Workspace() {
  const [statuses, setStatuses] = useState<Statuses>({ stats: "idle", table: "idle" });
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const anyBusy = useMemo(
    () => Object.values(statuses).some((s) => s === "annotating" || s === "processing" || s === "reviewing"),
    [statuses],
  );
  const bothDone = statuses.stats === "done" && statuses.table === "done";

  function setStatus(id: RegionId, s: RegionStatus) {
    setStatuses((prev) => ({ ...prev, [id]: s }));
  }

  function accept(id: RegionId, prompt: string) {
    setStatus(id, "done");
    setHistory((h) => [
      { id: `${id}-${Date.now()}`, regionLabel: scenarios[id].regionLabel, prompt, time: timeNow() },
      ...h,
    ]);
  }

  function undo(id: RegionId) {
    setStatus(id, "idle");
  }

  function restart() {
    setStatuses({ stats: "idle", table: "idle" });
    setHistory([]);
  }

  return (
    <div className="mx-auto max-w-[1040px] px-6 py-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_272px]">
        <div className="min-w-0">
          <div className="mb-5">
            <h1 className="text-[20px] font-medium text-ink">Inventory &amp; Orders</h1>
            <p className="mt-1 text-[14px] text-ink-soft">
              Click Annotate on a section below to request a change.
            </p>
          </div>

          <section className="mb-8">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-[13px] font-medium text-ink-soft">Summary metrics</h2>
              <RegionBadge
                status={statuses.stats}
                disabled={anyBusy && statuses.stats === "idle"}
                onAnnotate={() => setStatus("stats", "annotating")}
              />
            </div>
            <AnnotatableRegion
              scenario={scenarios.stats}
              status={statuses.stats}
              onStatusChange={(s) => setStatus("stats", s)}
              beforeContent={<StatRowBefore />}
              afterContent={<StatRowAfter />}
              onAccept={(p) => accept("stats", p)}
              onUndo={() => undo("stats")}
              disabled={anyBusy && statuses.stats === "idle"}
              nudge={statuses.table === "done" ? undefined : "Nice — try the table below next."}
            />
          </section>

          <section>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-[13px] font-medium text-ink-soft">Full inventory</h2>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-muted">9 items</span>
                <RegionBadge
                  status={statuses.table}
                  disabled={anyBusy && statuses.table === "idle"}
                  onAnnotate={() => setStatus("table", "annotating")}
                />
              </div>
            </div>
            <AnnotatableRegion
              scenario={scenarios.table}
              status={statuses.table}
              onStatusChange={(s) => setStatus("table", s)}
              beforeContent={<InventoryTableBefore compact />}
              compareBefore={<InventoryTableBefore />}
              afterContent={<InventoryTableAfter scrollable />}
              compareAfter={<InventoryTableAfter sorted={false} />}
              onAccept={(p) => accept("table", p)}
              onUndo={() => undo("table")}
              disabled={anyBusy && statuses.table === "idle"}
              nudge={statuses.stats === "done" ? undefined : "Nice — try the summary metrics above."}
            />
          </section>
        </div>

        <aside className="lg:sticky lg:top-6">
          <div className="space-y-4">
            <AnimatePresence>
              {bothDone && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl border border-good/30 bg-good-soft px-4 py-3.5"
                >
                  <div className="text-[13px] font-medium text-good">2 changes shipped this session</div>
                  <p className="mt-1 text-[13px] leading-snug text-ink-soft">
                    Every edit was reviewed before it landed — nothing changed silently.
                  </p>
                  <button
                    onClick={restart}
                    className="mt-2.5 rounded-md border border-good/30 bg-surface px-2.5 py-1 text-[12px] font-medium text-good outline-none transition hover:bg-good-soft focus-visible:ring-2 focus-visible:ring-good"
                  >
                    Restart demo
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <ChangeHistory entries={history} />
          </div>
        </aside>
      </div>
    </div>
  );
}
