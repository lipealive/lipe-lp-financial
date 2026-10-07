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
  /** Linha de disponibilidade (informativa, sem link para as lojas). */
  availability: "Disponível na App Store e no Google Play",
  tagline: "Planilha financeira inteligente, no seu celular e no computador.",
  description:
    "A planilha financeira do Lipe, agora em app: orçamento, visão geral, reserva de emergência e metas no app (iPhone e Android) ou no navegador do computador.",
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
    /** Preço por ano (BRL). */
    price: 97,
    /** Período coberto pelo preço. */
    period: "ano",
    currency: "BRL",
    /** Âncora de preço usada na copy (título da oferta, CTA final, OG). */
    anchor: "menos de R$ 8,10 por mês",
    /** Condição de pagamento, sem valor de parcela. */
    paymentLabel: "à vista ou parcelado no cartão",
    /** Duração do acesso, como aparece na oferta. */
    accessLabel: "acesso por 1 ano",
    /** O que está incluso (card de preço). */
    includes: [
      "Consultor com IA no WhatsApp",
      "Orçamento completo",
      "Visão geral e gráficos",
      "Reserva de emergência",
      "Metas",
      "Investimentos e patrimônio",
      "13 aulas de educação financeira + ebooks em PDF",
      "5 calculadoras financeiras",
      "App para iPhone e Android",
      "Navegador do computador",
      "Modo claro e escuro",
    ],
    /** Formas de pagamento exibidas abaixo do botão. */
    payment: ["Cartão", "Pix", "Boleto"],
    checkoutUrl: "https://pay.kiwify.com.br/aZ9JtZL?afid=XH9VD8ii",
  },

  /** Seção "Consultor no WhatsApp" */
  consultor: {
    eyebrow: "Novidade",
    title: "Mandou um áudio, tá lançado.",
    subtitle:
      "O Consultor MultiCap é uma inteligência artificial que registra seus gastos e responde suas dúvidas pelo WhatsApp.",
    /** Conversa do celular (loop). `kind`: text | audio | image. */
    chat: [
      { from: "user", kind: "text", text: "Gastei 87 no mercado" },
      { from: "bot", kind: "text", text: "Lançado ✓ Mercado · R$ 87,00" },
      { from: "user", kind: "audio", text: "0:04" },
      { from: "bot", kind: "text", text: "Lançado ✓ Uber · R$ 23,50" },
      { from: "user", kind: "image", text: "Comprovante · farmácia" },
      { from: "bot", kind: "text", text: "Lançado ✓ Farmácia · R$ 64,90" },
      { from: "user", kind: "text", text: "Comprei uma geladeira de 3.600 em 12 vezes" },
      { from: "bot", kind: "text", text: "Parcelado ✓ 12x de R$ 300,00" },
      { from: "user", kind: "text", text: "Quanto gastei com restaurante esse mês?" },
      { from: "bot", kind: "text", text: "R$ 412,30, 18% a menos que agosto 👏" },
    ] as { from: "user" | "bot"; kind: "text" | "audio" | "image"; text: string }[],
    features: [
      "Texto, áudio ou foto do comprovante",
      "Lança receitas, despesas, parcelas, metas e investimentos",
      "Responde perguntas sobre o seu dinheiro, com gráfico",
      "Te lembra de boletos e faturas",
    ],
    /** Bloco "Pergunte e receba a resposta com gráfico." */
    ask: {
      title: "Pergunte e receba a resposta com gráfico.",
      text: "Ele lê os seus próprios números e responde na hora. Quando faz sentido, o gráfico vem junto.",
      examples: [
        "Quanto gastei por categoria esse mês?",
        "Meu saldo está melhor que no mês passado?",
        "Quanto falta pra minha meta da viagem?",
      ],
      /** Print real do app (1100x1330). */
      image: { src: "/images/app/consultor/consultor-resposta-grafico.png", width: 1100, height: 1330 },
      badge: "Print real do app",
    },
    /** Faixa "Ativa em menos de 1 minuto" */
    activate: {
      title: "Ativa em menos de 1 minuto",
      steps: ["Informe seu WhatsApp", "Mande o código que aparece na tela", "Pronto: é só conversar"],
      note: "Prefere não usar o WhatsApp? O chat também funciona dentro do app.",
    },
  },

  /** Seção Demo: animação de 45s (vídeo nativo, não VTurb). */
  demo: {
    eyebrow: "Em 45 segundos",
    title: "Pra onde vai o seu dinheiro?",
    highlight: "Agora você vê.",
    subtitle: "Do salário ao saldo real: veja como a Alive Finance mostra cada centavo.",
    video: {
      /** Versão otimizada pra web (H.264, crf 26, faststart). */
      src: "/videos/alive-finance-16x9.web.mp4",
      /** Quadro do título "Dinheiro não some." */
      poster: "/videos/alive-finance-16x9.poster.jpg",
      width: 1920,
      height: 1080,
    },
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
    { q: "Como recebo o acesso?", a: "Logo após a compra você recebe por e-mail o seu acesso. É o mesmo login no app e no navegador." },
    {
      q: "Funciona no celular?",
      a: "Sim. Tem app para iPhone e Android, funciona no navegador do computador e ainda dá pra lançar pelo WhatsApp com o Consultor.",
    },
    {
      q: "Como acesso depois de comprar?",
      a: "Você garante seu acesso aqui pela página. Depois é só entrar no app MultiCap (App Store ou Google Play) ou no navegador com o mesmo e-mail da compra.",
    },
    {
      q: "Como funciona o Consultor no WhatsApp?",
      a: "Dentro da plataforma você cadastra seu número e ativa o Consultor. Daí é só mandar mensagem, áudio ou foto do comprovante que ele registra pra você. Tudo pode ser desfeito.",
    },
    { q: "Preciso saber Excel?", a: "Não. Tudo é calculado automaticamente." },
    { q: "Por quanto tempo tenho acesso?", a: "1 ano de acesso." },
    { q: "Preciso conectar minha conta do banco?", a: "Não. Você lança seus gastos no app, pelo WhatsApp com o Consultor ou importando o extrato." },
    { q: "Quais as formas de pagamento?", a: "Cartão de crédito (à vista ou parcelado), Pix e boleto." },
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
