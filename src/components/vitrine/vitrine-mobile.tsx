"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";
import { cn } from "@/lib/utils";
import { BrowserMockup } from "./browser-mockup";
import { ScreenCopy } from "./screen-copy";
import { screens, type ScreenTheme } from "./screens";

/**
 * Mobile: abas pill com indicador deslizante, card com o print e texto embaixo.
 * Swipe lateral no card troca a aba.
 */
export function VitrineMobile({
  theme,
  toggle,
}: {
  theme: ScreenTheme;
  toggle?: React.ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();
  const screen = screens[index];

  function go(next: number) {
    const clamped = Math.max(0, Math.min(screens.length - 1, next));
    if (clamped === index) return;
    setDirection(clamped > index ? 1 : -1);
    setIndex(clamped);
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    const swipe = info.offset.x + info.velocity.x * 0.2;
    if (swipe < -60) go(index + 1);
    else if (swipe > 60) go(index - 1);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Abas */}
      <div className="flex flex-col items-center gap-3">
        <div
          role="tablist"
          aria-label="Telas da plataforma"
          className="inline-flex max-w-full rounded-full border border-border bg-card p-1 shadow-sm"
        >
          {screens.map((s, i) => {
            const selected = i === index;
            return (
              <button
                key={s.key}
                role="tab"
                type="button"
                aria-selected={selected}
                onClick={() => go(i)}
                className={cn(
                  "relative h-9 rounded-full px-3.5 text-[13px] font-semibold whitespace-nowrap transition-colors",
                  selected ? "text-white" : "text-muted-foreground",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="vitrine-tab-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <span className="relative">{s.label}</span>
              </button>
            );
          })}
        </div>
        {toggle}
      </div>

      {/* Card com o print (swipe) */}
      <motion.div
        className="relative touch-pan-y"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={onDragEnd}
      >
        <div aria-hidden className="absolute -inset-4 -z-10 rounded-[32px] bg-primary/15 blur-2xl" />
        <BrowserMockup
          active={screen.key}
          theme={theme}
          sizes="100vw"
          priority={false}
        />
      </motion.div>

      {/* Texto */}
      <div className="relative min-h-[260px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={screen.key}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 24 * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -24 * direction }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ScreenCopy screen={screen} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicador de posição */}
      <div className="flex justify-center gap-1.5" aria-hidden>
        {screens.map((s, i) => (
          <span
            key={s.key}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === index ? "w-6 bg-dot" : "w-1.5 bg-border",
            )}
          />
        ))}
      </div>
    </div>
  );
}
