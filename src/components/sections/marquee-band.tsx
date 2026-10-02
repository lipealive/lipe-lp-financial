import Image from "next/image";
import { cn } from "@/lib/utils";

const phrases = ["PEGA A SENHA", "STAY ALIVE"];
const REPEAT = 6;

/**
 * Faixa de transição: duas tiras inclinadas em sentidos opostos.
 * A da frente (verde, -2°) e a de trás (mais clara, +2°, sentido contrário).
 */
export function MarqueeBand() {
  return (
    <div aria-hidden className="relative -my-6 overflow-x-clip py-10 sm:-my-10 sm:py-16">
      <Band className="absolute inset-x-0 top-1/2 -translate-y-1/2 rotate-2 bg-[#5BAE89] text-white/80" reverse />
      <Band className="relative -rotate-2 bg-primary text-white" />
    </div>
  );
}

function Band({ className, reverse = false }: { className?: string; reverse?: boolean }) {
  return (
    <div className={cn("w-[120vw] -translate-x-[10vw] overflow-hidden py-3 shadow-[0_20px_50px_-30px_rgba(14,26,21,0.5)] sm:py-4", className)}>
      <div
        className={cn(
          "flex w-max items-center animate-marquee-fast motion-reduce:animate-none",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {Array.from({ length: REPEAT }).flatMap((_, i) =>
              phrases.map((p) => (
                <span
                  key={`${copy}-${i}-${p}`}
                  className="flex items-center gap-5 pr-5 text-2xl font-extrabold tracking-tight whitespace-nowrap sm:gap-7 sm:pr-7 sm:text-4xl lg:text-5xl"
                >
                  {p}
                  <Image
                    src="/images/lipe/brand/HORN-LIPE-BRANCO.png"
                    alt=""
                    width={1080}
                    height={1075}
                    sizes="48px"
                    className="h-[1em] w-auto"
                  />
                </span>
              )),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
