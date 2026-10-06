import { siAndroid, siApple } from "simple-icons";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";

/**
 * Linha discreta de disponibilidade nas lojas. Só informação: sem link, sem
 * botão, sem cursor de mão (a compra acontece no nosso checkout).
 */
export function AvailabilityStrip({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-xs font-medium text-muted-foreground select-none sm:text-[13px]",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1.5" aria-hidden>
        <BrandIcon path={siApple.path} />
        <BrandIcon path={siAndroid.path} />
      </span>
      {site.availability}
    </p>
  );
}

function BrandIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
      <path d={path} />
    </svg>
  );
}
