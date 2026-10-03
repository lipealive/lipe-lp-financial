import { clarityEnabled } from "./config";

/** Mesma fila do snippet oficial: chamadas antes do script carregar não se perdem. */
function ensureClarity(): NonNullable<Window["clarity"]> {
  if (!window.clarity) {
    const clarity: NonNullable<Window["clarity"]> = function (...args: unknown[]) {
      (clarity.q = clarity.q ?? []).push(args);
    };
    window.clarity = clarity;
  }
  return window.clarity;
}

/** Evento customizado do Clarity (aparece como filtro nas gravações). */
export function clarityEvent(name: string) {
  if (!clarityEnabled || typeof window === "undefined") return;
  try {
    ensureClarity()("event", name);
  } catch {
    // tracking nunca pode quebrar a página
  }
}

/** Tag customizada do Clarity (chave/valor). */
export function claritySet(key: string, value: string) {
  if (!clarityEnabled || typeof window === "undefined") return;
  try {
    ensureClarity()("set", key, value);
  } catch {
    // idem
  }
}
