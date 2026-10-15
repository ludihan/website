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
  text: Record<Locale, { tagline: string; period: string; description: string; features: string[] }>;
};

export const projects: Project[] = [
  {
    id: "noise",
    name: "noise",
    repo: "https://github.com/ludihan/noise",
    license: "GPL-3.0",
    stack: ["Rust", "egui/eframe", "cpal", "midir", "serde"],
    screenshots: [
      {
        src: "https://raw.githubusercontent.com/ludihan/noise/main/docs/main.png",
        width: 1400,
        height: 900,
        alt: { en: "noise pattern editor playing the demo song", pt: "Editor de padrões do noise tocando a música demo" },
      },
      {
        src: "https://raw.githubusercontent.com/ludihan/noise/main/docs/sampler.png",
        width: 1400,
        height: 900,
        alt: { en: "noise sampler", pt: "Sampler do noise" },
      },
      {
        src: "https://raw.githubusercontent.com/ludihan/noise/main/docs/mixer.png",
        width: 1400,
        height: 900,
        alt: { en: "noise mixer", pt: "Mixer do noise" },
      },
      {
        src: "https://raw.githubusercontent.com/ludihan/noise/main/docs/automation.png",
        width: 1400,
        height: 900,
        alt: { en: "noise automation editor", pt: "Editor de automação do noise" },
      },
    ],
    text: {
      en: {
        tagline: "A music tracker with modular synths",
        period: "Oct. 2026 – present",
        description:
          "A music tracker with modular synths, written in Rust. Notes in the pattern go straight to synth modules, and each instrument's sound goes through a chain of effect modules.",
        features: [
          "Pattern editor with multiple note and effect columns, block edits, MIDI input and effect commands",
          "Over 40 synth and effect modules, plus track effects, a master chain and a mixer",
          "Sampler with keyzones, a slicer and envelopes, loading WAV, FLAC, Ogg Vorbis and SF2/SF3/SFZ soundfonts",
          "Automation, phrases, presets, and rendering the song or its stems to WAV",
        ],
      },
      pt: {
        tagline: "Um tracker musical com sintetizadores modulares",
        period: "out. 2026 – atual",
        description:
          "Um tracker musical com sintetizadores modulares, escrito em Rust. As notas do padrão vão direto para módulos de síntese, e o som de cada instrumento passa por uma cadeia de módulos de efeito.",
        features: [
          "Editor de padrões com várias colunas de notas e efeitos, edição em bloco, entrada MIDI e comandos de efeito",
          "Mais de 40 módulos de síntese e efeito, além de efeitos por trilha, cadeia master e mixer",
          "Sampler com keyzones, slicer e envelopes, carregando WAV, FLAC, Ogg Vorbis e soundfonts SF2/SF3/SFZ",
          "Automação, frases, presets e renderização da música ou de stems em WAV",
        ],
      },
    },
  },
  {
    id: "atrium",
    name: "atrium",
    repo: "https://github.com/ludihan/atrium",
    license: "AGPL-3.0",
    stack: ["Elixir", "Phoenix LiveView", "Ecto", "SQLite", "Jev"],
    screenshots: [
      {
        src: "https://raw.githubusercontent.com/ludihan/atrium/main/docs/chat.png",
        width: 1100,
        height: 650,
        alt: { en: "atrium chat", pt: "Chat do atrium" },
      },
      {
        src: "https://raw.githubusercontent.com/ludihan/atrium/main/docs/nick-prompt.png",
        width: 1100,
        height: 650,
        alt: { en: "atrium nick prompt", pt: "Escolha de nick no atrium" },
      },
    ],
    text: {
      en: {
        tagline: "A small IRC-style chat server",
        period: "2026 – present",
        description:
          "A chat in the spirit of IRC: pick a nick, hop between channels and talk. Built with Phoenix LiveView and SQLite, so there is no database server to run.",
        features: [
          "The whole UI is a single LiveView, with messages arriving live through PubSub",
          "Slash commands: /join, /nick, /me and /help",
          "SQLite in WAL mode, so many people can write at once without losing messages",
          "Optional AI moderation powered by Jev, which can flag or hold messages before they reach a channel",
        ],
      },
      pt: {
        tagline: "Um pequeno servidor de chat estilo IRC",
        period: "2026 – atual",
        description:
          "Um chat no espírito do IRC: escolha um nick, navegue entre canais e converse. Feito com Phoenix LiveView e SQLite, sem precisar de servidor de banco de dados.",
        features: [
          "Toda a interface é uma única LiveView, com mensagens chegando ao vivo via PubSub",
          "Comandos com barra: /join, /nick, /me e /help",
          "SQLite em modo WAL, para muita gente escrever ao mesmo tempo sem perder mensagens",
          "Moderação por IA opcional, com o Jev, que pode sinalizar ou reter mensagens antes de chegarem ao canal",
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
        src: "https://raw.githubusercontent.com/ludihan/inv/main/docs/screenshots/home.png",
        width: 416,
        height: 1000,
        alt: { en: "inv dashboard", pt: "Dashboard do inv" },
      },
      {
        src: "https://raw.githubusercontent.com/ludihan/inv/main/docs/screenshots/items.png",
        width: 416,
        height: 1000,
        alt: { en: "inv items list", pt: "Lista de itens do inv" },
      },
      {
        src: "https://raw.githubusercontent.com/ludihan/inv/main/docs/screenshots/companies.png",
        width: 416,
        height: 1000,
        alt: { en: "inv companies and sectors", pt: "Empresas e setores no inv" },
      },
    ],
    text: {
      en: {
        tagline: "Local-first inventory management",
        period: "Jul. 2026 – present",
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
        period: "jul. 2026 – atual",
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
];
