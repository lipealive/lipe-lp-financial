/**
 * Fonte única da verdade para dados da oferta.
 * Nenhum preço, link ou ID de vídeo pode aparecer fora deste arquivo.
 * Todos os valores abaixo são PLACEHOLDERS até a oferta final ser definida.
 */

export type VideoAspect = "16:9" | "9:16";

export const site = {
  /** Marca (metadata, título da aba). */
  name: "Alive Finance",
  /** Nome do produto como aparece nos textos da página. Trocar aqui muda a página inteira. */
  productName: "Alive Finance",
  /** Linha de apoio ao nome. Vazio = não exibe. */
  byline: "by MultiCap",
  /** Empresa (copyright, "by"). */
  company: "MultiCap",
  tagline: "Planilha financeira inteligente, no seu celular e no computador.",
  description:
    "A planilha financeira do Lipe, online: orçamento, visão geral, reserva de emergência e metas no celular e no computador.",
  url: "https://multicap.com.br",
  appUrl: "https://planilha.multicap.com.br",
  /** Domínio exibido na barra do mockup de navegador. */
  appHost: "planilha.multicap.com.br",

  /** Screenshots em public/images/app/{light,dark}/<key>.png */
  screens: {
    /** Existem versões escuras dos prints? Controla o toggle Claro/Escuro. */
    hasDarkScreens: false,
    /** Proporção dos prints (largura / altura). */
    aspect: 3318 / 1838,
    /** Quais prints já existem na pasta light/. Os que faltam mostram um placeholder. */
    available: {
      "visao-geral": true,
      orcamento: true,
      reserva: true,
      mobile: false,
    },
  },
  locale: "pt-BR",

  author: {
    name: "Lipe",
    instagram: "https://www.instagram.com/lipe.alive/",
    youtube: "https://www.youtube.com/@LipeAlive",
  },

  /** Bloco compacto "Criado por" */
  lipe: {
    name: "Lipe",
    handle: "@lipe.alive",
    tagline: "O irmão mais velho que você não teve.",
    line: "Engenheiro civil pela UFBA, fala sobre sair da zona de conforto e assumir o controle da própria vida — inclusive do dinheiro.",
    /** Números com count-up. `value` em unidades; `unit` é o sufixo exibido; `href` abre o perfil. */
    stats: [
      { value: 1.7, decimals: 1, unit: "mi", label: "no Instagram", href: "https://www.instagram.com/lipe.alive/" },
      { value: 44.9, decimals: 1, unit: "mil", label: "no YouTube", href: "https://www.youtube.com/@LipeAlive" },
    ],
    signature: "Stay Alive",
  },

  offer: {
    /** Preço à vista, por ano (BRL). */
    price: 67,
    /** Período coberto pelo preço. */
    period: "ano",
    currency: "BRL",
    installments: {
      count: 12,
      value: 6.93,
    },
    /** Âncora de preço usada na copy. */
    anchor: "menos de R$ 7 por mês",
    /** Duração do acesso, como aparece na oferta. */
    accessLabel: "acesso por 1 ano",
    /** O que está incluso (card de preço). */
    includes: [
      "Orçamento completo",
      "Visão geral e gráficos",
      "Reserva de emergência",
      "Metas",
      "Investimentos e patrimônio",
      "13 aulas de educação financeira + ebooks em PDF",
      "5 calculadoras financeiras",
      "Celular e computador",
      "Modo claro e escuro",
    ],
    /** Formas de pagamento exibidas abaixo do botão. */
    payment: ["Cartão", "Pix", "Boleto"],
    checkoutUrl: "https://pay.kiwify.com.br/aZ9JtZL?afid=XH9VD8ii",
  },

  /** Escola: 13 aulas de educação financeira (não são do Lipe), cada uma com ebook em PDF. */
  school: {
    total: 13,
    /** Aulas exibidas na pilha do card "Escola" (rotacionam). */
    featured: [
      { n: 1, title: "Vivendo uma vida alugada" },
      { n: 6, title: "Juros compostos" },
      { n: 7, title: "Reserva de emergência" },
      { n: 9, title: "Como lidar com dívidas" },
      { n: 10, title: "Cartão de crédito" },
    ],
    footer: "+8 aulas · ebook em PDF em cada aula",
  },

  /** Perguntas frequentes. `cta: "whatsapp"` anexa o link de suporte à resposta. */
  faq: [
    { q: "Como recebo o acesso?", a: "Logo após a compra você recebe por e-mail o acesso à plataforma." },
    { q: "Funciona no celular?", a: "Sim, no celular e no computador, direto pelo navegador." },
    { q: "Preciso saber Excel?", a: "Não. Tudo é calculado automaticamente." },
    { q: "Por quanto tempo tenho acesso?", a: "1 ano. No checkout também dá pra garantir a versão vitalícia." },
    { q: "Preciso conectar minha conta do banco?", a: "Não. Você lança seus gastos ou importa o extrato." },
    { q: "Quais as formas de pagamento?", a: "Cartão em até 12x, Pix e boleto." },
    { q: "E se eu tiver dúvida?", a: "Nosso suporte responde pelo WhatsApp:", cta: "whatsapp" as const },
  ],

  vturb: {
    /**
     * ID da conta no VTurb: o UUID que aparece no embed, em
     * https://scripts.converteai.net/<accountId>/players/<playerId>/v4/player.js
     */
    accountId: "",
    /** ID do player da VSL principal (vazio = placeholder "VSL em breve"). */
    vslId: "",
    /** ID do player da demo do app. */
    demoId: "",
    /** Proporção da VSL: "16:9" (horizontal) ou "9:16" (vertical). */
    vslAspect: "16:9" as VideoAspect,
  },

  support: {
    /** Somente dígitos, com DDI, para montar links wa.me. */
    whatsapp: "5531982992164",
    whatsappDisplay: "+55 31 8299-2164",
    whatsappMessage: "Olá! Tenho uma dúvida sobre a Alive Finance.",
  },
} as const;

export type Site = typeof site;

export function formatPrice(value: number, currency: string = site.offer.currency) {
  return new Intl.NumberFormat(site.locale, {
    style: "currency",
    currency,
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export function whatsappUrl(message: string = site.support.whatsappMessage) {
  return `https://wa.me/${site.support.whatsapp}?text=${encodeURIComponent(message)}`;
}
