"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView } from "motion/react";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { site } from "@/config/site";
import { CountUp, FadeIn } from "@/components/motion";

/**
 * Bloco compacto de credibilidade: um card único com a foto "saindo" pela borda de cima.
 */
export function Lipe() {
  const statsRef = useRef<HTMLParagraphElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.6 });
  const fmt = (decimals: number) =>
    new Intl.NumberFormat(site.locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  return (
    <section id="lipe" className="relative overflow-x-clip px-4 pt-32 pb-20 sm:px-6 lg:pt-36 lg:pb-28">
      <FadeIn className="relative mx-auto w-full max-w-[900px]" amount={0.3}>
        {/* Glow */}
        <div
          aria-hidden
          className="absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(closest-side,rgba(30,160,118,0.28),transparent)] blur-2xl"
        />

        <div className="relative rounded-3xl border border-border bg-card shadow-[0_30px_80px_-40px_rgba(14,26,21,0.35)]">
          <div className="grid grid-cols-1 items-center gap-6 px-6 pt-32 pb-7 text-center sm:px-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10 lg:px-10 lg:py-8 lg:text-left">
            {/* Foto pop-out: do peito pra cima, a cabeça passa da borda superior do card */}
            <div className="pointer-events-none absolute -top-16 left-1/2 h-44 w-40 -translate-x-1/2 lg:top-auto lg:bottom-0 lg:left-10 lg:h-[calc(100%+2.5rem)] lg:w-[220px] lg:translate-x-0">
              <div className="relative size-full overflow-hidden rounded-b-3xl [mask-image:linear-gradient(to_bottom,black_78%,transparent)] lg:[mask-image:none]">
                <Image
                  src="/images/lipe/lipe-casual.png"
                  alt={`${site.lipe.name}, criador da ${site.productName}`}
                  fill
                  sizes="(min-width: 1024px) 360px, 260px"
                  className="origin-top scale-[1.55] object-cover object-top"
                />
              </div>
              {/* Sticker girando devagar */}
              <div className="absolute top-2 -right-4 size-14 sm:size-16 lg:top-6 lg:-right-5 lg:size-[72px]">
                <div className="flex size-full animate-spin-slow items-center justify-center rounded-full border-[3px] border-white bg-white shadow-[0_12px_30px_-12px_rgba(14,26,21,0.45)]">
                  <Image
                    src="/images/lipe/brand/HORN-LIPE-MAGENTA.png"
                    alt=""
                    width={1080}
                    height={1075}
                    sizes="64px"
                    className="size-[62%]"
                  />
                </div>
              </div>
            </div>
            {/* Reserva a coluna da foto no desktop */}
            <div aria-hidden className="hidden lg:block" />

            {/* Texto */}
            <div className="flex flex-col items-center gap-3 lg:items-start">
              <span className="text-xs font-bold tracking-[0.18em] text-primary uppercase">Criado por</span>

              <h2 className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 lg:justify-start">
                <span className="text-3xl leading-none font-extrabold tracking-[-0.03em] sm:text-4xl">
                  {site.lipe.name}
                </span>
                <BadgeCheck className="size-6 fill-brand-blue text-white sm:size-7" aria-label="Verificado" />
                <a
                  href={site.author.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm text-base font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-primary/40 focus-visible:outline-none sm:text-lg"
                >
                  {site.lipe.handle}
                </a>
              </h2>

              <p className="text-lg font-semibold italic text-foreground/90 sm:text-xl">{site.lipe.tagline}</p>

              <p className="max-w-[52ch] text-[15px] text-pretty text-muted-foreground sm:text-base">{site.lipe.line}</p>

              <p ref={statsRef} className="mt-1 flex flex-col items-center gap-1.5 text-sm font-semibold sm:flex-row sm:gap-3 lg:justify-start">
                {site.lipe.stats.map((s, i) => (
                  <span key={s.label} className="flex items-center gap-3">
                    {i > 0 && <span aria-hidden className="hidden size-1 rounded-full bg-border sm:block" />}
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 rounded-sm focus-visible:ring-3 focus-visible:ring-primary/40 focus-visible:outline-none"
                    >
                      <span className="text-primary tabular-nums">
                        <CountUp
                          value={s.value}
                          active={statsInView}
                          delay={i * 0.15}
                          format={(v) => fmt(s.decimals).format(v)}
                        />{" "}
                        {s.unit}
                      </span>{" "}
                      <span className="text-muted-foreground underline decoration-border decoration-1 underline-offset-4 transition-colors group-hover:text-foreground group-hover:decoration-primary">
                        {s.label}
                      </span>
                      <ArrowUpRight
                        className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden
                      />
                    </a>
                  </span>
                ))}
              </p>

              <div className="mt-2 flex items-center gap-2.5">
                <span className="font-script text-3xl leading-none font-bold sm:text-4xl">{site.lipe.signature}</span>
                <Image
                  src="/images/lipe/brand/HORN-LIPE.png"
                  alt=""
                  width={316}
                  height={313}
                  sizes="28px"
                  className="size-6 sm:size-7"
                />
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
