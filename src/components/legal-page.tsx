import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

type Section = { title: string; body: ReactNode };

/** Layout simples das páginas legais (/privacidade e /termos). */
export function LegalPage({
  title,
  updatedAt,
  intro,
  sections,
}: {
  title: string;
  updatedAt: string;
  intro: ReactNode;
  sections: Section[];
}) {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <article className="mx-auto w-full max-w-3xl px-4 pt-32 pb-20 sm:px-6 lg:pt-36">
          <h1 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Última atualização: {updatedAt}</p>
          <div className="mt-6 text-base leading-relaxed text-muted-foreground">{intro}</div>
          <div className="mt-10 flex flex-col gap-8">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-xl font-bold tracking-tight">{s.title}</h2>
                <div className="mt-2 text-base leading-relaxed text-muted-foreground">{s.body}</div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
