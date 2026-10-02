"use client";

import { useState } from "react";
import { site } from "@/config/site";
import { SectionHeading } from "@/components/section-heading";
import { FadeIn } from "@/components/motion";
import { ThemeToggle } from "@/components/vitrine/theme-toggle";
import { VitrineDesktop } from "@/components/vitrine/vitrine-desktop";
import { VitrineMobile } from "@/components/vitrine/vitrine-mobile";
import type { ScreenTheme } from "@/components/vitrine/screens";

export function Vitrine() {
  const [theme, setTheme] = useState<ScreenTheme>("light");
  const toggle = site.screens.hasDarkScreens ? (
    <ThemeToggle value={theme} onChange={setTheme} />
  ) : undefined;

  return (
    <section id="vitrine" className="relative overflow-x-clip py-20 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Por dentro da plataforma"
          title="Tudo que acontece com seu dinheiro, numa tela só."
          description="Orçamento, visão geral e reserva de emergência conversando entre si, sem fórmula quebrada."
          className="mb-12 lg:mb-20"
        />

        {/* Mobile / tablet */}
        <FadeIn className="lg:hidden">
          <VitrineMobile theme={theme} toggle={toggle} />
        </FadeIn>

        {/* Desktop */}
        <div className="hidden lg:block">
          <VitrineDesktop theme={theme} toggle={toggle} />
        </div>
      </div>
    </section>
  );
}
