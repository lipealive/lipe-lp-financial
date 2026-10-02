import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";

const BRAND = "/images/brand/alive-finance-brand";

type LogoProps = {
  className?: string;
  /** Carrega com prioridade (header). */
  priority?: boolean;
  /**
   * `responsive` (padrão): wordmark ~24px no mobile, logo horizontal ~40px no desktop.
   * `horizontal`: sempre o logo completo (símbolo + nome + "by MultiCap").
   */
  variant?: "responsive" | "horizontal";
};

/**
 * Logo Alive Finance. Dentro de .section-dark / .dark a versão clara entra com fade
 * (mesma troca automática do header ao passar por seções escuras).
 * SVGs são servidos sem o otimizador (`unoptimized`).
 */
export function Logo({ className, priority, variant = "responsive" }: LogoProps) {
  const responsive = variant === "responsive";
  return (
    <span className={cn("inline-flex items-center", className)}>
      {responsive && (
        <Pair
          light={`${BRAND}/wordmark-light.svg`}
          dark={`${BRAND}/wordmark-dark.svg`}
          width={287}
          height={52}
          priority={priority}
          className="h-6 sm:hidden"
        />
      )}
      <Pair
        light={`${BRAND}/logo-horizontal-light.svg`}
        dark={`${BRAND}/logo-horizontal-dark.svg`}
        width={405}
        height={96}
        priority={priority}
        className={cn("h-10", responsive && "hidden sm:block")}
      />
    </span>
  );
}

/** Par claro/escuro empilhado; o escuro aparece via variante `dark:` com transição. */
function Pair({
  light,
  dark,
  width,
  height,
  priority,
  className,
}: {
  light: string;
  dark: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("relative", className)} style={{ aspectRatio: `${width} / ${height}` }}>
      <Image
        src={light}
        alt={site.productName}
        width={width}
        height={height}
        priority={priority}
        unoptimized
        className="h-full w-auto transition-opacity duration-300 dark:opacity-0"
      />
      <Image
        src={dark}
        alt=""
        aria-hidden
        width={width}
        height={height}
        unoptimized
        className="pointer-events-none absolute inset-0 h-full w-auto opacity-0 transition-opacity duration-300 dark:opacity-100"
      />
    </span>
  );
}

/* ---------- Logo da MultiCap (só no rodapé, como "by MultiCap") ---------- */

const MC_SRC = "/images/brand/multicap-logo.png";
/** Faixa do PNG ocupada pelo texto "MULTI" (medida nos pixels) para a variante clara. */
const MULTI_CLIP = "inset(0 32.5% 0 29.3%)";

export function MultiCapLogo({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-block h-5", className)}>
      <Image src={MC_SRC} alt={site.company} width={246} height={88} unoptimized className="h-full w-auto" />
      <Image
        src={MC_SRC}
        alt=""
        aria-hidden
        width={246}
        height={88}
        unoptimized
        className="pointer-events-none absolute inset-0 h-full w-auto opacity-0 transition-opacity duration-300 dark:opacity-100"
        style={{ clipPath: MULTI_CLIP, filter: "brightness(0) invert(1)" }}
      />
    </span>
  );
}
