"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { ReservaCard } from "@/components/app-cards";
import {
  FULL_VIEW,
  resolveHighlight,
  screenAvailable,
  screens,
  screenSrc,
  type ScreenKey,
  type ScreenTheme,
} from "./screens";
import { useZoomLoop } from "./use-zoom-loop";

type BrowserMockupProps = {
  active: ScreenKey;
  theme: ScreenTheme;
  /** Atributo sizes do next/image para este contexto. */
  sizes: string;
  priority?: boolean;
  className?: string;
};

const ZOOM_SPRING = { type: "spring", stiffness: 60, damping: 18, mass: 1 } as const;

/**
 * Janela de navegador com a URL do app. Enquanto uma etapa está ativa, o print
 * roda um loop: visão completa → zoom no destaque + pill → completa → próximo destaque...
 * Pausa com o mouse em cima ou com o mockup fora da tela. Reduced-motion: só visão completa.
 */
export function BrowserMockup({ active, theme, sizes, priority, className }: BrowserMockupProps) {
  const reduceMotion = useReducedMotion();
  const dark = theme === "dark";
  const screen = screens.find((s) => s.key === active) ?? screens[0];

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [hovered, setHovered] = useState(false);

  const phase = useZoomLoop(
    screen.highlights.length,
    `${active}-${theme}`,
    hovered || !inView,
    Boolean(reduceMotion),
  );

  const highlight = phase.kind === "zoom" ? resolveHighlight(screen.highlights[phase.index]) : null;
  const target = highlight ? highlight.transform : FULL_VIEW;
  const showPill = phase.kind === "zoom" && phase.pill && highlight;

  return (
    <div
      ref={ref}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
      className={cn(
        "overflow-hidden rounded-2xl border shadow-[0_30px_80px_-30px_rgba(14,26,21,0.45)] transition-colors duration-500",
        dark ? "border-[#1F2A26] bg-[#121A17]" : "border-border bg-white",
        className,
      )}
    >
      {/* Barra do navegador */}
      <div
        className={cn(
          "flex items-center gap-3 border-b px-3.5 py-2.5 transition-colors duration-500",
          dark ? "border-[#1F2A26] bg-[#0B1210]" : "border-border bg-[#F4F6F5]",
        )}
      >
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div
          className={cn(
            "flex h-7 flex-1 items-center justify-center gap-1.5 rounded-md text-[11px] font-medium sm:text-xs",
            dark ? "bg-[#121A17] text-[#8A9A93]" : "bg-white text-muted-foreground",
          )}
        >
          <Lock className="size-3 text-primary" aria-hidden />
          {site.appHost}
        </div>
        <div className="w-10" aria-hidden />
      </div>

      {/* Área da tela */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: site.screens.aspect }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={`${active}-${theme}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Layer com zoom/pan */}
            <motion.div
              className="absolute inset-0 will-change-transform"
              initial={false}
              animate={target}
              transition={reduceMotion ? { duration: 0 } : ZOOM_SPRING}
            >
              {screenAvailable(active, theme) ? (
                <Image
                  src={screenSrc(active, theme)}
                  alt={`Tela ${screen.label} da ${site.productName}`}
                  fill
                  sizes={sizes}
                  priority={priority}
                  className="object-cover object-left-top"
                />
              ) : (
                <MissingScreen screen={active} dark={dark} />
              )}
            </motion.div>

            {/* Pill + ponto pulsando (só com o zoom concluído) */}
            <AnimatePresence>
              {showPill && highlight && (
                <FocusLabel
                  key={`pill-${phase.kind === "zoom" ? phase.index : 0}`}
                  text={screen.highlights[phase.kind === "zoom" ? phase.index : 0].label}
                  x={highlight.anchor.x}
                  y={highlight.anchor.y}
                  side={screen.highlights[phase.kind === "zoom" ? phase.index : 0].labelSide ?? "above"}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function FocusLabel({
  text,
  x,
  y,
  side,
}: {
  text: string;
  x: number;
  y: number;
  side: "above" | "below";
}) {
  // Se o anchor cai na metade direita, a etiqueta abre pra esquerda.
  const flip = x > 0.6;
  const place = cn(side === "above" ? "bottom-3" : "top-3", flip ? "right-2" : "left-2");
  const lift = side === "above" ? 8 : -8;

  return (
    <motion.div
      className="pointer-events-none absolute z-10"
      style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
      initial={{ opacity: 0, y: lift }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: lift / 2, transition: { duration: 0.25 } }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="absolute -top-1.5 -left-1.5 size-3 rounded-full bg-dot ring-4 ring-dot/25" aria-hidden>
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-dot/50" />
      </span>
      <span
        className={cn(
          "absolute flex items-center gap-1.5 rounded-full border border-border bg-white/95 px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap text-foreground shadow-[0_10px_30px_-10px_rgba(14,26,21,0.45)] backdrop-blur sm:px-3 sm:text-xs",
          place,
        )}
      >
        {text}
      </span>
    </motion.div>
  );
}

/** Placeholder pra quando o print ainda não existe. */
function MissingScreen({ screen, dark }: { screen: ScreenKey; dark: boolean }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-4 bg-grid-lines",
        dark ? "section-dark" : "bg-background",
      )}
    >
      {screen === "reserva" && <ReservaCard className="scale-110" />}
      <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
        Print em breve
      </span>
    </div>
  );
}
