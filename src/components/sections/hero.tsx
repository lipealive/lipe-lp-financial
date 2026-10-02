"use client";

import { motion, useReducedMotion } from "motion/react";
import { ShieldCheck, Smartphone, Zap } from "lucide-react";
import { site } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { Stagger, StaggerItem, EASE_OUT } from "@/components/motion";
import { CheckoutButton } from "@/components/checkout-button";
import { VturbPlayer } from "@/components/vturb-player";
import { DonutCard, ReservaCard, SaldoCard } from "@/components/app-cards";

const vertical = site.vturb.vslAspect === "9:16";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      <Background />

      <Stagger
        inView={false}
        stagger={0.11}
        delay={0.1}
        className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center sm:px-6"
      >
        <StaggerItem subtle distance={8}>
          <Badge className="h-7 gap-1.5 border-primary/20 bg-primary/10 px-3 text-[13px] font-semibold text-primary">
            <span className="size-1.5 rounded-full bg-dot" aria-hidden />
            A planilha financeira do Lipe, agora online
          </Badge>
        </StaggerItem>

        <StaggerItem subtle distance={8}>
          <h1 className="mt-5 max-w-[14ch] text-[2.5rem] leading-[1.02] font-extrabold tracking-[-0.035em] text-balance sm:text-6xl lg:max-w-[16ch] lg:text-7xl">
            Pare de se perguntar pra onde foi{" "}
            <Highlight>seu dinheiro.</Highlight>
          </h1>
        </StaggerItem>

        <StaggerItem subtle distance={8}>
          <p className="mt-5 max-w-[34ch] text-base leading-relaxed text-pretty text-muted-foreground sm:max-w-xl sm:text-lg lg:text-xl">
            A {site.productName} organiza receitas, gastos, reserva de emergência, metas e
            investimentos num só lugar — no celular e no computador.
          </p>
        </StaggerItem>

        <StaggerItem subtle distance={8} className="relative mt-10 w-full lg:mt-14">
          <VideoFrame />
        </StaggerItem>

        <StaggerItem subtle distance={8} className="mt-6 w-full lg:hidden">
          <CardsMarquee />
        </StaggerItem>

        <StaggerItem subtle distance={8} className="mt-8 flex w-full flex-col items-center sm:mt-10" data-hero-cta="">
          <CheckoutButton location="hero">Quero organizar minhas finanças</CheckoutButton>
        </StaggerItem>

        <StaggerItem subtle distance={8}>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[13px] text-muted-foreground">
            <li className="flex items-center gap-1.5">
              <Zap className="size-3.5 text-primary" /> Acesso imediato
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-primary" /> Compra segura Kiwify
            </li>
            <li className="flex items-center gap-1.5">
              <Smartphone className="size-3.5 text-primary" /> Funciona no celular
            </li>
          </ul>
        </StaggerItem>
      </Stagger>
    </section>
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
      {/* Glow verde atrás do vídeo */}
      <div className="absolute top-[42%] left-1/2 h-[520px] w-[min(90vw,900px)] -translate-x-1/2 animate-glow-drift rounded-full bg-[radial-gradient(closest-side,rgba(30,160,118,0.35),rgba(30,160,118,0.12)_45%,transparent_75%)] blur-3xl lg:top-[38%]" />
      <div className="absolute top-[20%] left-[12%] h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(91,174,137,0.25),transparent)] blur-3xl" />
    </div>
  );
}

/* ---------- Frame do vídeo + cards flutuantes (desktop) ---------- */

function VideoFrame() {
  return (
    <div className={vertical ? "relative mx-auto max-w-[360px]" : "relative mx-auto max-w-3xl"}>
      {/* Glow colado ao frame */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[32px] bg-primary/25 blur-2xl sm:-inset-10"
      />

      <div className="rounded-[22px] bg-gradient-to-br from-[#5BAE89] via-primary/40 to-[#2E5E48] p-px shadow-[0_40px_90px_-30px_rgba(14,26,21,0.6),0_20px_40px_-20px_rgba(30,160,118,0.45)]">
        <div className="rounded-[21px] bg-[#0B1210] p-1.5 sm:p-2">
          <VturbPlayer
            id={site.vturb.vslId}
            aspect={site.vturb.vslAspect}
            className="rounded-[16px]"
          />
        </div>
      </div>

      {/* Cards flutuantes: só em telas grandes */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <FloatingCard className="-top-10 -left-44 [--float-rotate:-3deg]" delay={0}>
          <SaldoCard />
        </FloatingCard>
        <FloatingCard className="-top-4 -right-48 [--float-rotate:2.5deg]" delay={1.6}>
          <ReservaCard />
        </FloatingCard>
        <FloatingCard className="-right-52 bottom-6 [--float-rotate:-1.5deg]" delay={3.1}>
          <DonutCard />
        </FloatingCard>
      </div>
    </div>
  );
}

function FloatingCard({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
}) {
  return (
    <div className={`absolute ${className ?? ""}`}>
      <div className="animate-float" style={{ animationDelay: `${delay}s` }}>
        {children}
      </div>
    </div>
  );
}

/* ---------- Marquee dos cards (mobile) ---------- */

function CardsMarquee() {
  const items = [SaldoCard, ReservaCard, DonutCard];
  return (
    <div className="mask-fade-edges-x -mx-4 overflow-hidden motion-reduce:overflow-x-auto sm:-mx-6">
      <div className="flex w-max animate-marquee gap-4 px-4 motion-reduce:animate-none">
        {[0, 1].map((copy) =>
          items.map((Card, i) => (
            <Card key={`${copy}-${i}`} aria-hidden={copy === 1 || undefined} />
          )),
        )}
      </div>
    </div>
  );
}
