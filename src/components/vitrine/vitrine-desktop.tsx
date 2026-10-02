"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { BrowserMockup } from "./browser-mockup";
import { ScreenCopy } from "./screen-copy";
import { screens, type ScreenKey, type ScreenTheme } from "./screens";

const HEADER_CLEARANCE = 88; // px: não deixa o mockup entrar embaixo do header fixo

/**
 * Desktop: textos à esquerda (~42%) rolam; mockup (~58%) fica sticky,
 * centralizado na viewport e 100% visível dentro do container.
 */
export function VitrineDesktop({
  theme,
  toggle,
}: {
  theme: ScreenTheme;
  toggle?: React.ReactNode;
}) {
  const [active, setActive] = useState<ScreenKey>(screens[0].key);
  const columnRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stickyTop = useCenteredStickyTop(stickyRef);

  const { scrollYProgress } = useScroll({
    target: columnRef,
    offset: ["start center", "end center"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div className="grid grid-cols-[minmax(0,42fr)_minmax(0,58fr)] gap-10 xl:gap-14">
      {/* Coluna de texto + linha de progresso (só na altura dos blocos) */}
      <div ref={columnRef} className="relative pl-8">
        <div aria-hidden className="absolute inset-y-0 left-0 w-px bg-border">
          <motion.div
            className="absolute inset-x-0 top-0 h-full origin-top rounded-full bg-primary"
            style={{ scaleY: progress }}
          />
        </div>

        {screens.map((screen) => (
          <StoryBlock
            key={screen.key}
            active={active === screen.key}
            onEnter={() => setActive(screen.key)}
          >
            <ScreenCopy screen={screen} />
          </StoryBlock>
        ))}
      </div>

      {/* Mockup sticky */}
      <div className="relative">
        <div ref={stickyRef} className="sticky flex flex-col gap-4" style={{ top: stickyTop }}>
          {toggle && <div className="flex">{toggle}</div>}
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-10 -z-10 rounded-[48px] bg-primary/15 blur-3xl"
            />
            <BrowserMockup
              active={active}
              theme={theme}
              sizes="(min-width: 1280px) 720px, (min-width: 1024px) 56vw, 100vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Bloco de ~70vh com o texto centralizado; ativa quando cruza o centro da viewport. */
function StoryBlock({
  active,
  onEnter,
  children,
}: {
  active: boolean;
  onEnter: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (inView) onEnter();
  }, [inView, onEnter]);

  return (
    <div
      ref={ref}
      className={cn(
        "flex min-h-[70vh] flex-col justify-center transition-opacity duration-500",
        active ? "opacity-100" : "opacity-30",
      )}
    >
      {children}
    </div>
  );
}

/** Calcula o `top` do sticky pra centralizar o elemento na viewport. */
function useCenteredStickyTop(ref: React.RefObject<HTMLDivElement | null>) {
  const [top, setTop] = useState(HEADER_CLEARANCE);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const h = el.offsetHeight;
      setTop(Math.max(HEADER_CLEARANCE, Math.round((window.innerHeight - h) / 2)));
    };
    // ResizeObserver dispara ao observar, então não precisa chamar update() aqui.
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [ref]);

  return top;
}
