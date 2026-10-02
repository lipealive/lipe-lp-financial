"use client";

import {
  ArrowLeftRight,
  Calculator,
  GraduationCap,
  LineChart,
  PiggyBank,
  ShieldCheck,
  Target,
  type LucideIcon,
} from "lucide-react";
import { site } from "@/config/site";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import { CheckoutButton } from "@/components/checkout-button";
import { VturbPlayer } from "@/components/vturb-player";
import { LaptopMockup } from "@/components/laptop-mockup";

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
          <span className="text-xs font-bold tracking-[0.18em] text-primary uppercase">Por dentro da plataforma</span>
          <h2 className="max-w-[18ch] text-[2rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl">
            Veja a {site.productName} <span className="text-primary">funcionando de verdade.</span>
          </h2>
          <p className="max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
            O Lipe mostra, tela por tela, como organizar o seu mês.
          </p>
        </FadeIn>

        <FadeIn className="relative mt-12 w-full lg:mt-16" amount={0.15}>
          <div aria-hidden className="absolute inset-x-[10%] top-[10%] -z-10 h-[80%] rounded-full bg-primary/30 blur-3xl" />
          <LaptopMockup>
            <VturbPlayer id={site.vturb.demoId} aspect="16:9" placeholderLabel="Demo em breve" />
          </LaptopMockup>
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
