import Script from "next/script";
import { CLARITY_ID, clarityEnabled, metaEnabled } from "@/lib/tracking/config";

/**
 * Scripts de terceiros, só quando o ID correspondente existe.
 * - Meta Pixel: só o fbevents.js; a fila `fbq` e o init ficam em src/lib/tracking/meta.ts,
 *   e o PageView é disparado por nós (com event_id) em vez do snippet padrão.
 * - Clarity: snippet oficial, com o mascaramento padrão.
 */
export function TrackingScripts() {
  return (
    <>
      {metaEnabled && (
        <Script id="meta-pixel" src="https://connect.facebook.net/en_US/fbevents.js" strategy="afterInteractive" />
      )}
      {clarityEnabled && (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",${JSON.stringify(CLARITY_ID)});`}
        </Script>
      )}
    </>
  );
}
