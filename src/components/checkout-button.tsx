"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { offer } from "@/config/site";
import { cliqueCheckout, type CheckoutOrigem } from "@/lib/tracking";

type CheckoutButtonProps = {
  children?: ReactNode;
  /** `default` = CTA principal; `compact` = header/barras. */
  size?: "default" | "compact";
  /** Seção de origem do clique (vai no evento CliqueCheckout). */
  location: CheckoutOrigem;
  className?: string;
};

/**
 * Lê a query string atual sem useSearchParams (evita Suspense/CSR bailout).
 * No servidor retorna "", então o HTML inicial já traz o link base da Kiwify.
 */
function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}
function useSearch() {
  return useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => "",
  );
}

/** Parâmetros (além de utm_*) repassados da URL atual para o link da Kiwify. */
const PASSTHROUGH = new Set(["fbclid", "src"]);

/**
 * Monta o link da Kiwify a partir do site.ts (mantendo o afid) e repassa
 * utm_*, fbclid e src da URL atual.
 */
function buildCheckoutUrl(search: string): string {
  const url = new URL(offer.checkoutUrl);
  url.searchParams.set("sck", offer.sck);
  const current = new URLSearchParams(search);
  current.forEach((value, key) => {
    const k = key.toLowerCase();
    if ((k.startsWith("utm_") || PASSTHROUGH.has(k)) && value) url.searchParams.set(key, value);
  });
  return url.toString();
}

/** Visual do CTA (pill verde com shine). Reutilizado pelo botão de rolagem do header. */
export function ctaClassName(size: "default" | "compact", className?: string) {
  return cn(
    "group relative isolate inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full font-semibold whitespace-nowrap text-white select-none",
    "bg-primary shadow-[0_8px_24px_-8px_rgba(30,160,118,0.7),inset_0_1px_0_rgba(255,255,255,0.18)] transition-[background-color,box-shadow] duration-300",
    "hover:bg-primary-hover hover:shadow-[0_14px_32px_-10px_rgba(30,160,118,0.8),inset_0_1px_0_rgba(255,255,255,0.22)]",
    "focus-visible:ring-3 focus-visible:ring-primary/40 focus-visible:outline-none",
    size === "default" && "h-14 w-full px-7 text-base sm:w-auto sm:min-w-72",
    size === "compact" && "h-10 px-4 text-sm",
    className,
  );
}

export function CtaShine() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/35 to-transparent"
    />
  );
}

/**
 * Componente ÚNICO para todos os CTAs de compra da página.
 */
export function CheckoutButton({
  children = "Quero organizar minhas finanças",
  size = "default",
  location,
  className,
}: CheckoutButtonProps) {
  const search = useSearch();
  const href = buildCheckoutUrl(search);
  const reduceMotion = useReducedMotion();

  function handleClick() {
    // Dispara antes do redirecionamento (Pixel + API de Conversões com keepalive + Clarity).
    // InitiateCheckout e Purchase NÃO são disparados aqui: vêm da Kiwify.
    cliqueCheckout(location);
  }

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      data-checkout-location={location}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      whileHover={reduceMotion ? undefined : { y: -1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={ctaClassName(size, className)}
    >
      <CtaShine />
      <span>{children}</span>
      <ArrowRight
        aria-hidden
        className={cn(
          "transition-transform duration-300 ease-out group-hover:translate-x-1",
          size === "default" ? "size-5" : "size-4",
        )}
      />
    </motion.a>
  );
}
