export type RegionId = "stats" | "table";

export type RegionStatus =
  | "idle"
  | "annotating"
  | "processing"
  | "reviewing"
  | "done";

export interface InventoryRow {
  part: string;
  description: string;
  supplier: string;
  onHand: number;
  reorderPt: number;
  status: "low" | "ordered" | "ok";
  lastOrder: string;
}

export const inventoryRows: InventoryRow[] = [
  { part: "RM-1042", description: "6061 Aluminum Billet 4×4×12", supplier: "Alcast Supply", onHand: 18, reorderPt: 25, status: "low", lastOrder: "Aug 02" },
  { part: "FS-2210", description: "M8 Socket Cap Screw (100pk)", supplier: "Fastenal", onHand: 340, reorderPt: 150, status: "ok", lastOrder: "Jul 28" },
  { part: "CT-0087", description: "Carbide End Mill 1/2in", supplier: "Kennametal", onHand: 6, reorderPt: 10, status: "low", lastOrder: "Aug 10" },
  { part: "HY-3305", description: "Hydraulic Hose Assembly 3/8in", supplier: "Parker", onHand: 12, reorderPt: 8, status: "ok", lastOrder: "Aug 05" },
  { part: "WL-4471", description: "Welding Wire ER70S-6 .035", supplier: "Lincoln Electric", onHand: 4, reorderPt: 12, status: "ordered", lastOrder: "Aug 14" },
  { part: "BR-5502", description: "Bronze Bushing 1in Bore", supplier: "Boston Gear", onHand: 22, reorderPt: 15, status: "ok", lastOrder: "Jul 30" },
  { part: "ST-6620", description: "304 Stainless Sheet 16ga", supplier: "Metals Depot", onHand: 9, reorderPt: 10, status: "low", lastOrder: "Aug 11" },
  { part: "PN-7788", description: "Pneumatic Cylinder 2in Bore", supplier: "SMC", onHand: 5, reorderPt: 6, status: "ordered", lastOrder: "Aug 15" },
  { part: "CB-8891", description: "Ball Bearing 6205-2RS", supplier: "NSK", onHand: 60, reorderPt: 40, status: "ok", lastOrder: "Jul 25" },
];

export const inventoryColumns: {
  key: keyof InventoryRow;
  label: string;
  width: number;
  numeric?: boolean;
}[] = [
  { key: "part", label: "Part #", width: 84 },
  { key: "description", label: "Description", width: 208 },
  { key: "supplier", label: "Supplier", width: 124 },
  { key: "onHand", label: "On hand", width: 76, numeric: true },
  { key: "reorderPt", label: "Reorder pt.", width: 84, numeric: true },
  { key: "status", label: "Status", width: 96 },
  { key: "lastOrder", label: "Last order", width: 84 },
];

export interface StatDatum {
  label: string;
  value: string;
  tone: "warning" | "good" | "neutral";
  delta: string;
  deltaDirection: "up" | "down" | "flat";
}

export const statData: StatDatum[] = [
  { label: "Open purchase orders", value: "14", tone: "neutral", delta: "+2 vs last week", deltaDirection: "up" },
  { label: "Low stock items", value: "4", tone: "warning", delta: "+2 vs last week", deltaDirection: "up" },
  { label: "Avg. lead time", value: "8.2 days", tone: "good", delta: "-0.4d vs last week", deltaDirection: "down" },
];

export interface Scenario {
  id: RegionId;
  regionLabel: string;
  defaultPrompt: string;
  processingSteps: string[];
  changes: string[];
}

export const scenarios: Record<RegionId, Scenario> = {
  stats: {
    id: "stats",
    regionLabel: "Summary metrics",
    defaultPrompt:
      "These need more visual hierarchy — I can't tell what's good or bad at a glance.",
    processingSteps: [
      "Reading summary metrics",
      "Applying semantic color and hierarchy",
      "Adding week-over-week trend deltas",
      "Rendering preview",
    ],
    changes: [
      "Converted plain numbers into labeled stat cards",
      "Added semantic color — amber for attention, green for on-target",
      "Added week-over-week trend indicators",
      "Increased number weight and size for at-a-glance reading",
    ],
  },
  table: {
    id: "table",
    regionLabel: "Inventory table",
    defaultPrompt: "Make this table easier to scan. Keep the same data.",
    processingSteps: [
      "Reading table structure — 9 rows × 7 columns",
      "Applying row height, zebra striping, numeric alignment",
      "Grouping rows by urgency, pinning header",
      "Rendering preview",
    ],
    changes: [
      "Increased row height for easier scanning (32px → 44px)",
      "Added zebra striping to track rows across columns",
      "Right-aligned quantities with tabular numerals",
      "Converted status text into colored pills",
      "Once kept, rows regroup by urgency — items needing attention float to top",
      "Pinned the header while scrolling",
    ],
  },
};
