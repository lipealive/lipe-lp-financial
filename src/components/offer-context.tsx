"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import type { PageOffer } from "@/config/site";
import { setTrackingOffer } from "@/lib/tracking/config";
import { claritySet } from "@/lib/tracking/clarity";

const OfferContext = createContext<PageOffer | null>(null);

/**
 * Variação da rota atual (/, /97, /127-sv...): oferta + versão. As seções client leem com useOffer().
 * Também informa ao tracking (parâmetros `oferta` e `versao` em todos os eventos)
 * e marca a sessão do Clarity com as tags `oferta` e `versao`.
 */
export function OfferProvider({ offer, children }: { offer: PageOffer; children: ReactNode }) {
  const tracking = { id: offer.id, price: offer.price, currency: offer.currency, versao: offer.versao };

  // Durante o render: garante a oferta antes do PageView (que roda no effect do PageTracker).
  setTrackingOffer(tracking);

  useEffect(() => {
    setTrackingOffer({ id: offer.id, price: offer.price, currency: offer.currency, versao: offer.versao });
    claritySet("oferta", offer.id);
    claritySet("versao", offer.versao);
    // Saindo da landing (ex.: indo pra /privacidade), os eventos deixam de levar oferta.
    return () => setTrackingOffer(null);
  }, [offer.id, offer.price, offer.currency, offer.versao]);

  return <OfferContext value={offer}>{children}</OfferContext>;
}

export function useOffer(): PageOffer {
  const offer = useContext(OfferContext);
  if (!offer) throw new Error("useOffer() precisa estar dentro de <OfferProvider>.");
  return offer;
}
