"use client";

import { useEffect } from "react";

/** One global listener feeds the cursor position to any `.spotlight` element. */
export default function SpotlightEffect() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as HTMLElement).closest<HTMLElement>(".spotlight");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
