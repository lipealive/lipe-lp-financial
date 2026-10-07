import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing-page";
import { OFFER_IDS, offerIdFromSlug, site } from "@/config/site";

type Props = { params: Promise<{ oferta: string }> };

/** Só as ofertas do site.ts existem (/97, /127). Qualquer outro caminho → 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return OFFER_IDS.map((id) => ({ oferta: site.offers[id].slug }));
}

/** Páginas de anúncio: não indexar e apontar o canonical para a raiz. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { oferta } = await params;
  if (!offerIdFromSlug(oferta)) return {};
  return {
    alternates: { canonical: "/" },
    robots: { index: false, follow: true },
  };
}

export default async function OfertaPage({ params }: Props) {
  const { oferta } = await params;
  const offerId = offerIdFromSlug(oferta);
  if (!offerId) notFound();
  return <LandingPage offerId={offerId} />;
}
