import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";
import { DEFAULT_OFFER } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** Raiz: tráfego orgânico e link da bio, sempre com a oferta padrão (sem redirect). */
export default function Home() {
  return <LandingPage offerId={DEFAULT_OFFER} />;
}
