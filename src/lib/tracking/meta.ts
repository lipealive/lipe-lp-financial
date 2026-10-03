import { META_PIXEL_ID, metaEnabled } from "./config";
import type { CustomEvent, EventParams, StandardEvent } from "./events";

/** event_id único por evento: o mesmo vai pro Pixel e pra API de Conversões (deduplicação). */
export function newEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Cria a fila `fbq` (mesmo stub do snippet oficial) e faz o init uma única vez.
 * Assim os eventos disparados antes do fbevents.js terminar de carregar ficam na fila.
 */
function ensureFbq(): NonNullable<Window["fbq"]> {
  if (!window.fbq) {
    const fbq: NonNullable<Window["fbq"]> = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue!.push(args);
    };
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
    if (!window._fbq) window._fbq = fbq;
    fbq("init", META_PIXEL_ID);
  }
  return window.fbq;
}

function send(kind: "track" | "trackCustom", name: string, params?: EventParams) {
  if (!metaEnabled || typeof window === "undefined") return;

  const eventId = newEventId();

  try {
    ensureFbq()(kind, name, params ?? {}, { eventID: eventId });
  } catch {
    // tracking nunca pode quebrar a página
  }

  // API de Conversões: mesmo event_id. keepalive mantém o envio mesmo saindo da página.
  try {
    const fbclid = new URLSearchParams(window.location.search).get("fbclid") ?? undefined;
    void fetch("/api/meta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        event_name: name,
        event_id: eventId,
        event_source_url: window.location.href,
        custom_data: params,
        fbclid,
      }),
    }).catch(() => {});
  } catch {
    // idem
  }
}

export function trackStandard(name: StandardEvent, params?: EventParams) {
  send("track", name, params);
}

export function trackPageView() {
  send("track", "PageView");
}

export function trackViewContent(params: { content_name: string; value: number; currency: string }) {
  send("track", "ViewContent", params);
}

export function trackCustom(name: CustomEvent, params?: EventParams) {
  send("trackCustom", name, params);
}
