import Script from "next/script";

/**
 * Scripts de terceiros, só quando o ID correspondente existe.
 * Os IDs vêm por props do layout (lidos no servidor), não de NEXT_PUBLIC_*.
 * - Meta Pixel: só o fbevents.js; a fila `fbq` e o init ficam em src/lib/tracking/meta.ts,
 *   e o PageView é disparado por nós (com event_id) em vez do snippet padrão.
 * - Clarity: snippet oficial, com o mascaramento padrão.
 */
export function TrackingScripts({ pixelId, clarityId }: { pixelId: string; clarityId: string }) {
  return (
    <>
      {pixelId && (
        <Script id="meta-pixel" src="https://connect.facebook.net/en_US/fbevents.js" strategy="afterInteractive" />
      )}
      {clarityId && (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",${JSON.stringify(clarityId)});`}
        </Script>
      )}
    </>
  );
}
