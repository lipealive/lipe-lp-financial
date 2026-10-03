import type { Metadata, Viewport } from "next";
import { Caveat, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/config/site";
import { TrackingScripts } from "@/components/tracking/tracking-scripts";
import { PageTracker } from "@/components/tracking/page-tracker";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

/** Fonte manuscrita da assinatura "Stay Alive". */
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1EA076",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={site.locale}
      className={`${plusJakarta.variable} ${caveat.variable} h-full antialiased`}
      // O script inline abaixo adiciona a classe `js` antes da hidratação; o aviso de mismatch é esperado.
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        {/* Marca JS ativo antes de qualquer render: só então as animações começam ocultas (ver globals.css). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {children}
        <TrackingScripts />
        <PageTracker />
      </body>
    </html>
  );
}
