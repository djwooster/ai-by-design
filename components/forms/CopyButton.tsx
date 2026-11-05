"use client";

import { useState } from "react";
import { GeoIcon } from "@/components/icons/GeoIcon";
import { cx } from "@/lib/cx";

/** Copies `text` and says so for a moment. */
export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }}
      className={cx(
        "inline-flex h-7 shrink-0 items-center gap-1.5 rounded-md border border-line-strong px-2.5 text-ui-sm text-fg-secondary transition-colors hover:border-fg-muted hover:text-fg",
        className,
      )}
    >
      {copied && <GeoIcon name="check" size={14} className="text-positive" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
