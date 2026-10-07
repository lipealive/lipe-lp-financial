import { notFound } from "next/navigation";
import { getOffer, OFFER_IDS, offerIdFromSlug, site } from "@/config/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og-image";

// `alt` é estático por arquivo (vale para todas as ofertas): sem preço. O preço vai na imagem.
export const alt = `${site.productName} — a planilha financeira do Lipe`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return OFFER_IDS.map((id) => ({ oferta: site.offers[id].slug }));
}

export default async function Image({ params }: { params: Promise<{ oferta: string }> }) {
  const { oferta } = await params;
  const id = offerIdFromSlug(oferta);
  if (!id) notFound();
  return renderOgImage(getOffer(id));
}
