"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site, formatPrice } from "@/config/site";
import { CheckoutButton } from "@/components/checkout-button";

/**
 * Barra fixa de CTA no mobile (< 768px).
 * Aparece quando o CTA do hero sai da tela; some quando a Oferta, o CTA final
 * ou o rodapé estão visíveis.
 */
export function MobileCtaBar() {
  const visible = useBarVisibility();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="mobile-cta"
          initial={reduceMotion ? { opacity: 0 } : { y: "110%" }}
          animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { y: "110%" }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/85 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_-20px_rgba(14,26,21,0.35)] backdrop-blur-xl md:hidden"
        >
          <div className="flex h-16 items-center justify-between gap-3 px-4">
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-medium text-muted-foreground">{site.offer.installments.count}x de</span>
              <span className="text-lg font-extrabold tracking-tight text-primary tabular-nums">
                {formatPrice(site.offer.installments.value)}
              </span>
            </div>
            <CheckoutButton size="compact" location="mobile-bar" className="h-11 px-5">
              Quero organizar
            </CheckoutButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function useBarVisibility() {
  const [heroCtaGone, setHeroCtaGone] = useState(false);
  const [blockerVisible, setBlockerVisible] = useState(false);

  useEffect(() => {
    const heroCta = document.querySelector("[data-hero-cta]");
    const blockers = ["#oferta", "#cta-final", "footer"]
      .map((sel) => document.querySelector(sel))
      .filter((el): el is Element => Boolean(el));

    const heroObserver = heroCta
      ? new IntersectionObserver(([e]) => setHeroCtaGone(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 })
      : undefined;
    heroObserver?.observe(heroCta!);

    const visibleBlockers = new Set<Element>();
    const blockerObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visibleBlockers.add(e.target);
          else visibleBlockers.delete(e.target);
        }
        setBlockerVisible(visibleBlockers.size > 0);
      },
      { threshold: 0.05 },
    );
    blockers.forEach((b) => blockerObserver.observe(b));

    return () => {
      heroObserver?.disconnect();
      blockerObserver.disconnect();
    };
  }, []);

  return heroCtaGone && !blockerVisible;
}
