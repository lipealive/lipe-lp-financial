import { site } from "@/config/site";

export type ScreenKey = "orcamento" | "visao-geral" | "reserva";
export type ScreenTheme = "light" | "dark";

/**
 * Um destaque dentro do print, em coordenadas normalizadas (0–1) da imagem.
 * cx/cy = centro do zoom; scale = fator; anchor = ponto exato que a pill aponta.
 */
export type Highlight = {
  cx: number;
  cy: number;
  scale: number;
  label: string;
  anchor: { x: number; y: number };
  /** Lado em que a etiqueta abre em relação ao anchor (padrão: acima). */
  labelSide?: "above" | "below";
};

export type Screen = {
  key: ScreenKey;
  label: string;
  title: string;
  bullets: string[];
  highlights: Highlight[];
};

export const screens: Screen[] = [
  {
    key: "orcamento",
    label: "Orçamento",
    title: "Saiba exatamente quanto entra, quanto sai e quanto sobra.",
    bullets: [
      "Receitas, despesas fixas e variáveis",
      "Compras parceladas sob controle",
      "Importe o extrato do banco",
      "Gráfico de gastos por categoria",
    ],
    highlights: [
      { cx: 0.8, cy: 0.3, scale: 1.8, label: "Saldo do mês R$ 1.333,37 ↑", anchor: { x: 0.885, y: 0.25 }, labelSide: "below" },
      { cx: 0.83, cy: 0.56, scale: 1.7, label: "Gastos por categoria", anchor: { x: 0.83, y: 0.415 } },
      { cx: 0.42, cy: 0.55, scale: 1.8, label: "Compras parceladas 1/12", anchor: { x: 0.33, y: 0.625 }, labelSide: "below" },
    ],
  },
  {
    key: "visao-geral",
    label: "Visão geral",
    title: "Compare meses e veja se você está evoluindo.",
    bullets: [
      "Saldo do período em um olhar",
      "Filtros de 3, 6 e 12 meses",
      "Patrimônio e investimentos juntos",
    ],
    highlights: [
      { cx: 0.38, cy: 0.42, scale: 1.75, label: "Saldo do período R$ 1.378,37", anchor: { x: 0.555, y: 0.33 }, labelSide: "below" },
      { cx: 0.78, cy: 0.72, scale: 1.7, label: "Reserva R$ 10.000", anchor: { x: 0.715, y: 0.66 }, labelSide: "below" },
    ],
  },
  {
    key: "reserva",
    label: "Reserva",
    title: "Construa sua proteção, um aporte de cada vez.",
    bullets: [
      "Cálculo da reserva ideal pra você",
      "Onde ela está guardada",
      "Quanto já está protegido, em %",
    ],
    highlights: [
      { cx: 0.42, cy: 0.47, scale: 1.5, label: "33% protegido", anchor: { x: 0.448, y: 0.4 } },
      { cx: 0.72, cy: 0.33, scale: 1.8, label: "Meta R$ 30.000", anchor: { x: 0.72, y: 0.3 }, labelSide: "below" },
    ],
  },
];

export function screenSrc(key: ScreenKey, theme: ScreenTheme) {
  return `/images/app/${theme}/${key}.png`;
}

export function screenAvailable(key: ScreenKey, theme: ScreenTheme) {
  if (theme === "dark" && !site.screens.hasDarkScreens) return false;
  return site.screens.available[key];
}

/** Transform de "visão completa". */
export const FULL_VIEW = { scale: 1, x: "0%", y: "0%" };

/**
 * Converte o destaque em transform do layer da imagem (x/y em % do próprio elemento)
 * e devolve a posição do anchor já projetada no container (0–1).
 */
export function resolveHighlight(h: Highlight) {
  const s = Math.max(1, h.scale);
  const lim = (s - 1) / (2 * s); // limita o centro pra nunca mostrar borda vazia
  const cx = Math.min(0.5 + lim, Math.max(0.5 - lim, h.cx));
  const cy = Math.min(0.5 + lim, Math.max(0.5 - lim, h.cy));
  const project = (p: number, c: number) => (p - c) * s + 0.5;
  return {
    transform: { scale: s, x: `${(0.5 - cx) * s * 100}%`, y: `${(0.5 - cy) * s * 100}%` },
    anchor: { x: project(h.anchor.x, cx), y: project(h.anchor.y, cy) },
  };
}
