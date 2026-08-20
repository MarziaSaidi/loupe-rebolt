import { inventoryColumns, inventoryRows, type InventoryRow } from "@/lib/scenarios";

const statusLabel: Record<InventoryRow["status"], string> = {
  low: "Low Stock",
  ordered: "On Order",
  ok: "OK",
};

function Cols() {
  return (
    <colgroup>
      {inventoryColumns.map((c) => (
        <col key={c.key} style={{ width: c.width }} />
      ))}
    </colgroup>
  );
}

export function InventoryTableBefore({ compact = false }: { compact?: boolean }) {
  const rowH = compact ? "h-8" : "h-11";
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] table-fixed border-collapse text-[13px]">
        <Cols />
        <thead>
          <tr className="border-b border-border">
            {inventoryColumns.map((c) => (
              <th
                key={c.key}
                className="px-3 py-2 text-left text-[11px] font-medium uppercase tracking-wide text-muted"
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {inventoryRows.map((row) => (
            <tr key={row.part} className={`${rowH} border-b border-border`}>
              <td className="px-3 text-ink-soft">{row.part}</td>
              <td className="px-3 text-ink">{row.description}</td>
              <td className="px-3 text-ink-soft">{row.supplier}</td>
              <td className="px-3 text-ink">{row.onHand}</td>
              <td className="px-3 text-ink-soft">{row.reorderPt}</td>
              <td className="px-3 text-ink-soft">{statusLabel[row.status]}</td>
              <td className="px-3 text-ink-soft">{row.lastOrder}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const statusPill: Record<InventoryRow["status"], string> = {
  low: "bg-warning-soft text-warning",
  ordered: "bg-accent-soft text-accent-ink",
  ok: "bg-good-soft text-good",
};

const urgency: Record<InventoryRow["status"], number> = { low: 0, ordered: 1, ok: 2 };

export function InventoryTableAfter({
  scrollable = false,
  sorted = true,
}: {
  scrollable?: boolean;
  /** Group rows by urgency. Off during the before/after comparison so each
   * row stays spatially aligned with its "before" counterpart — grouping
   * is a layout change, not a per-row style diff, so it applies once the
   * edit is accepted rather than mid-comparison. */
  sorted?: boolean;
}) {
  const rows = sorted
    ? [...inventoryRows].sort((a, b) => urgency[a.status] - urgency[b.status])
    : inventoryRows;
  const table = (
    <table className="w-full min-w-[760px] table-fixed border-collapse text-[13px]">
      <Cols />
      <thead>
        <tr className={`border-b border-border bg-surface ${scrollable ? "sticky top-0 z-10" : ""}`}>
          {inventoryColumns.map((c) => (
            <th
              key={c.key}
              className={`px-3 py-2.5 text-[11px] font-medium uppercase tracking-wide text-muted ${c.numeric ? "text-right" : "text-left"}`}
            >
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={row.part}
            className={`h-11 border-b border-border ${i % 2 === 1 ? "bg-surface-2/60" : ""}`}
          >
            <td className="px-3 font-mono text-[12px] text-ink-soft">{row.part}</td>
            <td className="px-3 font-medium text-ink">{row.description}</td>
            <td className="px-3 text-ink-soft">{row.supplier}</td>
            <td className="px-3 text-right font-mono tabular-nums text-ink">{row.onHand}</td>
            <td className="px-3 text-right font-mono tabular-nums text-ink-soft">{row.reorderPt}</td>
            <td className="px-3">
              <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${statusPill[row.status]}`}>
                {statusLabel[row.status]}
              </span>
            </td>
            <td className="px-3 text-ink-soft">{row.lastOrder}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (!scrollable) {
    return <div className="overflow-x-auto">{table}</div>;
  }
  return (
    <div className="max-h-[300px] overflow-y-auto overflow-x-auto rounded-b-lg">
      {table}
    </div>
  );
}
