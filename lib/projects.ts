import type { Locale } from "./i18n";

export type Screenshot = {
  src: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
};

export type Project = {
  id: string;
  name: string;
  repo: string;
  license: string;
  stack: string[];
  screenshots: Screenshot[];
  text: Record<Locale, { tagline: string; description: string; features: string[] }>;
};

export const projects: Project[] = [
  {
    id: "inci",
    name: "Inci",
    repo: "https://github.com/ludihan/inci",
    license: "AGPL-3.0",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "SQLite", "react-pdf"],
    screenshots: [
      {
        src: "/projects/inci/home.png",
        width: 1440,
        height: 900,
        alt: { en: "Inci home page", pt: "Página inicial do Inci" },
      },
      {
        src: "/projects/inci/admin-dashboard.png",
        width: 1440,
        height: 900,
        alt: { en: "Inci admin dashboard", pt: "Painel administrativo do Inci" },
      },
      {
        src: "/projects/inci/admin-tickets.png",
        width: 1440,
        height: 900,
        alt: { en: "Inci ticket list in the admin panel", pt: "Lista de chamados no painel do Inci" },
      },
    ],
    text: {
      en: {
        tagline: "Support tickets and anonymous reports",
        description:
          "A web system for IT and maintenance support tickets and anonymous reports, with an admin panel, tracking by registration number and a bilingual interface.",
        features: [
          "Tickets with photos, and fully anonymous reports that get a tracking code",
          "Tracking by registration number: only an HMAC hash is stored, never the raw value",
          "Admin dashboard with filters by period, type and unit",
          "PDF reports and service orders, resolved per unit and service provider",
        ],
      },
      pt: {
        tagline: "Chamados de suporte e denúncias anônimas",
        description:
          "Sistema web de chamados de suporte (TI e manutenção) e denúncias anônimas, com painel administrativo, rastreamento por matrícula e interface bilíngue.",
        features: [
          "Chamados com fotos e denúncias totalmente anônimas, com código de rastreio",
          "Rastreamento por matrícula: só um hash HMAC é armazenado, nunca o valor original",
          "Dashboard administrativo com filtros por período, tipo e unidade",
          "Relatórios em PDF e ordens de serviço, resolvidas por unidade e empresa prestadora",
        ],
      },
    },
  },
  {
    id: "inv",
    name: "inv",
    repo: "https://github.com/ludihan/inv",
    license: "MIT",
    stack: ["Expo", "React Native", "Expo Router", "TypeScript", "AsyncStorage"],
    screenshots: [
      {
        src: "/projects/inv/home.png",
        width: 416,
        height: 1000,
        alt: { en: "inv dashboard", pt: "Dashboard do inv" },
      },
      {
        src: "/projects/inv/items.png",
        width: 416,
        height: 1000,
        alt: { en: "inv items list", pt: "Lista de itens do inv" },
      },
      {
        src: "/projects/inv/companies.png",
        width: 416,
        height: 1000,
        alt: { en: "inv companies and sectors", pt: "Empresas e setores no inv" },
      },
    ],
    text: {
      en: {
        tagline: "Local-first inventory management",
        description:
          "A mobile inventory app for tracking items grouped by company and sector, with values in Brazilian Reais. Everything is stored on the device, with no backend.",
        features: [
          "Dashboard with total value, low-stock alerts and value share per company",
          "Search, filters and quick stock adjustment right on each item",
          "Data moves between devices through CSV export and import",
          "Light and dark themes, in English and Portuguese",
        ],
      },
      pt: {
        tagline: "Controle de estoque local-first",
        description:
          "App mobile de inventário para acompanhar itens agrupados por empresa e setor, com valores em reais. Tudo fica salvo no dispositivo, sem backend.",
        features: [
          "Dashboard com valor total, alertas de estoque baixo e participação por empresa",
          "Busca, filtros e ajuste rápido de estoque direto em cada item",
          "Dados passam entre dispositivos por exportação e importação de CSV",
          "Temas claro e escuro, em português e inglês",
        ],
      },
    },
  },
  {
    id: "atrium",
    name: "atrium",
    repo: "https://github.com/ludihan/atrium",
    license: "AGPL-3.0",
    stack: ["Elixir", "Phoenix LiveView", "Ecto", "SQLite"],
    screenshots: [
      {
        src: "/projects/atrium/chat.png",
        width: 1100,
        height: 650,
        alt: { en: "atrium chat", pt: "Chat do atrium" },
      },
      {
        src: "/projects/atrium/nick-prompt.png",
        width: 1100,
        height: 650,
        alt: { en: "atrium nick prompt", pt: "Escolha de nick no atrium" },
      },
    ],
    text: {
      en: {
        tagline: "A small IRC-style chat server",
        description:
          "A chat in the spirit of IRC: pick a nick, hop between channels and talk. Built with Phoenix LiveView and SQLite, so there is no database server to run.",
        features: [
          "The whole UI is a single LiveView, with messages arriving live through PubSub",
          "Slash commands: /join, /nick, /me and /help",
          "SQLite in WAL mode, so many people can write at once without losing messages",
        ],
      },
      pt: {
        tagline: "Um pequeno servidor de chat estilo IRC",
        description:
          "Um chat no espírito do IRC: escolha um nick, navegue entre canais e converse. Feito com Phoenix LiveView e SQLite, sem precisar de servidor de banco de dados.",
        features: [
          "Toda a interface é uma única LiveView, com mensagens chegando ao vivo via PubSub",
          "Comandos com barra: /join, /nick, /me e /help",
          "SQLite em modo WAL, para muita gente escrever ao mesmo tempo sem perder mensagens",
        ],
      },
    },
  },
];
