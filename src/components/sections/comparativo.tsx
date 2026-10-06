"use client";

import { Check, X } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";
import { Stagger, StaggerItem } from "@/components/motion";

const rows: { common: string; product: string }[] = [
  { common: "Fórmula quebra do nada", product: "Tudo calculado automaticamente" },
  { common: "Ruim de usar no celular", product: "App no celular e navegador no computador" },
  { common: "Você monta tudo do zero", product: "Pronto pra usar em minutos" },
  { common: "Só números", product: "Gráficos, metas e reserva de emergência" },
  { common: "Sozinho", product: "13 aulas de educação financeira + 5 calculadoras" },
];

export function Comparativo() {
  return (
    <section id="comparativo" className="relative py-20 lg:py-28">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Comparativo"
          title="Por que não uma planilha comum?"
          className="mb-10 lg:mb-14"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <Column kind="common" title="Planilha comum" items={rows.map((r) => r.common)} />
          <Column kind="product" title={site.productName} items={rows.map((r) => r.product)} />
        </div>
      </div>
    </section>
  );
}

function Column({
  kind,
  title,
  items,
}: {
  kind: "common" | "product";
  title: string;
  items: string[];
}) {
  const product = kind === "product";
  return (
    <div className="relative">
      {product && (
        <div aria-hidden className="absolute -inset-3 -z-10 rounded-[28px] bg-primary/20 blur-2xl" />
      )}
      <div
        className={cn(
          "h-full rounded-2xl border p-5 sm:p-7",
          product
            ? "border-primary/60 bg-card shadow-[0_0_0_1px_rgba(30,160,118,0.25),0_30px_70px_-40px_rgba(30,160,118,0.5)]"
            : "border-border bg-muted/40",
        )}
      >
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "flex size-7 items-center justify-center rounded-full",
              product ? "bg-primary text-white" : "bg-brand-red/10 text-brand-red",
            )}
          >
            {product ? <Check className="size-4" strokeWidth={3} aria-hidden /> : <X className="size-4" strokeWidth={3} aria-hidden />}
          </span>
          <h3 className={cn("text-lg font-extrabold tracking-tight sm:text-xl", !product && "text-muted-foreground")}>
            {title}
          </h3>
        </div>

        <Stagger stagger={0.09} amount={0.3} className="mt-5 flex flex-col divide-y divide-border/70">
          {items.map((item) => (
            <StaggerItem
              key={item}
              distance={12}
              className={cn(
                "flex items-start gap-3 py-3.5 text-[15px] sm:text-base",
                product ? "font-semibold text-foreground" : "text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                  product ? "bg-primary/12 text-primary" : "bg-brand-red/10 text-brand-red/80",
                )}
              >
                {product ? <Check className="size-3" strokeWidth={3} aria-hidden /> : <X className="size-3" strokeWidth={3} aria-hidden />}
              </span>
              {item}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}
