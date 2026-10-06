"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { Barcode, Check, CreditCard, QrCode, Zap, type LucideIcon } from "lucide-react";
import { site, formatPrice } from "@/config/site";
import { CountUp, FadeIn, Stagger, StaggerItem } from "@/components/motion";
import { CheckoutButton } from "@/components/checkout-button";
import { AvailabilityStrip } from "@/components/availability-strip";

const paymentIcons: Record<string, LucideIcon> = {
  Cartão: CreditCard,
  Pix: QrCode,
  Boleto: Barcode,
};

export function Oferta() {
  const priceRef = useRef<HTMLDivElement>(null);
  const priceInView = useInView(priceRef, { once: true, amount: 0.6 });
  const fmt = new Intl.NumberFormat(site.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <section id="oferta" className="section-dark relative overflow-x-clip scroll-mt-16 py-20 lg:py-28">
      {/* Fundo */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-lines mask-fade-radial opacity-40" />
        <div className="absolute top-1/2 left-1/2 h-[560px] w-[min(92vw,760px)] animate-glow-pulse rounded-full bg-[radial-gradient(closest-side,rgba(35,181,133,0.45),rgba(35,181,133,0.12)_50%,transparent_75%)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center sm:px-6">
        <FadeIn className="flex flex-col items-center gap-3">
          <span className="text-xs font-bold tracking-[0.18em] text-primary uppercase">Acesso completo</span>
          <h2 className="max-w-[18ch] text-[2rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl">
            Tudo isso por <span className="text-primary">{site.offer.anchor}</span>.
          </h2>
        </FadeIn>

        {/* Card de preço com borda gradiente girando */}
        <FadeIn className="mt-10 w-full max-w-lg lg:mt-14" amount={0.2}>
          <div className="animate-border-spin rounded-[26px] bg-conic-brand p-[1.5px] shadow-[0_40px_100px_-40px_rgba(35,181,133,0.6)]">
            <div className="rounded-[24.5px] bg-card px-5 py-7 sm:px-8 sm:py-9">
              <div ref={priceRef} className="flex flex-col items-center">
                <span className="text-sm font-semibold text-muted-foreground">
                  {site.offer.installments.count}x de
                </span>
                <span className="mt-1 flex items-start gap-1 leading-none font-extrabold tracking-[-0.04em]">
                  <span className="mt-2 text-2xl text-primary sm:mt-3 sm:text-3xl">R$</span>
                  <span className="text-[4.5rem] text-foreground tabular-nums sm:text-[5.5rem]">
                    <CountUp
                      value={site.offer.installments.value}
                      active={priceInView}
                      duration={1.4}
                      format={(v) => fmt.format(v)}
                    />
                  </span>
                </span>
                <span className="mt-3 text-sm text-muted-foreground sm:text-[15px]">
                  ou {formatPrice(site.offer.price)} à vista · {site.offer.accessLabel}
                </span>
              </div>

              <Stagger stagger={0.05} amount={0.2} className="mt-7 flex flex-col gap-2.5 text-left">
                {site.offer.includes.map((item) => (
                  <StaggerItem key={item} distance={10} className="flex items-start gap-2.5 text-[15px] sm:text-base">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="size-3" strokeWidth={3} aria-hidden />
                    </span>
                    {item}
                  </StaggerItem>
                ))}
              </Stagger>

              <div className="mt-8">
                <CheckoutButton location="oferta" className="sm:w-full">
                  Quero organizar minhas finanças
                </CheckoutButton>
              </div>

              <div className="mt-5 flex flex-col items-center gap-2.5">
                <ul className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                  {site.offer.payment.map((p) => {
                    const Icon = paymentIcons[p] ?? CreditCard;
                    return (
                      <li key={p} className="flex items-center gap-1.5">
                        <Icon className="size-4 text-primary" aria-hidden />
                        {p}
                      </li>
                    );
                  })}
                </ul>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Zap className="size-3.5 text-primary" aria-hidden />
                  Acesso imediato após a compra
                </p>
                <AvailabilityStrip className="mt-1 border-t border-border pt-3" />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
