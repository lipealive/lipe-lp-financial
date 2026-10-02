"use client";

import Script from "next/script";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { site, type VideoAspect } from "@/config/site";

type VturbPlayerProps = {
  /** ID do player no VTurb. Vazio = placeholder "VSL em breve". */
  id: string;
  aspect?: VideoAspect;
  /** Sobrescreve o accountId do site.ts se precisar. */
  accountId?: string;
  /** Texto do placeholder quando não há id. */
  placeholderLabel?: string;
  className?: string;
};

const aspectClass: Record<VideoAspect, string> = {
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16]",
};

/**
 * Player VTurb (smartplayer v4) carregado de forma lazy via next/script.
 * O container já reserva a proporção, então não há layout shift quando o vídeo entra.
 */
export function VturbPlayer({
  id,
  aspect = "16:9",
  accountId = site.vturb.accountId,
  placeholderLabel = "VSL em breve",
  className,
}: VturbPlayerProps) {
  const ready = Boolean(id && accountId);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-[#0B1210] text-[#F2F5F3]",
        aspectClass[aspect],
        className,
      )}
    >
      {ready ? (
        <>
          <vturb-smartplayer
            id={`vid-${id}`}
            style={{ display: "block", width: "100%", height: "100%", margin: "0 auto" }}
          />
          <Script
            id={`vturb-${id}`}
            src={`https://scripts.converteai.net/${accountId}/players/${id}/v4/player.js`}
            strategy="lazyOnload"
          />
        </>
      ) : (
        <Placeholder label={placeholderLabel} />
      )}
    </div>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
      {/* Fundo: gradiente + grid discreto */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(35,181,133,0.22),transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:32px_32px]"
      />

      {/* Botão de play pulsando */}
      <div className="relative">
        <span
          aria-hidden
          className="absolute inset-0 animate-pulse-ring rounded-full bg-[#23B585]/40"
        />
        <span
          aria-hidden
          className="absolute inset-0 animate-pulse-ring rounded-full bg-[#23B585]/30 [animation-delay:0.7s]"
        />
        <div className="relative flex size-16 items-center justify-center rounded-full bg-[#23B585] shadow-[0_12px_32px_-8px_rgba(35,181,133,0.9)] sm:size-20">
          <Play className="ml-1 size-7 fill-white text-white sm:size-8" />
        </div>
      </div>

      <p className="relative text-sm font-semibold tracking-wide text-[#F2F5F3]/90 sm:text-base">
        {label}
      </p>
    </div>
  );
}
