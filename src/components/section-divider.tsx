import { cn } from "@/lib/utils";

/** Divisor sutil entre seções: linha com gradiente que some nas pontas. */
export function SectionDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
