"use client";

import Script from "next/script";
import { cn } from "@/lib/utils";
import { site, type VideoAspect } from "@/config/site";

type VturbPlayerProps = {
  /** ID do player no VTurb. */
  id: string;
  aspect?: VideoAspect;
  /** Sobrescreve o accountId do site.ts se precisar. */
  accountId?: string;
  /** VSL acima da dobra: afterInteractive. Abaixo da dobra: lazyOnload. */
  strategy?: "afterInteractive" | "lazyOnload";
  className?: string;
};

const aspectClass: Record<VideoAspect, string> = {
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16]",
};

/**
 * Embed oficial do VTurb (smartplayer v4) via next/script.
 * O container já reserva a proporção, então não há layout shift quando o vídeo entra.
 * Sem id ou accountId não renderiza o embed (o VslPlayer cai no player nativo).
 */
export function VturbPlayer({
  id,
  aspect = "16:9",
  accountId = site.vturb.accountId,
  strategy = "lazyOnload",
  className,
}: VturbPlayerProps) {
  return (
    <div className={cn("relative w-full overflow-hidden bg-[#0B1210]", aspectClass[aspect], className)}>
      {id && accountId && (
        <>
          <vturb-smartplayer
            id={`vid-${id}`}
            style={{ display: "block", width: "100%", height: "100%", margin: "0 auto" }}
          />
          <Script
            id={`vturb-${id}`}
            src={`https://scripts.converteai.net/${accountId}/players/${id}/v4/player.js`}
            strategy={strategy}
          />
        </>
      )}
    </div>
  );
}
