# Loupe

**Annotate → Diff → Trust.** A concept prototype exploring how Rebolt's AI-generated apps could earn trust on the *second* edit, not just the first.

Not an official Rebolt product. Built as a targeted case study for their Founding Frontend/Design Engineer role.

## The idea

Rebolt's own blog recommends annotating screenshots to direct AI edits. A real prospect on their Product Hunt launch asked the one question that matters once an app already exists: *"Does it handle back-and-forth iterations too?"*

Loupe answers both at once — point at what should change, watch the AI apply it, then visually compare exactly what changed before you keep it or undo it.

## Try it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Hover the summary metrics or the inventory table, click **Annotate**, and send the pre-filled instruction (or write your own).

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion

No backend, no auth, no real model calls — the AI response is scripted so the interaction can be judged on its own terms. Everything else (the diff comparison, the drag-to-compare slider, the change history, the state machine driving the six-step loop) is real, working code.

## Structure

- `components/annotatable-region.tsx` — the state machine (idle → annotating → processing → reviewing → done) wrapping any region of the app
- `components/diff-reveal.tsx` — the before/after wipe comparison
- `components/workspace.tsx` — wires the two demo regions together and tracks change history
- `lib/scenarios.ts` — the scripted content for both annotatable regions
