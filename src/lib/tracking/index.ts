import { offer, site } from "@/config/site";
import { clarityEvent, claritySet } from "./clarity";
import type { CheckoutOrigem, ScrollPercent, Secao } from "./events";
import { trackCustom, trackPageView, trackViewContent } from "./meta";
import { oncePerSession } from "./session";

export { trackCustom, trackPageView, trackViewContent } from "./meta";
export { clarityEvent } from "./clarity";
export { SECTIONS, SCROLL_STEPS } from "./events";
export type { CheckoutOrigem, Secao, ScrollPercent } from "./events";

/** PageView (todo carregamento / troca de rota). */
export function pageView() {
  trackPageView();
}

/** ViewContent: uma vez por sessão (15s na página OU 50% de rolagem). */
export function viewContentOnce() {
  if (!oncePerSession("ViewContent")) return;
  trackViewContent({
    content_name: site.productName,
    value: offer.price,
    currency: offer.currency,
    oferta: offer.id,
  });
}

/** Clique num CTA de compra, com a seção de origem. Dispara em todo clique. */
export function cliqueCheckout(secao: CheckoutOrigem) {
  trackCustom("CliqueCheckout", { secao, oferta: offer.id });
  claritySet("checkout_secao", secao);
  clarityEvent("CliqueCheckout");
  clarityEvent(`CliqueCheckout_${secao}`);
}

/** Vídeo da Demo: primeiro play e ativação do som. */
export function videoDemo(acao: "play" | "som") {
  trackCustom("VideoDemo", { acao });
}

/** Profundidade de rolagem: uma vez por sessão em cada marco. */
export function rolagem(percent: ScrollPercent) {
  if (!oncePerSession(`Rolagem:${percent}`)) return;
  trackCustom("Rolagem", { percent });
}

/** Seção vista (≥50% visível por 1s): uma vez por sessão por seção. */
export function secaoVista(secao: Secao) {
  if (!oncePerSession(`SecaoVista:${secao}`)) return;
  trackCustom("SecaoVista", { secao });
  clarityEvent(`SecaoVista_${secao}`);

  if (secao === "oferta") {
    trackCustom("ViuOferta");
    clarityEvent("ViuOferta");
  }
}
