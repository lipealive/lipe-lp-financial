import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Permite abrir o dev server pelo iPhone na rede local (http://192.168.15.162:3000). */
  allowedDevOrigins: ["192.168.15.162"],
};

export default nextConfig;
