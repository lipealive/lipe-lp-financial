import type { Metadata } from "next";
import { site } from "@/config/site";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Como a ${site.productName} coleta, usa e protege seus dados.`,
};

// TODO: substituir pelo texto revisado juridicamente (placeholder padrão).
export default function PrivacidadePage() {
  return (
    <LegalPage
      title="Política de Privacidade"
      updatedAt="1 de outubro de 2026"
      intro={
        <p>
          Esta Política de Privacidade descreve como a {site.productName} coleta, usa e protege as
          informações de quem visita esta página e adquire o produto. Ao usar o site, você concorda
          com as práticas descritas aqui.
        </p>
      }
      sections={[
        {
          title: "1. Dados que coletamos",
          body: (
            <p>
              Coletamos dados fornecidos por você no checkout (nome, e-mail, CPF e dados de pagamento,
              processados pela plataforma de pagamento) e dados de navegação coletados automaticamente,
              como endereço IP, tipo de dispositivo, páginas visitadas e identificadores de cookies.
            </p>
          ),
        },
        {
          title: "2. Como usamos os dados",
          body: (
            <p>
              Usamos os dados para liberar o acesso ao produto, prestar suporte, enviar comunicações
              sobre a compra, medir o desempenho de anúncios e melhorar a experiência do site.
            </p>
          ),
        },
        {
          title: "3. Cookies e pixels de anúncios",
          body: (
            <p>
              Utilizamos cookies e o Meta Pixel (e sua API de Conversões) para medir resultados de
              campanhas e exibir anúncios relevantes. Você pode gerenciar cookies nas configurações do
              seu navegador e suas preferências de anúncios nas configurações da Meta.
            </p>
          ),
        },
        {
          title: "4. Compartilhamento",
          body: (
            <p>
              Compartilhamos dados apenas com prestadores necessários à operação (plataforma de
              pagamento, hospedagem, e-mail e ferramentas de análise), sempre limitado à finalidade
              descrita nesta política. Não vendemos seus dados.
            </p>
          ),
        },
        {
          title: "5. Seus direitos",
          body: (
            <p>
              Nos termos da LGPD, você pode solicitar acesso, correção, portabilidade ou exclusão dos
              seus dados, além de revogar consentimentos. Para isso, fale com o suporte pelo WhatsApp{" "}
              {site.support.whatsappDisplay}.
            </p>
          ),
        },
        {
          title: "6. Alterações",
          body: (
            <p>
              Esta política pode ser atualizada a qualquer momento. A versão vigente estará sempre
              publicada nesta página, com a data da última atualização.
            </p>
          ),
        },
      ]}
    />
  );
}
