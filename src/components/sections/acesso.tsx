import Image from "next/image";
import { site } from "@/config/site";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";

/**
 * "Como é o acesso": explica antes da compra que Alive Finance = MultiCap,
 * pra quem cair no checkout, no e-mail e no app com o nome MultiCap não estranhar.
 */
export function Acesso() {
  const { acesso } = site;

  return (
    <section id="acesso" className="relative py-16 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <FadeIn className="flex flex-col items-center gap-3 text-center">
          <span className="text-xs font-bold tracking-[0.18em] text-primary uppercase">{acesso.eyebrow}</span>
          <h2 className="max-w-[18ch] text-[2rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl">
            {acesso.title}
          </h2>

          {/* Alive Finance = MultiCap */}
          <div
            className="mt-3 inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5 shadow-sm sm:gap-4 sm:px-6 sm:py-3"
            aria-label={`${site.productName} é a mesma coisa que ${site.company}`}
          >
            <Image
              src="/images/brand/alive-finance-brand/wordmark-light.svg"
              alt={site.productName}
              width={287}
              height={52}
              unoptimized
              className="h-6 w-auto sm:h-7"
            />
            <span aria-hidden className="-mt-1 text-2xl leading-none font-extrabold text-primary sm:text-3xl">=</span>
            <span className="text-xl font-extrabold tracking-tight sm:text-2xl">{site.company}</span>
          </div>

          <p className="mt-3 max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg">{acesso.text}</p>
        </FadeIn>

        <Stagger stagger={0.1} className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 lg:mt-12">
          {acesso.steps.map((step, i) => (
            <StaggerItem key={step.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5 md:flex-col sm:p-6">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-white shadow-[0_8px_20px_-8px_rgba(30,160,118,0.8)]">
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-bold tracking-tight">{step.title}</h3>
                <p className="mt-1.5 text-[15px] text-pretty text-muted-foreground sm:text-base">{step.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
