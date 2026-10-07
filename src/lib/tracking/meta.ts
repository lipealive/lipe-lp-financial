import { getPixelId, getTrackingOffer, metaEnabled } from "./config";
import type { CustomEvent, EventParams, StandardEvent } from "./events";

/** event_id único por evento: o mesmo vai pro Pixel e pra API de Conversões (deduplicação). */
export function newEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}

let initialized = false;

/**
 * Garante a fila `fbq` (mesmo stub do snippet oficial) e faz o init UMA vez.
 * - O init não depende de quem criou `window.fbq`: se o fbevents.js carregar antes
 *   do nosso primeiro evento, o pixel ainda é inicializado aqui.
 * - `autoConfig` é desligado ANTES do init: o pixel não dispara eventos automáticos
 *   (cliques em botões, metadados da página). Só saem os eventos que nós enviamos.
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
  }
  if (!initialized) {
    initialized = true;
    const pixelId = getPixelId();
    window.fbq("set", "autoConfig", false, pixelId);
    window.fbq("init", pixelId);
  }
  return window.fbq;
}

/**
 * `track` = evento PADRÃO do Meta (PageView, ViewContent).
 * `trackCustom` = só os nossos eventos (CliqueCheckout, VideoDemo, Rolagem, SecaoVista, ViuOferta).
 */
function send(kind: "track" | "trackCustom", name: string, params?: EventParams) {
  if (typeof window === "undefined" || !metaEnabled()) return;

  const eventId = newEventId();
  // Todo evento leva a oferta e a versão da página (teste A/B), quando houver.
  const offer = getTrackingOffer();
  const data: EventParams = {
    ...(params ?? {}),
    ...(offer ? { oferta: offer.id, versao: offer.versao } : {}),
  };

  try {
    ensureFbq()(kind, name, data, { eventID: eventId });
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
        custom_data: data,
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

/** Evento padrão: fbq('track', 'PageView'). */
export function trackPageView() {
  send("track", "PageView");
}

/** Evento padrão: fbq('track', 'ViewContent', {...}). */
export function trackViewContent(params: { content_name: string; value: number; currency: string }) {
  send("track", "ViewContent", params);
}

/** Eventos custom: fbq('trackCustom', ...). O tipo impede usar um nome de evento padrão aqui. */
export function trackCustom(name: CustomEvent, params?: EventParams) {
  send("trackCustom", name, params);
}
