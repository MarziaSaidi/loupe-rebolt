"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STEP_MS = 550;

export function ProcessingOverlay({
  steps,
  onComplete,
}: {
  steps: string[];
  onComplete: () => void;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= steps.length - 1) {
      const t = setTimeout(onComplete, STEP_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), STEP_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <div className="absolute inset-0 z-30 overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-surface/72 backdrop-blur-[1.5px]" />
      <motion.div
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-accent/12 to-transparent"
        animate={{ x: ["-40%", "160%"] }}
        transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-x-0 bottom-0 flex justify-center pb-5">
        <div className="flex items-center gap-2.5 rounded-full border border-border bg-surface px-3.5 py-2 shadow-[0_4px_16px_rgba(20,20,15,0.12)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="font-mono text-[12px] text-ink-soft"
            >
              {steps[index]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
