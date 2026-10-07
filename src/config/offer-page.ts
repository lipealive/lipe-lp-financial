import { existsSync } from "node:fs";
import { join } from "node:path";
import { DEFAULT_OFFER, DEFAULT_VERSAO, getOffer, site, variantSlug, type OfferId, type PageOffer, type Versao } from "./site";

/** true se o arquivo existe em public/ (checado no build: as rotas são estáticas). */
function inPublic(path: string) {
  return existsSync(join(process.cwd(), "public", path));
}

/**
 * Resolve a oferta para a página. Uso SÓ no servidor (lê o disco).
 * Vídeo da Demo: usa `demoVideo` da oferta se o arquivo existir; senão, o padrão (p97).
 * Como as rotas são geradas no build, um vídeo novo exige um novo deploy.
 */
export function resolvePageOffer(id: OfferId, versao: Versao): PageOffer {
  const offer = getOffer(id);
  const fallback = site.demo.video;
  const own = offer.demoVideo;
  const isRoot = id === DEFAULT_OFFER && versao === DEFAULT_VERSAO;
  return {
    ...offer,
    versao,
    path: isRoot ? "/" : `/${variantSlug(id, versao)}`,
    checkoutSck: `${offer.id}-${versao}`,
    video: {
      width: fallback.width,
      height: fallback.height,
      src: own && inPublic(own.src) ? own.src : fallback.src,
      poster: own && inPublic(own.poster) ? own.poster : fallback.poster,
    },
  };
}
