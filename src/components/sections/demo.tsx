"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import {
  ArrowLeftRight,
  Calculator,
  GraduationCap,
  LineChart,
  PiggyBank,
  ShieldCheck,
  Target,
  Volume2,
  VolumeX,
  type LucideIcon,
} from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import { CheckoutButton } from "@/components/checkout-button";
import { videoDemo } from "@/lib/tracking";
import { useOffer } from "@/components/offer-context";

const chips: { label: string; icon: LucideIcon }[] = [
  { label: "Orçamento", icon: ArrowLeftRight },
  { label: "Reserva de emergência", icon: ShieldCheck },
  { label: "Metas", icon: Target },
  { label: "Investimentos", icon: LineChart },
  { label: "Patrimônio", icon: PiggyBank },
  { label: "Escola", icon: GraduationCap },
  { label: "Calculadoras", icon: Calculator },
];

export function Demo() {
  return (
    <section id="demo" className="section-dark relative overflow-x-clip py-20 lg:py-28">
      {/* Fundo: grid discreto + glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-lines mask-fade-radial opacity-40" />
        <div className="absolute top-[45%] left-1/2 h-[480px] w-[min(90vw,960px)] -translate-x-1/2 -translate-y-1/2 animate-glow-drift rounded-full bg-[radial-gradient(closest-side,rgba(35,181,133,0.35),rgba(35,181,133,0.1)_50%,transparent_75%)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center sm:px-6">
        <FadeIn className="flex flex-col items-center gap-3">
          <span className="text-xs font-bold tracking-[0.18em] text-primary uppercase">{site.demo.eyebrow}</span>
          <h2 className="text-[2rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl">
            {site.demo.title}
            <br />
            <span className="text-primary">{site.demo.highlight}</span>
          </h2>
          <p className="max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">{site.demo.subtitle}</p>
        </FadeIn>

        <FadeIn className="relative mt-10 w-full max-w-[1100px] lg:mt-14" amount={0.15}>
          <div aria-hidden className="absolute inset-x-[8%] top-[12%] -z-10 h-[80%] rounded-full bg-primary/30 blur-3xl" />
          <DemoVideo />
        </FadeIn>

        <Stagger stagger={0.06} className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-2.5 lg:mt-14">
          {chips.map(({ label, icon: Icon }) => (
            <StaggerItem key={label}>
              <span className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3.5 text-[13px] font-semibold text-foreground sm:h-10 sm:px-4 sm:text-sm">
                <Icon className="size-4 text-primary" aria-hidden />
                {label}
              </span>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn className="mt-10 flex w-full flex-col items-center lg:mt-14">
          <CheckoutButton location="demo">Quero organizar minhas finanças</CheckoutButton>
        </FadeIn>
      </div>
    </section>
  );
}

/**
 * Vídeo nativo em quadro limpo (16:9, cantos de 24px).
 * - preload="none" e sem atributo autoPlay: nada é baixado no carregamento da página.
 * - Um IntersectionObserver dá play quando o quadro entra na tela e pausa quando sai.
 * - O poster é um next/image lazy por baixo do vídeo.
 */
function DemoVideo() {
  const { src, poster, width, height } = useOffer().video;
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [muted, setMuted] = useState(true);
  const [started, setStarted] = useState(false);
  const tracked = useRef({ play: false, som: false });

  useEffect(() => {
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!frame || !video || reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() dispara o download; falha silenciosa se o browser bloquear.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [reduceMotion]);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    setMuted(next);
    if (!next) {
      video.play().catch(() => {});
      if (!tracked.current.som) {
        tracked.current.som = true;
        videoDemo("som");
      }
    }
  }

  function handlePlaying() {
    setStarted(true);
    if (!tracked.current.play) {
      tracked.current.play = true;
      videoDemo("play");
    }
  }

  return (
    <div
      ref={frameRef}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B1210] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.85),0_30px_70px_-40px_rgba(35,181,133,0.45)]"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <Image
        src={poster}
        alt={`Animação de 45 segundos: como a ${site.productName} mostra pra onde vai o seu dinheiro`}
        fill
        sizes="(min-width: 1148px) 1100px, 100vw"
        className={cn("object-cover transition-opacity duration-500", started && "opacity-0")}
      />
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="none"
        controls={Boolean(reduceMotion)}
        onPlaying={handlePlaying}
        className="absolute inset-0 size-full object-cover"
      />

      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={!muted}
        className="absolute right-3 bottom-3 inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-3 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-black/70 focus-visible:ring-3 focus-visible:ring-primary/50 focus-visible:outline-none sm:right-4 sm:bottom-4 sm:h-10 sm:px-3.5 sm:text-[13px]"
      >
        {muted ? <VolumeX className="size-4" aria-hidden /> : <Volume2 className="size-4 text-primary" aria-hidden />}
        {muted ? "Ativar som" : "Som ativado"}
      </button>
    </div>
  );
}
