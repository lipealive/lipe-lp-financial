"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { configureTracking } from "@/lib/tracking/config";
import {
  SCROLL_STEPS,
  SECTIONS,
  pageView,
  rolagem,
  secaoVista,
  viewContentOnce,
  type Secao,
} from "@/lib/tracking";

const VIEW_CONTENT_DELAY_MS = 15_000;
const SECTION_DWELL_MS = 1_000;

/**
 * Eventos automáticos da página:
 * - PageView a cada rota
 * - ViewContent (15s OU 50% de rolagem)
 * - Rolagem 25/50/75/100
 * - SecaoVista (≥50% visível por 1s) e ViuOferta
 * Os três últimos só rodam na landing ("/").
 */
export function PageTracker({ pixelId, clarity }: { pixelId: string; clarity: boolean }) {
  const pathname = usePathname();

  // IDs vêm do servidor (layout) por props. Configura a lib antes de qualquer evento:
  // os effects abaixo e os cliques rodam sempre depois deste render. Idempotente.
  configureTracking({ pixelId, clarity });

  useEffect(() => {
    pageView();
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    /* ---------- ViewContent por tempo ---------- */
    const timer = window.setTimeout(viewContentOnce, VIEW_CONTENT_DELAY_MS);

    /* ---------- Rolagem ---------- */
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (max <= 0) return;
        const pct = (window.scrollY / max) * 100;
        for (const step of SCROLL_STEPS) {
          // 100% com tolerância (barras do mobile / arredondamento)
          if (pct >= (step === 100 ? 98 : step)) rolagem(step);
        }
        if (pct >= 50) viewContentOnce();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---------- Seções ---------- */
    const dwell = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const viewportH = entry.rootBounds?.height ?? window.innerHeight;
          // "50% visível": metade da seção na tela OU, para seções mais altas que a
          // tela (ex.: Vitrine no desktop), a seção ocupando metade da tela.
          const seen =
            entry.isIntersecting &&
            (entry.intersectionRatio >= 0.5 || entry.intersectionRect.height >= viewportH * 0.5);

          const pending = dwell.get(entry.target);
          if (seen && pending === undefined) {
            const id = window.setTimeout(() => {
              dwell.delete(entry.target);
              observer.unobserve(entry.target);
              secaoVista(entry.target.id as Secao);
            }, SECTION_DWELL_MS);
            dwell.set(entry.target, id);
          } else if (!seen && pending !== undefined) {
            window.clearTimeout(pending);
            dwell.delete(entry.target);
          }
        }
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    );
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      dwell.forEach((id) => window.clearTimeout(id));
    };
  }, [pathname]);

  return null;
}
