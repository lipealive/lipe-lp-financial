"use client";

import { useEffect, useState } from "react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import {
  ArrowLeft,
  ArrowRight,
  BotMessageSquare,
  Calculator,
  GraduationCap,
  LineChart,
  MonitorSmartphone,
  PiggyBank,
  SunMoon,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
  type CarouselApi,
} from "@/components/ui/carousel";
import { SectionHeading } from "@/components/section-heading";
import { FadeIn, Stagger } from "@/components/motion";
import { CheckoutButton } from "@/components/checkout-button";
import { BentoCard } from "@/components/bento/bento-card";
import {
  ConsultorMini,
  DeviceSync,
  GoalProgress,
  InvestmentChart,
  LessonStack,
  NetWorth,
  ThemeFlip,
} from "@/components/bento/illustrations";

const calculators = [
  "Juros compostos",
  "Reserva de emergência",
  "Primeiro milhão",
  "Simulador de renda",
  "Alugar ou financiar",
];

export function Funcionalidades() {
  const [api, setApi] = useState<CarouselApi>();
  const [progress, setProgress] = useState(0);

  // Barra de progresso acompanha o scroll do Embla.
  useEffect(() => {
    if (!api) return;
    const update = () => setProgress(Math.max(0, Math.min(1, api.scrollProgress())));
    update();
    api.on("scroll", update).on("select", update).on("reInit", update);
    return () => {
      api.off("scroll", update).off("select", update).off("reInit", update);
    };
  }, [api]);

  return (
    <section id="funcionalidades" className="relative overflow-x-clip py-14 lg:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Funcionalidades"
          title="Muito mais que uma planilha."
          description="Metas, investimentos, patrimônio, aulas e calculadoras no mesmo lugar que o seu orçamento."
          className="mb-8 lg:mb-10"
        />
      </div>

      {/* Carrossel full-bleed: 3 cards no centro + ~40% de card em cada lateral (desktop) */}
      <Carousel
        setApi={setApi}
        opts={{ align: "center", loop: true, duration: 28, skipSnaps: false, startIndex: 1 }}
        plugins={[WheelGesturesPlugin({ forceWheelAxis: "x" })]}
        className="relative w-full"
      >
        <Stagger stagger={0.07} amount={0.1}>
          <CarouselContent className="-ml-4 items-stretch lg:-ml-5">
            <Slide>
              <BentoCard icon={BotMessageSquare} title="Consultor com IA" description="Manda texto, áudio ou foto do comprovante no WhatsApp e ele lança pra você.">
                <ConsultorMini />
              </BentoCard>
            </Slide>
            <Slide>
              <BentoCard icon={Target} title="Metas" description="Defina um objetivo, acompanhe o progresso e veja quanto falta.">
                <GoalProgress />
              </BentoCard>
            </Slide>
            <Slide>
              <BentoCard icon={LineChart} title="Investimentos" description="Aportes e rentabilidade ao longo do tempo, com gráfico por tipo e logos dos ativos.">
                <InvestmentChart />
              </BentoCard>
            </Slide>
            <Slide>
              <BentoCard icon={PiggyBank} title="Patrimônio" description="Liquidez, investimentos e bens somados num único número.">
                <NetWorth />
              </BentoCard>
            </Slide>
            <Slide>
              <BentoCard icon={GraduationCap} title="Escola" description="13 aulas curtas pra você sair do zero e dominar seu dinheiro, com ebook em PDF em cada uma.">
                <LessonStack />
              </BentoCard>
            </Slide>
            <Slide>
              <BentoCard icon={Calculator} title="5 Calculadoras" description="Simule cenários antes de decidir.">
                <ul className="flex flex-col gap-1.5">
                  {calculators.map((c, i) => (
                    <li key={c} className="flex items-center gap-2 text-[13px] font-medium">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-primary/10 text-[10px] font-bold text-primary tabular-nums">
                        {i + 1}
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </BentoCard>
            </Slide>
            <Slide>
              <BentoCard icon={MonitorSmartphone} title="App, computador e WhatsApp" description="No app (iPhone e Android), no navegador do computador e pelo WhatsApp. Tudo sincronizado.">
                <DeviceSync />
              </BentoCard>
            </Slide>
            <Slide>
              <BentoCard icon={SunMoon} title="Modo claro e escuro" description="Escolha o visual que cansa menos os seus olhos.">
                <ThemeFlip />
              </BentoCard>
            </Slide>
          </CarouselContent>
        </Stagger>

        <DepthEffect />
        <SideArrow direction="prev" />
        <SideArrow direction="next" />
      </Carousel>

      {/* Progresso */}
      <div className="mt-6 flex justify-center">
        <div
          role="progressbar"
          aria-label="Progresso do carrossel"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          className="h-1 w-40 overflow-hidden rounded-full bg-border sm:w-56"
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-150 ease-out"
            style={{ width: `${Math.max(12, progress * 100)}%` }}
          />
        </div>
      </div>

      <FadeIn className="mt-10 flex flex-col items-center px-4 lg:mt-12">
        <CheckoutButton location="funcionalidades">Quero organizar minhas finanças</CheckoutButton>
        <p className="mt-3 text-[13px] text-muted-foreground">Acesso imediato após a compra.</p>
      </FadeIn>
    </section>
  );
}

/**
 * Larguras: desktop = 100% / 3.8 (3 inteiros + 0.4 de cada lado);
 * mobile = 78% (1 inteiro + ~11% de cada lado).
 */
function Slide({ children }: { children: React.ReactNode }) {
  return (
    <CarouselItem className="basis-[78%] pl-4 sm:basis-[56%] md:basis-[42%] lg:basis-[26.3%] lg:pl-5">
      <div data-slide-fx className="h-full will-change-[transform,opacity,filter]">{children}</div>
    </CarouselItem>
  );
}

/**
 * Profundidade: a cada frame do Embla, mede a distância de cada card ao centro
 * da viewport e aplica blur/opacidade/scale proporcionais. Como é calculado pela
 * posição real, a transição acompanha o deslize (clique, swipe ou trackpad).
 */
function DepthEffect() {
  const { api } = useCarousel();

  useEffect(() => {
    if (!api) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1024px)");

    const apply = () => {
      const root = api.rootNode();
      const rootRect = root.getBoundingClientRect();
      const center = rootRect.left + rootRect.width / 2;
      // Faixa nítida: desktop = 3 cards (d ≤ 1), mobile = 1 card (d ≤ 0)
      const [from, to] = desktop.matches ? [1.15, 1.75] : [0.25, 0.8];

      for (const slide of api.slideNodes()) {
        const el = slide.firstElementChild as HTMLElement | null;
        if (!el) continue;
        const r = slide.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - center) / r.width;
        const t = Math.max(0, Math.min(1, (d - from) / (to - from)));
        el.style.opacity = String(1 - 0.6 * t);
        if (reduce.matches) {
          el.style.filter = "";
          el.style.transform = "";
        } else {
          el.style.filter = t > 0.01 ? `blur(${(4 * t).toFixed(2)}px)` : "";
          el.style.transform = `scale(${(1 - 0.08 * t).toFixed(4)})`;
        }
      }
    };

    apply();
    api.on("scroll", apply).on("reInit", apply).on("resize", apply);
    window.addEventListener("resize", apply);
    return () => {
      api.off("scroll", apply).off("reInit", apply).off("resize", apply);
      window.removeEventListener("resize", apply);
    };
  }, [api]);

  return null;
}

/** Seta lateral: botão redondo branco com blur, sobre a área desfocada. */
function SideArrow({ direction }: { direction: "prev" | "next" }) {
  const { scrollPrev, scrollNext } = useCarousel();
  const prev = direction === "prev";
  return (
    <button
      type="button"
      onClick={prev ? scrollPrev : scrollNext}
      aria-label={prev ? "Anterior" : "Próximo"}
      data-carousel-prev={prev || undefined}
      data-carousel-next={!prev || undefined}
      className={cn(
        "absolute top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/85 text-primary shadow-[0_10px_30px_-10px_rgba(14,26,21,0.45)] backdrop-blur-md transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:ring-3 focus-visible:ring-primary/40 focus-visible:outline-none lg:size-[52px]",
        prev ? "left-3 sm:left-6 lg:left-10" : "right-3 sm:right-6 lg:right-10",
      )}
    >
      {prev ? <ArrowLeft className="size-5 lg:size-6" aria-hidden /> : <ArrowRight className="size-5 lg:size-6" aria-hidden />}
    </button>
  );
}
