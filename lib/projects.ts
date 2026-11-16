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
    stack: ["Odin", "SDL3"],
    screenshots: [
      {
        src: "https://raw.githubusercontent.com/ludihan/zemu/main/docs/screenshots/desktop.png",
        width: 1280,
        height: 720,
        alt: { en: "zemu menu bar over its falling-snow desktop", pt: "Barra de menus do zemu sobre a área de trabalho com neve caindo" },
      },
      {
        src: "https://raw.githubusercontent.com/ludihan/zemu/main/docs/screenshots/cgb-acid2.png",
        width: 1280,
        height: 720,
        alt: { en: "zemu running the cgb-acid2 Game Boy Color test", pt: "zemu rodando o teste cgb-acid2 de Game Boy Color" },
      },
      {
        src: "https://raw.githubusercontent.com/ludihan/zemu/main/docs/screenshots/video-over-game.png",
        width: 1280,
        height: 720,
        alt: { en: "zemu video settings over a paused game", pt: "Configurações de vídeo do zemu sobre um jogo pausado" },
      },
      {
        src: "https://raw.githubusercontent.com/ludihan/zemu/main/docs/screenshots/input.png",
        width: 1280,
        height: 720,
        alt: { en: "zemu input configuration", pt: "Configuração de controles do zemu" },
      },
    ],
    text: {
      en: {
        tagline: "A multi-system emulator",
        period: "Nov. 2026 – present",
        description:
          "An emulator for six consoles, written in Odin, with an interface in the style of the classic DOS-era emulators. The whole interface, font included, is drawn directly with the SDL3 renderer, with no GUI library.",
        features: [
          "NES, Super Nintendo, Game Boy and Game Boy Color, Game Boy Advance, Master System and Game Gear, and PlayStation",
          "Checked against hardware test suites, such as blargg’s, Mooneye and JaCzekanski’s PlayStation tests",
          "Save states, rewind, fast forward, cheat codes and up to four gamepads",
          "Bounds checks stay on in release builds, and the loaders were fuzzed with corrupt images",
        ],
      },
      pt: {
        tagline: "Um emulador de vários consoles",
        period: "nov. 2026 – atual",
        description:
          "Um emulador de seis consoles, escrito em Odin, com uma interface no estilo dos emuladores clássicos da era DOS. Toda a interface, inclusive a fonte, é desenhada direto com o renderizador do SDL3, sem biblioteca de GUI.",
        features: [
          "NES, Super Nintendo, Game Boy e Game Boy Color, Game Boy Advance, Master System e Game Gear, e PlayStation",
          "Validado com suítes de teste de hardware, como as do blargg, a Mooneye e os testes de PlayStation do JaCzekanski",
          "Save states, rewind, avanço rápido, códigos de trapaça e até quatro controles",
          "As verificações de limites ficam ativas na versão final, e os carregadores passaram por fuzzing com imagens corrompidas",
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
