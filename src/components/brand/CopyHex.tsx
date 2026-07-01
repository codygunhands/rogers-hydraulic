"use client";

import * as React from "react";

/** Small click-to-copy hex chip used on the /brand swatches. */
export function CopyHex({ hex }: { hex: string }) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // Clipboard unavailable (non-secure context) — no-op, hex is still visible.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-sm border border-graphite-500 bg-graphite-900/60 px-2 py-1 font-body text-xs font-medium text-smoke transition-colors hover:border-hivis hover:text-hivis focus-visible:border-hivis"
      aria-label={`Copy ${hex}`}
    >
      <span className="tabular-nums">{hex}</span>
      <span className="text-steel">{copied ? "copied" : "copy"}</span>
    </button>
  );
}

export default CopyHex;
