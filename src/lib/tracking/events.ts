/** Seções da página (parâmetro `secao`). */
export const SECTIONS = [
  "hero",
  "vitrine",
  "funcionalidades",
  "demo",
  "lipe",
  "comparativo",
  "oferta",
  "faq",
  "cta-final",
] as const;
export type Secao = (typeof SECTIONS)[number];

/** Origem de um clique de checkout. */
export type CheckoutOrigem = Secao | "barra-mobile" | "header";

export const SCROLL_STEPS = [25, 50, 75, 100] as const;
export type ScrollPercent = (typeof SCROLL_STEPS)[number];

/** Eventos padrão do Meta usados aqui. InitiateCheckout e Purchase vêm da Kiwify. */
export type StandardEvent = "PageView" | "ViewContent";

export type CustomEvent = "CliqueCheckout" | "VideoDemo" | "Rolagem" | "SecaoVista" | "ViuOferta";

export type EventParams = Record<string, string | number | boolean>;

/** Nomes aceitos pela rota /api/meta (qualquer outro é recusado). */
export const ALLOWED_EVENTS: readonly string[] = [
  "PageView",
  "ViewContent",
  "CliqueCheckout",
  "VideoDemo",
  "Rolagem",
  "SecaoVista",
  "ViuOferta",
];

export const STANDARD_EVENTS: readonly string[] = ["PageView", "ViewContent"];
