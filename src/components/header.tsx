"use client";

import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { ArrowDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ctaClassName, CtaShine } from "@/components/checkout-button";

const HEADER_H = 64;

/**
 * Header fixo: transparente no topo; ao rolar ganha fundo com blur e borda.
 * Quando a faixa do header está sobre uma .section-dark, o header entra em modo
 * escuro (classe `dark`): tokens trocam e o logo mostra a variante clara, com fade.
 */
export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const overDark = useOverDarkSection();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <header
      data-scrolled={scrolled || undefined}
      data-over-dark={overDark || undefined}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out",
        overDark && "dark",
        scrolled &&
          "border-border/70 bg-background/75 shadow-[0_1px_0_rgba(14,26,21,0.02),0_8px_24px_-16px_rgba(14,26,21,0.25)] backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="rounded-full focus-visible:ring-3 focus-visible:ring-primary/40 focus-visible:outline-none">
          <Logo priority />
        </a>
        <ScrollToOfferButton />
      </div>
    </header>
  );
}

/** "Garantir acesso" rola suavemente até a seção de oferta (não vai direto ao checkout). */
function ScrollToOfferButton() {
  const reduceMotion = useReducedMotion();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById("oferta");
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  return (
    <motion.a
      href="#oferta"
      onClick={handleClick}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      className={ctaClassName("compact")}
    >
      <CtaShine />
      <span>Garantir acesso</span>
      <ArrowDown aria-hidden className="size-4 transition-transform duration-300 ease-out group-hover:translate-y-0.5" />
    </motion.a>
  );
}

/**
 * Observa todas as .section-dark e devolve `true` quando alguma cruza a faixa
 * do header (os primeiros 64px da viewport).
 */
function useOverDarkSection() {
  const [overDark, setOverDark] = useState(false);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".section-dark"));
    if (sections.length === 0) return;

    let observer: IntersectionObserver | undefined;
    const intersecting = new Set<Element>();

    const connect = () => {
      observer?.disconnect();
      intersecting.clear();
      observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) intersecting.add(e.target);
            else intersecting.delete(e.target);
          }
          setOverDark(intersecting.size > 0);
        },
        // Reduz a área observada à faixa do header.
        { rootMargin: `0px 0px -${Math.max(0, window.innerHeight - HEADER_H)}px 0px`, threshold: 0 },
      );
      sections.forEach((s) => observer!.observe(s));
    };

    connect();
    window.addEventListener("resize", connect);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", connect);
    };
  }, []);

  return overDark;
}
