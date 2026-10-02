"use client";

import { Accordion as AccordionPrimitive } from "radix-ui";
import { MessageCircle } from "lucide-react";
import { site, whatsappUrl } from "@/config/site";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion";

export function Faq() {
  return (
    <section id="faq" className="relative py-20 lg:py-28">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* Esquerda: título + card (sticky no desktop) */}
        <div className="lg:self-start lg:sticky lg:top-28">
          <FadeIn className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
            <span className="text-xs font-bold tracking-[0.18em] text-primary uppercase">Dúvidas</span>
            <h2 className="max-w-[16ch] text-[2rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl">
              Perguntas frequentes
            </h2>
            <p className="max-w-md text-base text-pretty text-muted-foreground sm:text-lg">
              O que mais perguntam antes de entrar na {site.productName}.
            </p>
          </FadeIn>
          <FadeIn className="mt-8 hidden lg:block" delay={0.1}>
            <SupportCard />
          </FadeIn>
        </div>

        {/* Direita: accordion */}
        <FadeIn amount={0.1}>
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {site.faq.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`faq-${i}`}
                className="rounded-2xl border border-border bg-card px-4 transition-colors data-[state=open]:border-primary/40 sm:px-5"
              >
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger className="group/faq flex flex-1 items-center gap-3.5 py-4 text-left outline-none focus-visible:rounded-lg focus-visible:ring-3 focus-visible:ring-primary/40 sm:gap-4 sm:py-5">
                    <span className="w-6 shrink-0 text-sm font-bold text-primary tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-[15px] font-semibold sm:text-base">{item.q}</span>
                    <PlusMinusIcon />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="pb-5 pl-[2.4rem] text-[15px] text-muted-foreground sm:pl-10 sm:text-base">
                  {item.a}
                  {"cta" in item && item.cta === "whatsapp" && (
                    <>
                      {" "}
                      <a
                        href={whatsappUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                      >
                        {site.support.whatsappDisplay}
                      </a>
                      .
                    </>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-6 lg:hidden">
            <SupportCard />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/** "+" que vira "−": a barra vertical gira 90° e se funde com a horizontal. */
function PlusMinusIcon() {
  return (
    <span
      aria-hidden
      className="relative flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary transition-colors group-data-[state=open]/faq:border-primary/40 group-data-[state=open]/faq:bg-primary/10"
    >
      <span className="absolute h-[2px] w-3 rounded-full bg-current" />
      <span
        className={cn(
          "absolute h-[2px] w-3 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "rotate-90 group-data-[state=open]/faq:rotate-0",
        )}
      />
    </span>
  );
}

function SupportCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <MessageCircle className="size-5" aria-hidden />
        </span>
        <h3 className="text-lg font-bold tracking-tight">Ainda com dúvida?</h3>
      </div>
      <p className="mt-3 text-[15px] text-pretty text-muted-foreground sm:text-base">
        Fala com nosso time, a gente responde rapidinho.
      </p>
      <Button
        asChild
        variant="outline"
        size="lg"
        className="mt-5 h-11 w-full gap-2 rounded-full border-primary/60 bg-transparent px-5 text-sm font-semibold text-primary hover:border-primary hover:bg-primary/10 hover:text-primary sm:w-auto"
      >
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="size-4" aria-hidden />
          Chamar no WhatsApp
        </a>
      </Button>
    </div>
  );
}
