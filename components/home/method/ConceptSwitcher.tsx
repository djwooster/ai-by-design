"use client";

import { useEffect, useState } from "react";
import { cx } from "@/lib/cx";

const KEY = "method-concept";

/**
 * Cycles the Method section between design concepts while DJ chooses one.
 * Remembers the pick in this browser. Shown outside production only.
 */
export function ConceptSwitcher({ concepts }: { concepts: { id: string; label: string; node: React.ReactNode }[] }) {
  const [current, setCurrent] = useState(concepts[0].id);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      // Restoring a saved choice after hydration; the server always renders the first concept.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved && concepts.some((c) => c.id === saved)) setCurrent(saved);
    } catch {}
  }, [concepts]);

  const choose = (id: string) => {
    setCurrent(id);
    try {
      localStorage.setItem(KEY, id);
    } catch {}
  };

  return (
    <>
      <div className="mb-10 flex justify-center">
        <div role="radiogroup" aria-label="Design concept" className="inline-flex items-center gap-1 rounded-full border border-dashed border-line-strong p-1">
          <span className="px-2.5 font-mono text-label uppercase text-fg-muted">Concept</span>
          {concepts.map((concept) => (
            <button
              key={concept.id}
              type="button"
              role="radio"
              aria-checked={current === concept.id}
              onClick={() => choose(concept.id)}
              className={cx(
                "h-7 min-w-7 rounded-full px-2.5 text-ui-sm transition-colors duration-150",
                current === concept.id ? "bg-fg text-canvas" : "text-fg-secondary hover:text-fg",
              )}
            >
              {concept.label}
            </button>
          ))}
        </div>
      </div>
      {concepts.find((c) => c.id === current)?.node}
    </>
  );
}
