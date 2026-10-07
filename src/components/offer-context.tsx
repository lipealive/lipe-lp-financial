"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import type { PageOffer } from "@/config/site";
import { setTrackingOffer } from "@/lib/tracking/config";
import { claritySet } from "@/lib/tracking/clarity";

const OfferContext = createContext<PageOffer | null>(null);

/**
 * Oferta da rota atual (/, /97, /127...). As seções client leem com useOffer().
 * Também informa a oferta ao tracking (parâmetro `oferta` em todos os eventos)
 * e marca a sessão do Clarity com a tag `oferta`.
 */
export function OfferProvider({ offer, children }: { offer: PageOffer; children: ReactNode }) {
  const tracking = { id: offer.id, price: offer.price, currency: offer.currency };

  // Durante o render: garante a oferta antes do PageView (que roda no effect do PageTracker).
  setTrackingOffer(tracking);

  useEffect(() => {
    setTrackingOffer({ id: offer.id, price: offer.price, currency: offer.currency });
    claritySet("oferta", offer.id);
    // Saindo da landing (ex.: indo pra /privacidade), os eventos deixam de levar oferta.
    return () => setTrackingOffer(null);
  }, [offer.id, offer.price, offer.currency]);

  return <OfferContext value={offer}>{children}</OfferContext>;
}

export function useOffer(): PageOffer {
  const offer = useContext(OfferContext);
  if (!offer) throw new Error("useOffer() precisa estar dentro de <OfferProvider>.");
  return offer;
}
