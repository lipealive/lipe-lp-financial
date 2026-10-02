import type { Metadata } from "next";
import { site } from "@/config/site";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: `Condições de uso da ${site.productName}.`,
};

// TODO: substituir pelo texto revisado juridicamente (placeholder padrão).
export default function TermosPage() {
  return (
    <LegalPage
      title="Termos de Uso"
      updatedAt="1 de outubro de 2026"
      intro={
        <p>
          Estes Termos de Uso regulam o acesso e a utilização da {site.productName}, plataforma online
          de organização financeira pessoal. Ao adquirir ou usar o produto, você concorda com estas
          condições.
        </p>
      }
      sections={[
        {
          title: "1. O produto",
          body: (
            <p>
              A {site.productName} é uma plataforma acessada pelo navegador, no celular e no computador,
              com ferramentas de orçamento, reserva de emergência, metas, investimentos, patrimônio,
              aulas e calculadoras. O conteúdo tem caráter educacional e não constitui recomendação de
              investimento.
            </p>
          ),
        },
        {
          title: "2. Acesso e licença",
          body: (
            <p>
              A compra concede uma licença pessoal e intransferível de uso pelo período indicado na
              oferta. É proibido compartilhar o acesso, copiar, redistribuir ou revender qualquer parte
              do produto.
            </p>
          ),
        },
        {
          title: "3. Pagamento",
          body: (
            <p>
              O pagamento é processado por plataforma terceirizada (Kiwify), que possui seus próprios
              termos. Os valores e condições são os exibidos no checkout no momento da compra.
            </p>
          ),
        },
        {
          title: "4. Responsabilidades",
          body: (
            <p>
              Você é responsável pelas informações que insere e pelas decisões financeiras tomadas com
              base nelas. Nos esforçamos para manter a plataforma disponível e correta, mas não
              garantimos resultados financeiros específicos.
            </p>
          ),
        },
        {
          title: "5. Propriedade intelectual",
          body: (
            <p>
              Marca, layout, textos, vídeos, aulas e código pertencem aos seus titulares e são
              protegidos pela legislação aplicável.
            </p>
          ),
        },
        {
          title: "6. Contato",
          body: (
            <p>
              Dúvidas sobre estes termos: suporte pelo WhatsApp {site.support.whatsappDisplay}.
            </p>
          ),
        },
      ]}
    />
  );
}
