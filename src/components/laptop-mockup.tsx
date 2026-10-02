import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Moldura de notebook em código (tela + base). O conteúdo vai na tela, em 16:9.
 */
export function LaptopMockup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-4xl", className)}>
      {/* Tela */}
      <div className="relative rounded-t-[18px] rounded-b-md border border-white/10 bg-[#0B0F0E] p-2 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] sm:rounded-t-[26px] sm:p-3">
        {/* Câmera */}
        <span aria-hidden className="absolute top-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-white/20 sm:top-1.5 sm:size-2" />
        <div className="overflow-hidden rounded-[10px] bg-black sm:rounded-[14px]">{children}</div>
      </div>
      {/* Base */}
      <div
        aria-hidden
        className="relative mx-[-3%] h-3 rounded-b-xl border-t border-white/10 bg-gradient-to-b from-[#2A3430] to-[#161C1A] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)] sm:h-4"
      >
        <span className="absolute top-0 left-1/2 h-1 w-[14%] -translate-x-1/2 rounded-b-md bg-black/50 sm:h-1.5" />
      </div>
    </div>
  );
}
