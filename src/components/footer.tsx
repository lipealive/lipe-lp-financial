import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { site, whatsappUrl } from "@/config/site";
import { Logo, MultiCapLogo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="section-dark border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-10 text-center sm:px-6 md:flex-row md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <Link href="/" aria-label={site.productName} className="rounded-sm focus-visible:ring-3 focus-visible:ring-primary/40 focus-visible:outline-none">
            <Logo variant="horizontal" className="[&>span]:h-9" />
          </Link>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>by</span>
            <MultiCapLogo className="h-4" />
          </p>
          <p className="text-xs text-muted-foreground">
            © 2026 {site.company}. Todos os direitos reservados.
          </p>
        </div>

        <nav aria-label="Rodapé" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-foreground transition-colors hover:text-primary"
          >
            <MessageCircle className="size-4 text-primary" aria-hidden />
            Suporte no WhatsApp
          </a>
          <Link href="/privacidade" className="text-muted-foreground transition-colors hover:text-foreground">
            Política de Privacidade
          </Link>
          <Link href="/termos" className="text-muted-foreground transition-colors hover:text-foreground">
            Termos de Uso
          </Link>
        </nav>
      </div>
      {/* Espaço extra no mobile pra barra de CTA fixa não cobrir os links */}
      <div aria-hidden className="h-20 md:hidden" />
    </footer>
  );
}
