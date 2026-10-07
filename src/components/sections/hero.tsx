"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Lock, ShieldCheck, Smartphone, Zap } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Stagger, StaggerItem, EASE_OUT } from "@/components/motion";
import { CheckoutButton } from "@/components/checkout-button";
import { VslPlayer } from "@/components/vsl-player";
import { ReservaCard, SaldoCard } from "@/components/app-cards";
import { AvailabilityStrip } from "@/components/availability-strip";
import { useOffer } from "@/components/offer-context";

/**
 * Hero em duas versões (mesmo texto e botão):
 * - "vsl": VSL vertical 9:16 à direita (desktop) / entre texto e botão (mobile).
 * - "sv":  print do app (Visão geral) com cards flutuantes no lugar do vídeo.
 * Desktop: texto + botão à esquerda, mídia à direita. Mobile: texto, mídia, botão.
 */
export function Hero() {
  const { versao } = useOffer();

  return (
    <section id="hero" className="relative overflow-hidden pt-24 pb-14 sm:pt-28 lg:pt-32 lg:pb-20">
      <Background />

      <Stagger
        inView={false}
        stagger={0.1}
        delay={0.1}
        className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:grid-rows-[1fr_auto_1fr] lg:gap-x-14 lg:gap-y-8"
      >
        {/* Texto */}
        <StaggerItem
          subtle
          distance={8}
          className="flex flex-col items-center text-center lg:col-start-1 lg:row-start-2 lg:items-start lg:text-left"
        >
          <Badge className="h-7 gap-1.5 border-primary/20 bg-primary/10 px-3 text-[13px] font-semibold text-primary">
            <span className="size-1.5 rounded-full bg-dot" aria-hidden />
            A planilha financeira do Lipe, agora em app
          </Badge>
          <h1 className="mt-5 max-w-[14ch] text-[2.5rem] leading-[1.02] font-extrabold tracking-[-0.035em] text-balance sm:text-6xl lg:max-w-[13ch] lg:text-[3.4rem] xl:text-[4rem]">
            Pare de se perguntar pra onde foi <Highlight>seu dinheiro.</Highlight>
          </h1>
          <p className="mt-5 max-w-[34ch] text-base leading-relaxed text-pretty text-muted-foreground sm:max-w-xl sm:text-lg lg:max-w-[44ch]">
            A {site.productName} organiza receitas, gastos, reserva de emergência, metas e investimentos num só
            lugar — no app, no computador e no WhatsApp.
          </p>
        </StaggerItem>

        {/* Mídia: VSL ou print do app */}
        <StaggerItem
          subtle
          distance={8}
          className="lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:self-center"
        >
          {versao === "vsl" ? <VslMedia /> : <AppMedia />}
        </StaggerItem>

        {/* Botão */}
        <StaggerItem
          subtle
          distance={8}
          data-hero-cta=""
          className="flex flex-col items-center lg:col-start-1 lg:row-start-3 lg:items-start lg:self-start"
        >
          <CheckoutButton location="hero">Garantir acesso</CheckoutButton>
          <AvailabilityStrip className="mt-3" />
          <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[13px] text-muted-foreground lg:justify-start">
            <li className="flex items-center gap-1.5">
              <Zap className="size-3.5 text-primary" aria-hidden /> Acesso imediato
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-primary" aria-hidden /> Compra segura Kiwify
            </li>
            <li className="flex items-center gap-1.5">
              <Smartphone className="size-3.5 text-primary" aria-hidden /> App e navegador
            </li>
          </ul>
        </StaggerItem>
      </Stagger>
    </section>
  );
}

/* ---------- Versão com VSL ---------- */

/** Player 9:16: 100% (máx. 420px) no mobile; ~380px (máx. 78vh de altura) no desktop. 2 cards ao lado em ≥1280px. */
function VslMedia() {
  return (
    <div className="flex items-center justify-center gap-6">
      <MediaFrame className="w-full max-w-[420px] lg:w-[min(380px,calc(78vh*9/16))] lg:max-w-none">
        <VslPlayer className="rounded-[16px]" />
      </MediaFrame>

      {/* Cards ao lado do player, sem cobrir o vídeo (só desktop largo) */}
      <div className="hidden flex-col gap-16 xl:flex" aria-hidden>
        <FloatingCard rotate="-2.5deg" delay={0}>
          <SaldoCard />
        </FloatingCard>
        <FloatingCard rotate="2deg" delay={1.8} className="2xl:translate-x-6">
          <ReservaCard />
        </FloatingCard>
      </div>
    </div>
  );
}

/* ---------- Versão sem VSL ---------- */

function AppMedia() {
  return (
    <div className="relative mx-auto w-full max-w-[640px] lg:w-[min(560px,46vw)]">
      <MediaFrame>
        <div className="overflow-hidden rounded-[14px] bg-white">
          <div className="flex items-center gap-3 border-b border-border bg-[#F4F6F5] px-3 py-2">
            <div className="flex gap-1.5" aria-hidden>
              <span className="size-2 rounded-full bg-[#FF5F57]" />
              <span className="size-2 rounded-full bg-[#FEBC2E]" />
              <span className="size-2 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex h-6 flex-1 items-center justify-center gap-1.5 rounded-md bg-white text-[11px] font-medium text-muted-foreground">
              <Lock className="size-3 text-primary" aria-hidden />
              {site.appHost}
            </div>
            <div className="w-8" aria-hidden />
          </div>
          <Image
            src="/images/app/light/visao-geral.png"
            alt={`Tela de visão geral da ${site.productName}`}
            width={3318}
            height={1838}
            priority
            sizes="(min-width: 1024px) 560px, 100vw"
            className="h-auto w-full"
          />
        </div>
      </MediaFrame>

      {/* Cards flutuantes (desktop) */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        <FloatingCard rotate="-3deg" delay={0} className="absolute -top-10 -left-16">
          <SaldoCard />
        </FloatingCard>
        <FloatingCard rotate="2.5deg" delay={1.8} className="absolute -right-10 -bottom-12">
          <ReservaCard />
        </FloatingCard>
      </div>
    </div>
  );
}

/* ---------- Peças comuns ---------- */

/** Moldura com borda em gradiente, fundo escuro e glow verde (mesmo visual do player anterior). */
function MediaFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div aria-hidden className="absolute -inset-6 -z-10 rounded-[32px] bg-primary/25 blur-2xl sm:-inset-10" />
      <div className="rounded-[22px] bg-gradient-to-br from-[#5BAE89] via-primary/40 to-[#2E5E48] p-px shadow-[0_40px_90px_-30px_rgba(14,26,21,0.6),0_20px_40px_-20px_rgba(30,160,118,0.45)]">
        <div className="rounded-[21px] bg-[#0B1210] p-1.5 sm:p-2">{children}</div>
      </div>
    </div>
  );
}

function FloatingCard({
  children,
  className,
  delay,
  rotate,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
  rotate: string;
}) {
  return (
    <div className={className}>
      <div
        className="animate-float"
        style={{ animationDelay: `${delay}s`, ["--float-rotate" as string]: rotate }}
      >
        {children}
      </div>
    </div>
  );
}

/* ---------- Destaque com sublinhado desenhado ---------- */

function Highlight({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  return (
    <span className="relative inline-block whitespace-nowrap text-primary">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 200 14"
        preserveAspectRatio="none"
        className="absolute -bottom-[0.12em] left-0 h-[0.28em] w-full overflow-visible"
      >
        <motion.path
          d="M3 10 C 40 2, 120 1, 197 7"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="5"
          strokeLinecap="round"
          initial={{ pathLength: reduceMotion ? 1 : 0, opacity: reduceMotion ? 0.9 : 0 }}
          animate={{ pathLength: 1, opacity: 0.9 }}
          transition={{ duration: 0.9, delay: 0.9, ease: EASE_OUT }}
        />
      </svg>
    </span>
  );
}

/* ---------- Fundo: grid + glow ---------- */

function Background() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-grid-lines mask-fade-radial opacity-70" />
      <div className="absolute top-[45%] right-[-10%] h-[620px] w-[min(90vw,760px)] animate-glow-drift rounded-full bg-[radial-gradient(closest-side,rgba(30,160,118,0.32),rgba(30,160,118,0.1)_45%,transparent_75%)] blur-3xl lg:top-[20%]" />
      <div className="absolute top-[18%] left-[6%] h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(91,174,137,0.22),transparent)] blur-3xl" />
    </div>
  );
}
