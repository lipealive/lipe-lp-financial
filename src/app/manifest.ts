import type { MetadataRoute } from "next";
import { site } from "@/config/site";

const ICONS = "/images/brand/alive-finance-brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.productName,
    short_name: site.productName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F4F6F5",
    theme_color: "#1EA076",
    icons: [
      { src: `${ICONS}/icon-192.png`, sizes: "192x192", type: "image/png" },
      { src: `${ICONS}/icon-512.png`, sizes: "512x512", type: "image/png" },
      { src: `${ICONS}/icon-maskable-512.png`, sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
