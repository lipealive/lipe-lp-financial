import { DEFAULT_OFFER, getOffer } from "@/config/site";
import { ogAlt, ogContentType, ogSize, renderOgImage } from "@/lib/og-image";

export const alt = ogAlt(getOffer(DEFAULT_OFFER));
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage(getOffer(DEFAULT_OFFER));
}
