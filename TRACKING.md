# Tracking — Alive Finance

Meta Pixel + API de Conversões (CAPI) e Microsoft Clarity. Tudo é controlado por
variáveis de ambiente: com a variável vazia, a parte correspondente fica desligada
e nada quebra.

## Variáveis de ambiente (Vercel → Settings → Environment Variables)

| Variável | Onde é usada | Obrigatória | Observação |
|---|---|---|---|
| `META_PIXEL_ID` | servidor (layout e `/api/meta`) | para ligar o Meta | ID do pixel (conjunto de dados). Vazia = Pixel e CAPI desligados. |
| `META_CAPI_TOKEN` | só servidor (`/api/meta`) | para ligar a CAPI | Token de acesso da API de Conversões. **Nunca** usar prefixo `NEXT_PUBLIC_`. Vazia = a rota responde 204. |
| `META_TEST_EVENT_CODE` | só servidor | não | Código `TEST12345` da aba "Testar eventos". Usar só enquanto testa e remover depois. |
| `CLARITY_ID` | servidor (layout) | para ligar o Clarity | ID do projeto no Clarity. |

Nenhuma variável usa o prefixo `NEXT_PUBLIC_`, então todas podem ser marcadas como
**Sensitive** na Vercel. `META_PIXEL_ID` e `CLARITY_ID` são lidas no layout (Server
Component) e passadas ao cliente por props. Como a página é estática, esses valores
são fixados no build: depois de criar ou alterar qualquer um na Vercel, é preciso
fazer **Redeploy**. Os dois IDs continuam visíveis no HTML da página, como em qualquer
site com pixel; "Sensitive" só os esconde no painel da Vercel. O `META_CAPI_TOKEN`
nunca sai do servidor.

Local: copie `.env.example` para `.env.local` (não versionado) e reinicie o `npm run dev`.

## Eventos

Cada evento do Meta sai com um `event_id` único (`crypto.randomUUID`). O mesmo ID vai
no Pixel (browser) e na CAPI (servidor), e o Meta deduplica os dois.

**Todos os eventos das landings levam o parâmetro `oferta`** (`p97`, `p127`...), anexado
automaticamente em `src/lib/tracking/meta.ts`. Fora das landings (ex.: `/privacidade`) ele
não vai.

| Evento | Tipo | Quando dispara | Parâmetros | Frequência | Clarity |
|---|---|---|---|---|---|
| `PageView` | padrão | carregamento e troca de rota | — | toda página | — |
| `ViewContent` | padrão | 15s na página **ou** 50% de rolagem, o que vier primeiro | `content_name`, `value` (preço da oferta da rota: 97, 127...), `currency` | 1x por sessão | — |
| `CliqueCheckout` | custom | clique em qualquer CTA de compra, antes do redirecionamento | `secao`: `hero`, `funcionalidades`, `demo`, `oferta`, `cta-final`, `barra-mobile` | todo clique | `CliqueCheckout`, `CliqueCheckout_<secao>` e tag `checkout_secao` |
| `VideoDemo` | custom | primeiro play do vídeo da Demo e ao ativar o som | `acao`: `play` ou `som` | 1x cada por carregamento | — |
| `Rolagem` | custom | 25%, 50%, 75% e 100% da página | `percent` | 1x por sessão por marco | — |
| `SecaoVista` | custom | seção ≥50% visível por 1s | `secao`: `hero`, `vitrine`, `consultor`, `funcionalidades`, `demo`, `lipe`, `comparativo`, `oferta`, `faq`, `cta-final` | 1x por sessão por seção | `SecaoVista_<secao>` |
| `ViuOferta` | custom | junto com `SecaoVista` da seção `oferta` | — | 1x por sessão | `ViuOferta` |

Notas:
- `PageView` e `ViewContent` saem com `fbq('track', ...)` (eventos padrão). Só os cinco
  eventos nossos usam `fbq('trackCustom', ...)`.
- Os **eventos automáticos do pixel estão desligados**: `fbq('set', 'autoConfig', false, <pixel>)`
  roda antes do `fbq('init', ...)`. O pixel só envia o que está nesta tabela.
- **`InitiateCheckout` e `Purchase` não são disparados pela página.** Eles vêm da Kiwify
  (configurar o pixel na Kiwify).
- Para seções mais altas que a tela (ex.: Vitrine no desktop), "50% visível" também
  vale quando a seção ocupa metade da tela.
- O botão "Garantir acesso" do header só rola até a oferta: não dispara `CliqueCheckout`.
- "1x por sessão" usa `sessionStorage` (chaves `af_trk:*`). Para repetir um teste,
  abra uma aba nova/anônima.

## Teste A/B de preço (ofertas por URL)

Cada oferta tem a sua URL, gerada no build. A página, o checkout, o vídeo da Demo, a
imagem de compartilhamento e o tracking seguem a oferta da URL.

| URL | Oferta | Preço | Checkout (Kiwify) | Uso |
|---|---|---|---|---|
| `/` | `p97` | R$ 97/ano · 12x de R$ 10,03 | `q15UnQk` · `sck=p97` | tráfego orgânico, link da bio |
| `/97` | `p97` | R$ 97/ano · 12x de R$ 10,03 | `q15UnQk` · `sck=p97` | **conjunto de anúncios A** |
| `/127` | `p127` | R$ 127/ano · 12x de R$ 13,14 | `hor8IvC` · `sck=p127` | **conjunto de anúncios B** |

- Nos anúncios, use sempre `/97` ou `/127` (nunca `/`), com as UTMs de costume
  (ex.: `https://<domínio>/127?utm_source=meta&utm_campaign=...&utm_content=...`).
- `/97` e `/127` têm `noindex` e `<link rel="canonical">` para a raiz: não concorrem no Google.
- Qualquer outro caminho (`/99`, `/p97`) dá 404.
- Cada rota tem a própria imagem de Open Graph com o preço (`/127/opengraph-image`).

**Como comparar as ofertas**

- **Meta (Gerenciador de Anúncios):** quebre os resultados por conjunto de anúncios, ou
  crie conversões personalizadas filtrando o parâmetro `oferta` (ex.: `CliqueCheckout`
  com `oferta = p127`).
- **Kiwify:** as vendas vêm de produtos diferentes (`q15UnQk` e `hor8IvC`) e com `sck`
  diferente, então dá pra separar por produto ou por `sck` no relatório de vendas.
- **Clarity:** cada sessão recebe a tag `oferta` (`p97`/`p127`). Em **Filters → Custom tags
  → oferta** você assiste só as gravações de uma oferta.

### Como adicionar uma oferta

1. Em `src/config/site.ts`, dentro de `site.offers`, copie um bloco (ex.: `p127`) com uma
   chave nova (ex.: `p147`) e troque: `id`, `slug` (vira a URL, ex.: `"147"` → `/147`),
   `price`, `anchor`, `installments`, `checkoutUrl` (produto da Kiwify **com** `afid`) e `sck`.
2. Vídeo da Demo próprio (opcional): `demoVideo` apontando para `public/videos/<pasta>/`.
   Se os arquivos não existirem no build, a página usa o vídeo padrão (p97).
3. Rode o build: a rota nova aparece como `● /147` na tabela. Nada mais precisa mudar.
4. Para mudar a oferta da raiz `/`, altere `DEFAULT_OFFER` no `site.ts`.

As rotas são estáticas: qualquer mudança em ofertas ou vídeos só vale depois de um novo deploy.

## Link da Kiwify

O `CheckoutButton` usa o link da oferta da rota (`checkoutUrl`, com `afid`), acrescenta
`sck=<id da oferta>` e repassa da URL atual: `utm_*`, `fbclid` e `src`.

## API de Conversões (`POST /api/meta`)

- Reenvia o evento para `graph.facebook.com/v26.0/<pixel>/events` com o mesmo `event_id`.
- Inclui `event_source_url`, `client_user_agent`, `client_ip_address` (header
  `x-forwarded-for` da Vercel), `fbp` (cookie `_fbp`) e `fbc` (cookie `_fbc`; se não
  existir e houver `fbclid` na URL, monta `fb.1.<timestamp>.<fbclid>`).
- Envia `test_event_code` se `META_TEST_EVENT_CODE` existir.
- Sem `META_CAPI_TOKEN` (ou sem pixel) responde `204` e não faz nada.
- Só aceita os eventos da tabela acima e só chamadas da própria origem.
- Erros da Graph API aparecem nos logs da função na Vercel com o prefixo `[meta-capi]`.

## Como testar no Meta (Gerenciador de Eventos)

1. Em **Gerenciador de Eventos → seu pixel → Testar eventos**, copie o código de teste
   (`TEST…`) e salve em `META_TEST_EVENT_CODE` na Vercel. Confirme que
   `META_PIXEL_ID` e `META_CAPI_TOKEN` estão preenchidas e faça Redeploy.
2. Ainda em "Testar eventos", em **Testar eventos do navegador**, cole a URL da página
   e abra. Navegue: espere 15s, role até o fim, toque no vídeo, clique num CTA.
3. Na lista devem aparecer os eventos da tabela, cada um **duas vezes** (Navegador e
   Servidor) marcados como **Deduplicado**. Se aparecer só "Navegador", o problema está
   no token ou na rota; se aparecer só "Servidor", o Pixel foi bloqueado (adblock).
4. Confira em cada evento do servidor os parâmetros `fbp`, `fbc` (abra a página com
   `?fbclid=teste` na URL), IP e user agent.
5. Em **Visão geral → Qualidade da correspondência**, o ideal é os eventos do servidor
   subirem para "Boa" após alguns dias.
6. **Remova `META_TEST_EVENT_CODE`** e faça Redeploy quando terminar: com ele, os eventos
   do servidor vão só para a tela de teste.

Atalho local: a extensão **Meta Pixel Helper** (Chrome) mostra os eventos do browser e
seus `eventID`.

## Como testar no Clarity

1. Abra a página (sem adblock). No DevTools → Network, filtre por `clarity`: deve haver
   `clarity.ms/tag/<id>` com status 200 e chamadas `collect`.
2. No painel do Clarity, **Recordings** leva alguns minutos (até ~30 min no primeiro uso)
   para listar a sessão. **Dashboard → Live** mostra visitantes em tempo real.
3. Para separar o teste A/B: **Filters → Custom tags → `oferta`** (`p97` ou `p127`).
4. Para filtrar gravações: **Filters → Custom events** e escolha `ViuOferta`,
   `CliqueCheckout`, `CliqueCheckout_<secao>` ou `SecaoVista_<secao>`. Em
   **Custom tags**, `checkout_secao` mostra de onde veio o clique.
5. O mascaramento é o padrão do Clarity (campos de formulário e conteúdo sensível
   mascarados). Nada foi alterado no código.

## Onde está o código

- `src/lib/tracking/` — config (inclui a oferta atual), tipos de evento, Pixel (`meta.ts`, anexa `oferta`), Clarity, "uma vez por sessão" e as funções de alto nível (`index.ts`).
- `src/components/offer-context.tsx` — oferta da rota para as seções; informa a oferta ao tracking e ao Clarity.
- `src/components/tracking/tracking-scripts.tsx` — scripts de terceiros via `next/script`.
- `src/components/tracking/page-tracker.tsx` — PageView, ViewContent, Rolagem, SecaoVista.
- `src/app/api/meta/route.ts` — API de Conversões.
- `src/components/checkout-button.tsx` e `src/components/sections/demo.tsx` — CliqueCheckout e VideoDemo.
