import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Screen } from "./screens";

/** Título + bullets de uma tela. */
export function ScreenCopy({ screen, className }: { screen: Screen; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <span className="text-xs font-bold tracking-[0.18em] text-primary uppercase">
        {screen.label}
      </span>
      <h3 className="text-2xl leading-tight font-extrabold tracking-[-0.025em] text-balance sm:text-3xl">
        {screen.title}
      </h3>
      <ul className="flex flex-col gap-2.5">
        {screen.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-[15px] text-muted-foreground sm:text-base">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
              <Check className="size-3" strokeWidth={3} aria-hidden />
            </span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
