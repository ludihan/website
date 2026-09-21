import type { Locale } from "./i18n";

export const site = {
  url: "https://ludihan.xyz",
  name: "Lucca Han",
  email: "luccad.han@gmail.com",
  github: "https://github.com/ludihan",
  linkedin: "https://linkedin.com/in/lucca-han/",
};

export const skills = {
  languages: ["TypeScript", "JavaScript", "Go", "Rust", "Python", "C", "Elixir", "SQL"],
  frontend: ["React", "Next.js", "Svelte / SvelteKit", "Tailwind CSS", "Vite"],
  backend: ["Node.js", "Go", "Django", "Phoenix", "PostgreSQL", "SQLite", "RabbitMQ"],
  mobile: ["React Native / Expo", "Kotlin", "Jetpack Compose"],
  devops: ["Linux", "Docker", "Git", "Nix / NixOS", "Shell"],
  ai: ["Claude", "ChatGPT", "Gemini", "OpenCode", "Jev"],
};

export type SkillGroup = keyof typeof skills;

export type Role = {
  org: string;
  title: string;
  period: string;
  place: string;
  summary: string;
  stack: string[];
};

type ProfileText = {
  role: string;
  lead: string;
  facts: { label: string; value: string }[];
  cta: { projects: string; email: string; about: string };
  workTitle: string;
  workAll: string;
  roles: Role[];
  educationTitle: string;
  education: { school: string; title: string; period: string }[];
  skillsTitle: string;
  skillLabels: Record<SkillGroup, string>;
  contactTitle: string;
  contactText: string;
  interests: string;
};

export const profileText: Record<Locale, ProfileText> = {
  en: {
    role: "Full-Stack Developer",
    lead: "I build web applications end to end: React and Next.js front-ends, Go and Node.js back-ends, databases and the Linux/Docker tooling around them. Computer Science graduate based in Manaus, Brazil, with experience working in a remote team.",
    facts: [
      { label: "Based in", value: "Manaus, Amazonas, Brazil (UTC−4)" },
      { label: "Now", value: "IT assistant at Masf Refeições" },
      { label: "Education", value: "B.Sc. Computer Science, UNIFOR" },
      { label: "Languages", value: "English, Portuguese" },
    ],
    cta: { projects: "View projects", email: "Email me", about: "Full background" },
    workTitle: "Experience",
    workAll: "Full background",
    roles: [
      {
        org: "Masf Refeições",
        title: "IT Assistant",
        period: "Jun. 2026 – present",
        place: "Manaus, Brazil",
        summary:
          "Work as an IT assistant and build internal software as a full-stack developer, including the company website, satisfaction forms and a certificate system, among other projects.",
        stack: ["Svelte", "SvelteKit", "React", "Next.js", "Tailwind CSS", "Node.js", "Go"],
      },
      {
        org: "FIOTEC / FIOCRUZ",
        title: "Full-Stack Web Developer Intern",
        period: "May 2025 – Dec. 2025",
        place: "Remote, Brazil",
        summary:
          "Front-end developer on Helper, a laboratory-support web app that automates the analysis of RT-qPCR run files, significantly cutting the time specialists spent on manual analysis.",
        stack: ["React", "Vite", "Tailwind CSS", "Django"],
      },
    ],
    educationTitle: "Education",
    education: [
      {
        school: "Wyden",
        title: "Postgraduate Program in Full Stack Development",
        period: "Jul. 2026 – ongoing",
      },
      {
        school: "University of Fortaleza (UNIFOR)",
        title: "Bachelor's Degree in Computer Science (8.37/10.0)",
        period: "Feb. 2022 – Dec. 2025",
      },
    ],
    skillsTitle: "Skills",
    skillLabels: {
      languages: "Languages",
      frontend: "Front-end",
      backend: "Back-end & data",
      mobile: "Mobile",
      devops: "DevOps & tooling",
      ai: "AI-assisted development",
    },
    contactTitle: "Let's talk",
    contactText:
      "I'm always happy to chat about new roles, projects or anything web, systems or gamedev related.",
    interests:
      "Outside of work: Linux, systems programming, embedded, game development and music. I use openSUSE, btw.",
  },
  pt: {
    role: "Desenvolvedor Full-Stack",
    lead: "Construo aplicações web de ponta a ponta: front-ends em React e Next.js, back-ends em Go e Node.js, bancos de dados e o ferramental de Linux/Docker ao redor. Bacharel em Ciência da Computação, baseado em Manaus, com experiência em time remoto.",
    facts: [
      { label: "Localização", value: "Manaus, Amazonas, Brasil (UTC−4)" },
      { label: "Atualmente", value: "Assistente de TI na Masf Refeições" },
      { label: "Formação", value: "Bacharel em Ciência da Computação, UNIFOR" },
      { label: "Idiomas", value: "Inglês, Português" },
    ],
    cta: { projects: "Ver projetos", email: "Enviar email", about: "Trajetória completa" },
    workTitle: "Experiência",
    workAll: "Trajetória completa",
    roles: [
      {
        org: "Masf Refeições",
        title: "Assistente de TI",
        period: "jun. 2026 – atual",
        place: "Manaus, Brasil",
        summary:
          "Atuo como assistente de TI e desenvolvo software interno como desenvolvedor full-stack, incluindo o site da empresa, formulários de satisfação e um sistema de certificados, entre outros projetos.",
        stack: ["Svelte", "SvelteKit", "React", "Next.js", "Tailwind CSS", "Node.js", "Go"],
      },
      {
        org: "FIOTEC / FIOCRUZ",
        title: "Estagiário de Desenvolvimento Web Full-Stack",
        period: "mai. 2025 – dez. 2025",
        place: "Remoto, Brasil",
        summary:
          "Desenvolvedor front-end do Helper, uma aplicação web de apoio laboratorial que automatiza a análise de arquivos de corridas de RT-qPCR, reduzindo significativamente o tempo de análise manual dos especialistas.",
        stack: ["React", "Vite", "Tailwind CSS", "Django"],
      },
    ],
    educationTitle: "Formação",
    education: [
      {
        school: "Wyden",
        title: "Pós-graduação em Desenvolvimento Full Stack",
        period: "jul. 2026 – em andamento",
      },
      {
        school: "Universidade de Fortaleza (UNIFOR)",
        title: "Bacharelado em Ciência da Computação (8,37/10,0)",
        period: "fev. 2022 – dez. 2025",
      },
    ],
    skillsTitle: "Habilidades",
    skillLabels: {
      languages: "Linguagens",
      frontend: "Front-end",
      backend: "Back-end e dados",
      mobile: "Mobile",
      devops: "DevOps e ferramentas",
      ai: "Desenvolvimento com IA",
    },
    contactTitle: "Vamos conversar",
    contactText:
      "Vou adorar conversar sobre novas oportunidades, projetos ou qualquer coisa de web, sistemas ou gamedev.",
    interests:
      "Fora do trabalho: Linux, programação de sistemas, embarcados, desenvolvimento de jogos e música. Eu uso openSUSE, btw.",
  },
};
