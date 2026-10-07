import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";
import { DEFAULT_OFFER, DEFAULT_VERSAO } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** Raiz: tráfego orgânico e link da bio — oferta e versão padrão (p97 + vsl), sem redirect. */
export default function Home() {
  return <LandingPage offerId={DEFAULT_OFFER} versao={DEFAULT_VERSAO} />;
}
