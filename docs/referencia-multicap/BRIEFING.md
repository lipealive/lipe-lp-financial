# Briefing — LP de referência da MultiCap (landing-consultor)

Fonte: https://planilha.multicap.com.br/landing-consultor, capturada em 2026-10-06 em
Chromium headless (1440px e 390px). Arquivos nesta pasta: `pagina-1440.png`,
`pagina-390.png`, `texto.md` (texto por seção), `links.md` (links e checkout),
`extracao.json` (bruto).

## Resumo em 5 linhas

1. A página vende o **MultiCap**: uma planilha financeira online (navegador + app iOS/Android) cujo diferencial é o **"Consultor MultiCap"**, um assistente no WhatsApp que lança gastos, receitas, contas fixas, investimentos, reserva e metas a partir de texto, áudio ou print.
2. Público: pessoa física que quer "fazer sobrar dinheiro e construir patrimônio" sem abrir planilha, só mandando mensagem.
3. Promessa central: "Você manda uma mensagem, o consultor executa, a planilha organiza" e "pergunte e receba a resposta com gráfico".
4. Oferta única: plano **anual**, com teste A/B entre **R$ 127** e **R$ 97** por ano, checkout na Kiwify.
5. Prova social em vídeo (3 depoimentos) e dois selos de loja (App Store e Google Play) sem link.

## Oferta

| Item | Referência (MultiCap) |
|---|---|
| Planos | Um só: **Anual** |
| Preço | Variante A: **R$ 127/ano** ("menos de R$ 10,60 por mês"). Variante B: **R$ 97/ano** ("menos de R$ 8,10 por mês") |
| Parcelamento | Não oferecido na página: "cobrado 1x ao ano". Sem Pix/boleto citados |
| Acesso | "Acesso por 12 meses" |
| Incluso | "App completo", "Aulas e atualizações", "Acesso por 12 meses" |
| Garantia | Nenhuma menção |
| Checkout | Kiwify, produtos `hor8IvC` (p127) e `q15UnQk` (p97), `utm_content=landing-consultor`, **sem afid** |
| Login | "Já tenho conta" / "Entrar" → planilha.multicap.com.br/login |

A variante é sorteada no primeiro acesso e guardada em `localStorage` (`mc.ab_preco`);
o preço no hero ("Acesso completo por R$ 127/ano") e o card de planos mudam juntos.

## Estrutura da página (na ordem)

1. **Header**: logo MultiCap + botão "Quero o acesso" (rola até `#planos`).
2. **Hero**: "Aprenda a fazer sobrar dinheiro e construir patrimônio usando apenas o WhatsApp". Sub: "Tenha total controle do que acontece com seu dinheiro e tenha o seu patrimônio a uma mensagem de distância." CTA "Quero o acesso" + "Já tenho conta" + "Acesso completo por R$ 127/ano". À direita, mockup de iPhone com uma conversa de WhatsApp simulada (lançamentos e respostas do consultor) e os dois selos de loja.
3. **Depoimentos**: "Quem usa, aprova." Carrossel com 3 vídeos verticais (um com @christianballan1) e um print de comentário do Instagram.
4. **Faixa de recursos**: Patrimônio líquido · Composição por item · Gastos por categoria · App para iOS e Android · Privacidade por padrão.
5. **Consultor MultiCap** (eyebrow "NOVO · CONSULTOR MULTICAP"): "Você manda uma mensagem, o consultor executa, a planilha organiza." Três pilares (áudio/texto/print; cadastra e responde; lembra das contas) e seis cards com exemplos: gastos e receitas, contas fixas, investimentos e patrimônio, reserva de emergência, metas e aportes, lembretes. Sub-bloco "PERGUNTAS": "Pergunte e receba a resposta com gráfico." com gráfico de pizza.
6. **Orçamento e Patrimônio** (dois blocos com mockup de celular): "Dentro da planilha você vai saber pra onde vai cada real." e "Quanto você tem de verdade."
7. **App iOS e Android** (`#app`): "Seu dinheiro no bolso, onde você estiver." + selos de loja.
8. **Planos** (`#planos`): "Escolha seu plano" → card Anual + "Assinar anual".
9. **Footer**: "Feito pra quem leva o próprio dinheiro a sério." + Entrar, Quero o acesso, Termos, Privacidade.

Não há FAQ, não há seção sobre o criador (Lipe não aparece), não há comparativo e não há
CTA final separado: o último CTA é o próprio card de plano.

## Argumentos e funcionalidades que eles destacam

- **Consultor no WhatsApp** (o argumento principal da página inteira): lança por texto, áudio ou print de comprovante; responde perguntas com os números do usuário; devolve gráfico na conversa; cria lembretes ("me lembra de pagar o IPVA dia 30 às 10h").
- **Contas fixas viram série mensal** ("pago 1.800 de aluguel todo dia 10").
- **Parcelamento automático** ("geladeira de 3.600 em 12 vezes" → 12x de R$ 300).
- **Patrimônio líquido automático**: soma liquidez, bens, investimentos e dívidas, composição item a item, atualiza ao editar.
- **Orçamento**: receitas, despesas fixas e variáveis por categoria, quanto investir e quanto sobra, "tudo numa tela só".
- **App iOS e Android** sincronizado com o navegador, "mesma conta".
- **Privacidade por padrão** (na faixa de recursos).
- **Prova social**: 3 depoimentos em vídeo + comentário de usuário.
- **Fricção baixa**: "Já tenho conta" e "Entrar" visíveis (página também serve usuários atuais).

## Diferenças em relação à nossa LP (site.ts)

### Preço e oferta

| | Nossa LP (site.ts) | Referência |
|---|---|---|
| Preço | **R$ 97/ano**, à vista ou parcelado no cartão; âncora "menos de R$ 8,10 por mês" | **R$ 127** ou **R$ 97/ano** (A/B); âncoras "menos de R$ 10,60" / "R$ 8,10 por mês" |
| Pagamento | Cartão (à vista ou parcelado), Pix e boleto | "cobrado 1x ao ano", sem parcelamento citado |
| Acesso | "acesso por 1 ano" | "Acesso por 12 meses" |
| Checkout | Kiwify `aZ9JtZL` com `afid=XH9VD8ii` (afiliado) | Kiwify `hor8IvC` / `q15UnQk`, sem afiliado |

**Atenção:** nosso link aponta para um **produto Kiwify diferente** dos dois usados por eles.
Vale confirmar com a MultiCap se `aZ9JtZL` é o produto certo. Nosso preço (R$ 97) é igual
à variante B deles e menor que a variante A (R$ 127).

### Funcionalidades que eles citam e nós não

- **Consultor MultiCap no WhatsApp** (lançar por mensagem, áudio ou print) — é o centro da página deles e não aparece em lugar nenhum da nossa.
- **Perguntas respondidas com gráfico** na conversa.
- **Lembretes de contas** (IPVA, vencimentos).
- **Contas fixas como série mensal** e **parcelamento automático** (nós citamos "compras parceladas sob controle", mas sem o mecanismo).
- **Patrimônio líquido com dívidas** e composição item a item (nós temos "Investimentos e patrimônio" e o card de patrimônio, sem citar dívidas).
- **Privacidade por padrão**.
- **Login para quem já tem conta**.

### Funcionalidades que nós citamos e eles não

- Reserva de emergência como tela própria (escudo "33% protegido"); eles só citam reserva como exemplo de lançamento.
- Visão geral com comparação de meses (3, 6, 12 meses).
- Escola com **13 aulas** e ebooks em PDF; eles dizem só "Aulas e atualizações".
- **5 calculadoras** (juros compostos, reserva, primeiro milhão, renda, alugar ou financiar).
- Modo claro e escuro.
- Importar extrato do banco.
- Seção do criador (Lipe), comparativo com planilha comum, FAQ, CTA final, barra fixa no mobile.

### Textos que contradizem ou destoam dos nossos

- **Nome**: eles vendem como **"MultiCap"** (logo, "Consultor MultiCap", "Baixe o MultiCap"). Nós vendemos como **"Alive Finance by MultiCap"**. Nosso FAQ manda "baixar o app MultiCap", o que bate com o nome do app nas lojas, mas o restante da nossa página chama o produto de Alive Finance.
- **Preço**: "menos de R$ 8,10 por mês" (nós) coincide com a variante B deles; a variante A diz "menos de R$ 10,60 por mês".
- **Como lançar**: nosso FAQ diz "Você lança seus gastos ou importa o extrato"; a página deles diz que se lança **mandando mensagem no WhatsApp**. Não é contradição direta, mas nossa resposta ignora o recurso principal deles.
- **Aulas**: "13 aulas de educação financeira + ebooks em PDF" (nós) vs "Aulas e atualizações" sem número (eles). Nosso número precisa estar correto na plataforma.
- **Parcelamento**: nós prometemos "Cartão de crédito (à vista ou parcelado), Pix e boleto"; a página deles só fala em cobrança anual única. Confirmar na Kiwify do produto `aZ9JtZL`.
- **Posicionamento**: o headline deles é WhatsApp-first ("usando apenas o WhatsApp"); o nosso é dor-first ("Pare de se perguntar pra onde foi seu dinheiro"). Se o consultor via WhatsApp já está disponível para quem compra pela nossa página, é o argumento mais forte que estamos deixando de fora.

### Coincidências úteis

- Mesma fonte (Plus Jakarta Sans), mesma paleta verde, mesmos selos de loja **sem link** (igual à nossa regra).
- Ambos usam Meta Pixel + Clarity (projetos diferentes dos nossos: pixel `2478855339243293`, Clarity `xcar75yxqy`).
