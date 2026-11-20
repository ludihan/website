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
          "A music tracker with modular synths, written in Rust. Notes in the pattern go straight to synth modules, and each instrument’s sound goes through a chain of effect modules.",
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
    id: "zemu",
    name: "zemu",
    repo: "https://github.com/ludihan/zemu",
    license: "AGPL-3.0",
    stack: ["Odin", "SDL3", "libretro", "Emscripten"],
    screenshots: [
      {
        src: "https://raw.githubusercontent.com/ludihan/zemu/main/docs/screenshots/desktop-menu.png",
        width: 768,
        height: 672,
        alt: { en: "zemu’s GAME menu open over a paused game", pt: "Menu GAME do zemu aberto sobre um jogo pausado" },
      },
      {
        src: "https://raw.githubusercontent.com/ludihan/zemu/main/docs/screenshots/desktop-cores.png",
        width: 768,
        height: 672,
        alt: { en: "zemu’s CORES window listing cores to download", pt: "Janela CORES do zemu listando cores para baixar" },
      },
      {
        src: "https://raw.githubusercontent.com/ludihan/zemu/main/docs/screenshots/desktop-game.png",
        width: 768,
        height: 672,
        alt: { en: "2048 running in zemu", pt: "2048 rodando no zemu" },
      },
    ],
    text: {
      en: {
        tagline: "A libretro frontend in the style of ZSNES",
        period: "Nov. 2026 – present",
        description:
          "A frontend for libretro emulator cores, written in Odin, with an interface in the style of ZSNES: pixel font, blue gradient windows, the menu bar and falling snow. The whole interface is drawn directly with the SDL3 renderer, with no GUI library, at a low resolution scaled by whole pixels, so bigger windows get more room rather than bigger pixels.",
        features: [
          "Runs on Linux, Windows, macOS, Android and the web, where cores are built to WebAssembly and loaded with dlopen",
          "Downloads, updates and removes cores from the libretro buildbot, searchable by name, system or file extension",
          "A touch interface for phones, with bottom tabs, action sheets and an on-screen gamepad for portrait or landscape",
          "Save RAM, ten save state slots, fast forward, core options, cheats, rumble and rebindable gamepads",
        ],
      },
      pt: {
        tagline: "Um frontend libretro no estilo do ZSNES",
        period: "nov. 2026 – atual",
        description:
          "Um frontend para cores de emulação libretro, escrito em Odin, com uma interface no estilo do ZSNES: fonte pixelada, janelas com degradê azul, a barra de menus e a neve caindo. Toda a interface é desenhada direto com o renderizador do SDL3, sem biblioteca de GUI, em baixa resolução e ampliada por pixels inteiros, então janelas maiores ganham mais espaço em vez de pixels maiores.",
        features: [
          "Roda em Linux, Windows, macOS, Android e na web, onde os cores são compilados para WebAssembly e carregados com dlopen",
          "Baixa, atualiza e remove cores do buildbot do libretro, com busca por nome, sistema ou extensão de arquivo",
          "Uma interface de toque para celulares, com abas inferiores, menus de ação e um controle na tela para retrato ou paisagem",
          "Save RAM, dez slots de save state, avanço rápido, opções de core, trapaças, vibração e controles remapeáveis",
        ],
      },
    },
  },
  {
    id: "inci",
    name: "inci",
    repo: "https://github.com/ludihan/inci",
    license: "MIT",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "SQLite"],
    screenshots: [
      {
        src: "https://raw.githubusercontent.com/ludihan/inci/main/docs/screenshots/home.png",
        width: 1440,
        height: 900,
        alt: { en: "inci home page", pt: "Página inicial do inci" },
      },
      {
        src: "https://raw.githubusercontent.com/ludihan/inci/main/docs/screenshots/admin-dashboard.png",
        width: 1440,
        height: 900,
        alt: { en: "inci admin dashboard", pt: "Painel administrativo do inci" },
      },
      {
        src: "https://raw.githubusercontent.com/ludihan/inci/main/docs/screenshots/admin-tickets.png",
        width: 1440,
        height: 900,
        alt: { en: "inci ticket list", pt: "Lista de chamados do inci" },
      },
      {
        src: "https://raw.githubusercontent.com/ludihan/inci/main/docs/screenshots/admin-ticket-detail.png",
        width: 1440,
        height: 900,
        alt: { en: "inci ticket detail", pt: "Detalhe de um chamado no inci" },
      },
    ],
    text: {
      en: {
        tagline: "Support tickets and anonymous reports",
        period: "Jul. 2026 – present",
        description:
          "A web system for IT and maintenance support tickets and anonymous reports, with an admin panel, in Portuguese and English.",
        features: [
          "Tickets are tracked by registration number, stored only as an HMAC hash",
          "Anonymous reports with a tracking code and anonymous follow-ups",
          "Admin dashboard with statistics filterable by period, type and unit",
          "PDF reports and service orders, with an item and service catalog for each ticket’s cost",
        ],
      },
      pt: {
        tagline: "Chamados de suporte e denúncias anônimas",
        period: "jul. 2026 – atual",
        description:
          "Um sistema web de chamados de suporte (TI e manutenção) e denúncias anônimas, com painel administrativo, em português e inglês.",
        features: [
          "Chamados rastreados por matrícula, armazenada apenas como hash HMAC",
          "Denúncias anônimas com código de acompanhamento e respostas anônimas",
          "Dashboard administrativo com estatísticas filtráveis por período, tipo e unidade",
          "Relatórios e ordens de serviço em PDF, com catálogo de itens e serviços para o custo de cada chamado",
        ],
      },
    },
  },
];
