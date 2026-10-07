"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { Volume2 } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { VturbPlayer } from "@/components/vturb-player";
import { VSL_STEPS, vslProgress, type VslPercent } from "@/lib/tracking";

/**
 * VSL vertical (9:16) do hero.
 * - provider "vturb" (com vturbId e accountId): embed oficial do VTurb.
 * - provider "native" (padrão): <video> próprio, ver NativeVsl.
 */
export function VslPlayer({ className }: { className?: string }) {
  const { vsl, vturb } = site;
  if (vsl.provider === "vturb" && vsl.vturbId && vturb.accountId) {
    return <VturbPlayer id={vsl.vturbId} aspect="9:16" strategy="afterInteractive" className={className} />;
  }
  return <NativeVsl className={className} />;
}

/**
 * Player nativo:
 * - começa em autoplay mudo e em loop, com overlay grande "Clique para ouvir";
 * - no clique: volta pro início, liga o som, tira o loop e mostra os controles;
 * - depois do clique, dispara o evento VSL em 25/50/75/95% (uma vez por marco);
 * - prefers-reduced-motion: não roda sozinho (fica no poster até o clique).
 */
function NativeVsl({ className }: { className?: string }) {
  const { src, poster, width, height, soundLabel } = site.vsl;
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [listening, setListening] = useState(false);
  const [started, setStarted] = useState(false);
  const fired = useRef(new Set<VslPercent>());

  // React não serializa `muted` no HTML do servidor; garante mudo + autoplay no cliente.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || listening) return;
    v.muted = true;
    if (reduceMotion) v.pause();
    else v.play().catch(() => {});
  }, [reduceMotion, listening]);

  function startListening() {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = false;
    v.loop = false;
    v.controls = true;
    fired.current.clear();
    setListening(true);
    v.play().catch(() => {});
  }

  function handleTimeUpdate() {
    const v = videoRef.current;
    if (!v || !listening || !v.duration) return;
    const pct = (v.currentTime / v.duration) * 100;
    for (const step of VSL_STEPS) {
      if (pct >= step && !fired.current.has(step)) {
        fired.current.add(step);
        vslProgress(step);
      }
    }
  }

  return (
    <div className={cn("relative w-full overflow-hidden bg-[#0B1210]", className)} style={{ aspectRatio: `${width} / ${height}` }}>
      {/* Poster (LCP no mobile): some quando o vídeo começa a tocar */}
      <Image
        src={poster}
        alt={`Vídeo do Lipe apresentando a ${site.productName}`}
        fill
        priority
        sizes="(min-width: 1024px) 380px, 100vw"
        className={cn("object-cover transition-opacity duration-500", started && "opacity-0")}
      />
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onPlaying={() => setStarted(true)}
        onTimeUpdate={handleTimeUpdate}
        className="absolute inset-0 size-full object-cover"
      />

      {!listening && (
        <button
          type="button"
          onClick={startListening}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/25 text-white transition-colors hover:bg-black/35 focus-visible:outline-none"
          aria-label={`${soundLabel}: assistir à VSL com som desde o início`}
        >
          <span className="relative flex size-20 items-center justify-center sm:size-24">
            <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/50" />
            <span className="relative flex size-full items-center justify-center rounded-full bg-primary shadow-[0_16px_40px_-10px_rgba(30,160,118,0.9)] transition-transform duration-300 group-hover:scale-105 group-focus-visible:ring-4 group-focus-visible:ring-white/60">
              <Volume2 className="size-9 sm:size-10" aria-hidden />
            </span>
          </span>
          <span className="rounded-full bg-black/55 px-4 py-2 text-base font-bold tracking-tight backdrop-blur-sm sm:text-lg">
            {soundLabel}
          </span>
        </button>
      )}
    </div>
  );
}
