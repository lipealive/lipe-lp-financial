import { notFound } from "next/navigation";
import { getOffer, site, VARIANTS, variantFromSlug } from "@/config/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og-image";

// `alt` é estático por arquivo (vale para todas as variações): sem preço. O preço vai na imagem.
export const alt = `${site.productName} — a planilha financeira do Lipe`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return VARIANTS.map((v) => ({ oferta: v.slug }));
}

export default async function Image({ params }: { params: Promise<{ oferta: string }> }) {
  const { oferta } = await params;
  const variant = variantFromSlug(oferta);
  if (!variant) notFound();
  return renderOgImage(getOffer(variant.offerId));
}
