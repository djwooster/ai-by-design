import { GeoIcon } from "@/components/icons/GeoIcon";
import type { Product } from "@/lib/content/products";
import { cx } from "@/lib/cx";

/*
 * Each product's cover: a small, realistic picture of the thing itself, set on
 * a light or blue panel (references/06). The playbook is a page, the prompt
 * pack is a CLAUDE.md open in an editor, the starter kit is its repository.
 * Inside a `group`, the object lifts slightly on hover.
 */

const panel: Record<Product["cover"], string> = {
  playbook: "theme-light",
  prompts: "theme-blue",
  kit: "theme-light",
};

export function ProductCover({ product, large, className }: { product: Product; large?: boolean; className?: string }) {
  return (
    <div
      aria-hidden
      className={cx(
        "relative flex items-end justify-center overflow-hidden rounded-2xl px-8 pt-10",
        large ? "min-h-[360px] md:min-h-[460px] md:px-14 md:pt-16" : "h-[260px]",
        panel[product.cover],
        className,
      )}
    >
      <div
        className={cx(
          "w-full transition-transform duration-500 ease-glide group-hover:-translate-y-1.5",
          large ? "max-w-[30rem]" : "max-w-[19rem]",
        )}
      >
        {product.cover === "playbook" && <Playbook />}
        {product.cover === "prompts" && <Prompts />}
        {product.cover === "kit" && <Kit />}
      </div>
    </div>
  );
}

/** A page of the playbook, its bottom running off the panel. */
function Playbook() {
  const steps = ["Developer account", "App Store Connect record", "Screenshots", "Privacy details", "Review notes"];
  return (
    <div className="rounded-t-xl border border-b-0 border-line bg-(--white) px-6 pt-6 pb-8 shadow-[0_1px_0_var(--border)]">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">Playbook · 01</span>
        <GeoIcon name="playbook" size={16} className="text-fg-muted" />
      </div>
      <p className="mt-4 text-[17px] leading-tight font-medium tracking-[-0.02em] text-fg">Submitting to the App Store</p>
      <ul className="mt-5 space-y-2.5">
        {steps.map((step, i) => (
          <li key={step} className="flex items-center gap-2.5 text-[12px] text-fg-secondary">
            <span
              className={cx(
                "flex size-3.5 shrink-0 items-center justify-center rounded-full border",
                i < 2 ? "border-accent bg-accent text-on-accent" : "border-line-strong",
              )}
            >
              {i < 2 && (
                <svg viewBox="0 0 10 10" className="size-2" fill="none" stroke="currentColor" strokeWidth={1.6}>
                  <path d="M2.2 5.2L4.2 7.1L7.8 3.2" />
                </svg>
              )}
            </span>
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** CLAUDE.md open in an editor, on the blue panel. */
function Prompts() {
  const lines: [string, string][] = [
    ["# CLAUDE.md", "text-fg"],
    ["", ""],
    ["## Working agreement", "text-fg"],
    ["- Read the tokens before any view.", "text-fg-secondary"],
    ["- One screen per change. Stop.", "text-fg-secondary"],
    ["- Verify with tsc and lint.", "text-fg-secondary"],
    ["", ""],
    ["## Design", "text-fg"],
    ["- Never hard-code a color.", "text-fg-secondary"],
  ];
  return (
    <div className="overflow-hidden rounded-t-xl border border-b-0 border-line-strong bg-surface-2">
      <div className="flex h-8 items-center gap-1.5 border-b border-line px-3">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2 rounded-full bg-(--border-strong)" />
        ))}
        <span className="ml-3 rounded-md bg-surface px-2 py-0.5 font-mono text-[10px] text-fg">CLAUDE.md</span>
        <span className="font-mono text-[10px] text-fg-muted">prompts/</span>
      </div>
      <div className="px-4 pt-4 pb-7 font-mono text-[11px] leading-[1.75]">
        {lines.map(([text, tone], i) => (
          <div key={i} className="flex gap-4">
            <span className="w-3 text-right text-fg-muted opacity-60">{i + 1}</span>
            <span className={tone}>{text || " "}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** The starter kit's repository tree. */
function Kit() {
  const tree: [number, string, "dir" | "file"][] = [
    [0, "app", "dir"],
    [1, "(tabs)", "dir"],
    [1, "paywall.tsx", "file"],
    [0, "components", "dir"],
    [0, "theme", "dir"],
    [1, "tokens.ts", "file"],
    [0, "app.json", "file"],
    [0, "CLAUDE.md", "file"],
  ];
  return (
    <div className="overflow-hidden rounded-t-xl border border-b-0 border-line bg-(--white)">
      <div className="flex h-9 items-center justify-between border-b border-line px-4">
        <span className="font-mono text-[11px] text-fg">starter-kit</span>
        <span className="rounded-full border border-line-strong px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-fg-muted">
          main
        </span>
      </div>
      <ul className="px-4 pt-3 pb-7 font-mono text-[11px] leading-[1.9]">
        {tree.map(([depth, name, kind]) => (
          <li key={name} className="flex items-center gap-2" style={{ paddingLeft: depth * 16 }}>
            {kind === "dir" ? (
              <svg viewBox="0 0 12 12" className="size-3 text-fg-muted" fill="none" stroke="currentColor" strokeWidth={1.2}>
                <path d="M1.5 3.5h3l1 1h5v5h-9z" />
              </svg>
            ) : (
              <svg viewBox="0 0 12 12" className="size-3 text-fg-muted" fill="none" stroke="currentColor" strokeWidth={1.2}>
                <path d="M3 1.5h4l2 2v7H3z" />
              </svg>
            )}
            <span className={name === "CLAUDE.md" ? "text-accent-fg" : "text-fg-secondary"}>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
