# Links, botões e checkout — landing-consultor

Capturado em 2026-10-06. A página roda um **teste A/B de preço** (chave `mc.ab_preco` no
localStorage): cada visitante novo cai numa das duas variantes e o link do checkout muda junto.

## Checkout (Kiwify)

| Variante | Preço | CTA | URL |
|---|---|---|---|
| A | R$ 127/ano ("menos de R$ 10,60 por mês") | Assinar anual | https://pay.kiwify.com.br/hor8IvC?utm_content=landing-consultor&sck=p127 |
| B | R$ 97/ano ("menos de R$ 8,10 por mês") | Assinar anual | https://pay.kiwify.com.br/q15UnQk?utm_content=landing-consultor&sck=p97 |

- São **dois produtos diferentes na Kiwify** (`hor8IvC` e `q15UnQk`), não um produto com cupom.
- Parâmetros: `utm_content=landing-consultor` e `sck=p127` / `sck=p97` (rastreio da Kiwify).
- **Não há parâmetro de afiliado (`afid`) nem de consultor** em nenhum link.
- O nosso checkout (site.ts) é outro produto: `https://pay.kiwify.com.br/aZ9JtZL?afid=XH9VD8ii`.

## Links de navegação

| Texto | Destino | Onde |
|---|---|---|
| Quero o acesso | `#planos` (rola até os planos) | header, hero e footer |
| Já tenho conta | https://planilha.multicap.com.br/login | hero |
| Entrar | https://planilha.multicap.com.br/login | footer |
| Termos de Uso | https://planilha.multicap.com.br/termos | footer |
| Política de Privacidade | https://planilha.multicap.com.br/privacidade | footer |

## App Store e Google Play

- Selos oficiais (`/badges/app-store-pt-br.svg` e `/badges/google-play-pt-br.png`) aparecem
  **duas vezes**: abaixo do celular no hero e na seção "Seu dinheiro no bolso".
- **Não são links**: imagens sem `<a>`, sem `onclick`, cursor padrão. Clicar não faz nada.
- Texto alternativo: "Disponível na App Store" / "Disponível no Google Play".

## Botões (sem navegação)

- "Assistir depoimento" (3x), "Depoimento anterior", "Próximo depoimento" — carrossel de vídeos.

## Scripts de terceiros

- Meta Pixel `2478855339243293` (fbevents.js, PageView automático)
- Microsoft Clarity `xcar75yxqy`
- Google Fonts: Plus Jakarta Sans 400–800
