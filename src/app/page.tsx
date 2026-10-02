import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { SectionDivider } from "@/components/section-divider";
import { Hero } from "@/components/sections/hero";
import { Vitrine } from "@/components/sections/vitrine";
import { Funcionalidades } from "@/components/sections/funcionalidades";
import { Demo } from "@/components/sections/demo";
import { MarqueeBand } from "@/components/sections/marquee-band";
import { Lipe } from "@/components/sections/lipe";
import { Comparativo } from "@/components/sections/comparativo";
import { Oferta } from "@/components/sections/oferta";
import { Faq } from "@/components/sections/faq";
import { CtaFinal } from "@/components/sections/cta-final";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <SectionDivider />
        <Vitrine />
        <SectionDivider />
        <Funcionalidades />
        <Demo />
        <MarqueeBand />
        <Lipe />
        <SectionDivider />
        <Comparativo />
        <Oferta />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <MobileCtaBar />
    </>
  );
}
