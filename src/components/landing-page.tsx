import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { OfferProvider } from "@/components/offer-context";
import { SectionDivider } from "@/components/section-divider";
import { Hero } from "@/components/sections/hero";
import { Vitrine } from "@/components/sections/vitrine";
import { Consultor } from "@/components/sections/consultor";
import { Funcionalidades } from "@/components/sections/funcionalidades";
import { Demo } from "@/components/sections/demo";
import { MarqueeBand } from "@/components/sections/marquee-band";
import { Lipe } from "@/components/sections/lipe";
import { Comparativo } from "@/components/sections/comparativo";
import { Oferta } from "@/components/sections/oferta";
import { Faq } from "@/components/sections/faq";
import { CtaFinal } from "@/components/sections/cta-final";
import { resolvePageOffer } from "@/config/offer-page";
import type { OfferId } from "@/config/site";

/** A landing inteira para uma oferta. Usada por "/" e por "/[oferta]". */
export function LandingPage({ offerId }: { offerId: OfferId }) {
  const offer = resolvePageOffer(offerId);

  return (
    <OfferProvider offer={offer}>
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <SectionDivider />
        <Vitrine />
        <SectionDivider />
        <Consultor />
        <SectionDivider />
        <Funcionalidades />
        <Demo />
        <MarqueeBand />
        <Lipe />
        <SectionDivider />
        <Comparativo />
        <Oferta />
        <Faq />
        <CtaFinal offer={offer} />
      </main>
      <Footer />
      <MobileCtaBar />
    </OfferProvider>
  );
}
