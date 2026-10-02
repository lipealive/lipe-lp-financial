"use client";

import { useEffect, useState } from "react";

/**
 * Ciclo: visão completa (2s) → zoom destaque i + pill (2,5s) → visão completa (1,5s) → zoom i+1 ...
 * A pill entra 0,7s depois do zoom começar e some 0,4s antes do zoom out.
 */
export type ZoomPhase =
  | { kind: "full"; next: number; first: boolean }
  | { kind: "zoom"; index: number; pill: boolean; closing: boolean };

const FULL_FIRST_MS = 2000;
const FULL_MS = 1500;
const ZOOM_MS = 2500;
const PILL_IN_MS = 700;
const PILL_OUT_MS = 400;

const INITIAL: ZoomPhase = { kind: "full", next: 0, first: true };

export function useZoomLoop(count: number, resetKey: string, paused: boolean, disabled: boolean) {
  const [phase, setPhase] = useState<ZoomPhase>(INITIAL);

  // Ao trocar de etapa, reinicia na visão completa.
  const [lastKey, setLastKey] = useState(resetKey);
  if (lastKey !== resetKey) {
    setLastKey(resetKey);
    setPhase(INITIAL);
  }

  useEffect(() => {
    if (disabled || paused || count === 0) return;

    let ms: number;
    let next: ZoomPhase;

    if (phase.kind === "full") {
      ms = phase.first ? FULL_FIRST_MS : FULL_MS;
      next = { kind: "zoom", index: phase.next % count, pill: false, closing: false };
    } else if (!phase.pill && !phase.closing) {
      ms = PILL_IN_MS;
      next = { ...phase, pill: true };
    } else if (phase.pill) {
      ms = ZOOM_MS - PILL_IN_MS - PILL_OUT_MS;
      next = { ...phase, pill: false, closing: true };
    } else {
      ms = PILL_OUT_MS;
      next = { kind: "full", next: (phase.index + 1) % count, first: false };
    }

    const id = setTimeout(() => setPhase(next), ms);
    return () => clearTimeout(id);
  }, [phase, paused, disabled, count]);

  return disabled ? INITIAL : phase;
}
