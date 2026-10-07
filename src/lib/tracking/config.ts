/**
 * Configuração de tracking no cliente.
 *
 * Os IDs são lidos no SERVIDOR (process.env.META_PIXEL_ID / CLARITY_ID, no layout)
 * e chegam aqui por props, via configureTracking(). Não há variável NEXT_PUBLIC_*.
 * Sem ID, a parte correspondente fica desligada, sem erro.
 * (O token da API de Conversões nunca chega ao cliente: só é lido em /api/meta.)
 */
export type TrackingConfig = {
  /** ID do pixel do Meta. Vazio = Pixel e CAPI desligados. */
  pixelId: string;
  /** O script do Clarity foi injetado? */
  clarity: boolean;
};

const config: TrackingConfig = { pixelId: "", clarity: false };

/** Chamado uma vez pelo PageTracker, antes de qualquer evento. Idempotente. */
export function configureTracking(next: TrackingConfig) {
  config.pixelId = next.pixelId;
  config.clarity = next.clarity;
}

export function getPixelId() {
  return config.pixelId;
}

export function metaEnabled() {
  return config.pixelId.length > 0;
}

export function clarityEnabled() {
  return config.clarity;
}

/** Oferta da página atual (vem do OfferProvider). Null fora da landing. */
export type TrackingOffer = { id: string; price: number; currency: string };

let currentOffer: TrackingOffer | null = null;

export function setTrackingOffer(offer: TrackingOffer | null) {
  currentOffer = offer;
}

export function getTrackingOffer() {
  return currentOffer;
}
