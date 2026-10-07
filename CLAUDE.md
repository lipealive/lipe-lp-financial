@AGENTS.md

# Alive Finance (by MultiCap) — Landing page de vendas

## Contexto
- Site: **https://finance.lipealive.com.br** (`site.url`, usado em canonical e Open Graph). `planilha.multicap.com.br` é o app/login da MultiCap, não o nosso site.
- Produto: **Alive Finance**, a planilha financeira do Lipe, feita pela MultiCap. Disponível como app (App Store e Google Play) e no navegador do computador (https://planilha.multicap.com.br). Frase padrão: "No app (iPhone e Android) ou no navegador do computador."
- A página pode citar as lojas, mas **NUNCA linka para elas** e não usa "baixe agora" em CTA: a compra tem que passar pelo nosso checkout (link de afiliado). A linha de disponibilidade é o componente `AvailabilityStrip` (informativa, sem link).
- Nome do produto vem SEMPRE de `site.productName` (e `site.company` para a MultiCap). Kit de marca em `public/images/brand/alive-finance-brand/` (ler o LEIAME). Regra do ponto: verde no claro, magenta (#E6338A) no escuro, via token `--dot`.
- As 13 aulas da Escola NÃO são do Lipe: dizer "13 aulas de educação financeira".
- Objetivo da página: converter tráfego de **Meta Ads (Instagram, celular)** em compras.
- Checkout: **Kiwify**. Vídeos: VSL do hero em `<video>` próprio (`site.vsl`, VTurb pronto mas desligado) e Demo em `<video>` próprio. Tracking: Meta Pixel + Conversions API (CAPI) e Clarity.
- Stack: Next.js 16 (App Router, `src/`), Tailwind v4, shadcn/ui (radix, base neutral), registry `@bklit`, `motion` (`import ... from "motion/react"`), `lucide-react`.
- Fonte: Plus Jakarta Sans (next/font, pesos 400–800) exposta como `--font-plus-jakarta` → `font-sans`.

## Regras do projeto
1. **Mobile-first.** Escreva primeiro para 390px de largura e só depois adicione breakpoints (`sm:`, `md:`...). Sempre testar em 390px.
2. **Animações leves** e sempre respeitando `prefers-reduced-motion`. Use os wrappers de `src/components/motion/` (`FadeIn`, `Stagger`/`StaggerItem`) em vez de instanciar `motion.*` solto nas seções. Nada de animações pesadas em scroll/parallax.
3. **Todas as imagens via `next/image`.** Screenshots do app ficam em `public/images/app/{light,dark}/` (visao-geral, reserva, orcamento, mobile .png); fotos do Lipe em `public/images/lipe/`; logo em `public/images/brand/`.
4. **Nenhum texto de oferta fora de `src/config/site.ts`**: preço, parcelas, link do checkout Kiwify, IDs do VTurb, WhatsApp de suporte. Nunca hardcode.
5. **Teste A/B por URL: preço × versão.** Ofertas em `site.offers` (`p97`, `p127`) × versões `Versao` (`"vsl"` = VSL vertical no hero, `"sv"` = print do app no lugar do vídeo). Rotas estáticas via `src/app/[oferta]/page.tsx` (`VARIANTS`, `dynamicParams = false`): `/97`, `/127` (vsl), `/97-sv`, `/127-sv` (sv). A raiz `/` = `DEFAULT_OFFER` + `DEFAULT_VERSAO` (p97 + vsl). A página inteira é `src/components/landing-page.tsx` (`offerId` + `versao`).
   - **Componentes client leem a variação com `useOffer()`** (traz `versao`, `path` e `checkoutSck`); componentes server recebem `offer` por prop. Não existe oferta global.
   - Só o hero muda entre versões; o resto da página é igual. VSL em `site.vsl` (`provider` `"native"` | `"vturb"`), componente `src/components/vsl-player.tsx`.
   - Todos os eventos do pixel levam `oferta` e `versao`; o Clarity recebe as tags `oferta` e `versao`. Checkout com `sck=<oferta>-<versao>` e `afid`.
   - Canonical de cada rota aponta para ela mesma; `/97`, `/127`, `/97-sv`, `/127-sv` têm `noindex`.
   - URLs dos anúncios, como comparar e como adicionar uma oferta: ver `TRACKING.md`.
6. **Tema por tokens** em `src/app/globals.css`. Página clara por padrão; seções escuras de contraste envolvidas por `.section-dark` (troca os tokens e ativa `dark:`). Use classes semânticas (`bg-background`, `bg-card`, `text-muted-foreground`, `bg-primary`, `bg-gold`, `bg-brand-gradient`, `text-brand-gradient`); nunca hex solto em componentes.
7. Radius: cards 16px (`rounded-lg` = `--radius`), botões/pills 999px (`rounded-full`). Os componentes shadcn já vêm ajustados.
8. Variáveis de ambiente em `.env.example` (`META_PIXEL_ID`, `META_CAPI_TOKEN`, `META_TEST_EVENT_CODE`, `CLARITY_ID`). Nenhuma usa `NEXT_PUBLIC_`: os IDs são lidos no layout (servidor) e passados por props. Vazias = tracking desligado, sem erro. A página nunca dispara InitiateCheckout nem Purchase (vêm da Kiwify). Token da CAPI só em server (route handler).
9. Textos da página em pt-BR; `lang="pt-BR"` no layout.

## Estrutura
- `src/app/` — layout, page e globals.css
- `src/components/landing-page.tsx` — a landing completa para uma oferta (usada por `/` e `/[oferta]`)
- `src/components/offer-context.tsx` — `OfferProvider` / `useOffer()`
- `src/components/sections/` — uma seção por arquivo
- `src/components/motion/` — wrappers reutilizáveis de animação
- `src/components/ui/` — shadcn/ui (gerado pela CLI; `npx shadcn@latest add <nome>` ou `@bklit/<nome>`)
- `src/config/site.ts` — dados das ofertas e do produto (fonte única); `src/config/offer-page.ts` resolve a oferta da página no servidor
- `src/lib/tracking/` — Meta Pixel + CAPI e Clarity (ver `TRACKING.md`). Eventos novos entram em `events.ts` e `index.ts`; a rota `/api/meta` só aceita os nomes listados em `ALLOWED_EVENTS`.
- `public/images/{app/light,app/dark,lipe,brand}/`

## Comandos
- `npm run dev` · `npm run build` · `npm run lint`
