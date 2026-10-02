import Image from "next/image";
import { site } from "@/config/site";
import { FadeIn } from "@/components/motion";
import { CheckoutButton } from "@/components/checkout-button";

export function CtaFinal() {
  return (
    <section id="cta-final" className="section-dark relative overflow-x-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-[62%] h-[480px] w-[min(90vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(35,181,133,0.28),transparent_72%)] blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-10 lg:px-6">
        {/* Foto: sem moldura, bordas fundindo no fundo */}
        <div className="relative h-[480px] w-full sm:h-[560px] lg:h-[640px]">
          <Image
            src="/images/lipe/lipe-terno.jpg"
            alt={`${site.lipe.name}, criador da ${site.productName}`}
            fill
            sizes="(min-width: 1024px) 520px, 100vw"
            className="object-cover object-top mask-fade-bottom lg:mask-fade-all"
          />
        </div>

        {/* Texto: no mobile sobe por cima da parte de baixo da foto */}
        <FadeIn className="relative z-10 -mt-32 flex flex-col items-center px-4 pb-20 text-center sm:-mt-40 sm:px-6 lg:mt-0 lg:items-start lg:px-0 lg:py-24 lg:text-left">
          <h2 className="max-w-[16ch] text-[2.1rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.4rem]">
            Seu dinheiro não vai se organizar sozinho.
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Comece hoje por <span className="font-semibold text-primary">{site.offer.anchor}</span>.
          </p>
          <div className="mt-8 w-full sm:w-auto">
            <CheckoutButton location="cta-final">Quero organizar minhas finanças</CheckoutButton>
          </div>
          <div className="mt-8 flex items-center gap-2.5">
            <span className="font-script text-3xl leading-none font-bold text-foreground sm:text-4xl">
              {site.lipe.signature}
            </span>
            <Image
              src="/images/lipe/brand/HORN-LIPE-BRANCO.png"
              alt=""
              width={1080}
              height={1075}
              sizes="28px"
              className="size-6 sm:size-7"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
