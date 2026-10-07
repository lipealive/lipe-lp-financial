import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing-page";
import { VARIANTS, variantFromSlug } from "@/config/site";

type Props = { params: Promise<{ oferta: string }> };

/** Só as variações do site.ts existem (/97, /127, /97-sv, /127-sv). Qualquer outro caminho → 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return VARIANTS.map((v) => ({ oferta: v.slug }));
}

/** Páginas de anúncio: canonical para a própria rota e fora do Google. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { oferta } = await params;
  if (!variantFromSlug(oferta)) return {};
  return {
    alternates: { canonical: `/${oferta}` },
    robots: { index: false, follow: true },
  };
}

export default async function OfertaPage({ params }: Props) {
  const { oferta } = await params;
  const variant = variantFromSlug(oferta);
  if (!variant) notFound();
  return <LandingPage offerId={variant.offerId} versao={variant.versao} />;
}
