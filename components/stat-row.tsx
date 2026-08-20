import { statData, type StatDatum } from "@/lib/scenarios";

function TrendGlyph({ direction }: { direction: StatDatum["deltaDirection"] }) {
  if (direction === "flat") return <span aria-hidden>·</span>;
  const rotate = direction === "up" ? "" : "rotate-180";
  return (
    <svg
      viewBox="0 0 10 10"
      className={`h-2.5 w-2.5 ${rotate}`}
      fill="none"
      aria-hidden
    >
      <path d="M5 1.5 L8.5 7.5 L1.5 7.5 Z" fill="currentColor" />
    </svg>
  );
}

const toneStyles = {
  warning: { bar: "bg-warning", text: "text-warning", soft: "bg-warning-soft" },
  good: { bar: "bg-good", text: "text-good", soft: "bg-good-soft" },
  neutral: { bar: "bg-muted", text: "text-ink-soft", soft: "bg-surface-2" },
} as const;

export function StatRowBefore() {
  return (
    <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2 px-1 py-3">
      {statData.map((stat) => (
        <div key={stat.label} className="flex items-baseline gap-2">
          <span className="text-[13px] text-ink-soft">{stat.label}:</span>
          <span className="font-mono text-[16px] text-ink">{stat.value}</span>
        </div>
      ))}
    </div>
  );
}

export function StatRowAfter() {
  return (
    <div className="grid grid-cols-1 gap-3 py-1 sm:grid-cols-3">
      {statData.map((stat) => {
        const tone = toneStyles[stat.tone];
        return (
          <div
            key={stat.label}
            className="relative overflow-hidden rounded-lg border border-border bg-surface px-4 py-3.5 shadow-[0_1px_2px_rgba(20,20,15,0.04)]"
          >
            <div className={`absolute inset-x-0 top-0 h-[3px] ${tone.bar}`} />
            <div className="text-[12px] font-medium uppercase tracking-wide text-muted">
              {stat.label}
            </div>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="font-mono text-[28px] font-medium leading-none tabular-nums text-ink">
                {stat.value}
              </span>
            </div>
            <div className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${tone.soft} ${tone.text}`}>
              <TrendGlyph direction={stat.deltaDirection} />
              {stat.delta}
            </div>
          </div>
        );
      })}
    </div>
  );
}
