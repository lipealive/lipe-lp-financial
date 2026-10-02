import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/config/site";

export const alt = `${site.productName} — Organize seu dinheiro por ${site.offer.anchor}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoSvg = await readFile(
  join(process.cwd(), "public/images/brand/alive-finance-brand/logo-horizontal-dark.svg"),
  "base64",
);
const logoSrc = `data:image/svg+xml;base64,${logoSvg}`;

/** Plus Jakarta Sans 800 (TTF/WOFF) do Google Fonts; se falhar, cai na fonte padrão. */
async function loadFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:30.0) Gecko/20100101 Firefox/30.0" } },
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(truetype|opentype|woff)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image() {
  const font = await loadFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B1210",
          backgroundImage:
            "radial-gradient(circle at 50% 42%, rgba(35,181,133,0.28) 0%, rgba(35,181,133,0.08) 35%, rgba(11,18,16,0) 65%)",
          fontFamily: font ? "Plus Jakarta Sans" : "sans-serif",
        }}
      >
        <img src={logoSrc} alt="" width={540} height={128} style={{ width: 540, height: 128 }} />
        <div
          style={{
            marginTop: 44,
            fontSize: 44,
            fontWeight: 800,
            letterSpacing: -1.2,
            color: "#F2F5F3",
            textAlign: "center",
            display: "flex",
          }}
        >
          Organize seu dinheiro por&nbsp;<span style={{ color: "#23B585" }}>{site.offer.anchor}</span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#8A9A93",
            fontSize: 22,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: 999, background: "#E6338A" }} />
          {site.appHost}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "Plus Jakarta Sans", data: font, weight: 800, style: "normal" }] : undefined,
    },
  );
}
