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
  cta: { projects: string; email: string; about: string; copyEmail: string; emailCopied: string };
  workTitle: string;
  workAll: string;
  roles: Role[];
  educationTitle: string;
  education: { school: string; title: string; period: string; place: string; coursework: string[] }[];
  skillsTitle: string;
  skillLabels: Record<SkillGroup, string>;
  contactTitle: string;
  contactText: string;
  osJoke: string;
  about: {
    title: string;
    summary: string;
    focusTitle: string;
    focus: { title: string; text: string; tags: string[] }[];
    courseworkLabel: string;
    languagesTitle: string;
    languages: string[];
  };
};

export const profileText: Record<Locale, ProfileText> = {
  en: {
    role: "Full-Stack Developer",
    lead: "I build web applications end to end: React and Next.js front-ends, Go and Node.js back-ends, databases and the Linux/Docker tooling around them. Computer Science graduate based in Manaus, Brazil.",
    facts: [
      { label: "Based in", value: "Manaus, Amazonas, Brazil (UTC−4)" },
      { label: "Now", value: "IT assistant at Masf Refeições" },
      { label: "Education", value: "B.Sc. Computer Science, UNIFOR" },
      { label: "Languages", value: "English, Portuguese" },
    ],
    cta: {
      projects: "View projects",
      email: "Email me",
      about: "Full background",
      copyEmail: "Copy email address",
      emailCopied: "Email copied!",
    },
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
        place: "Manaus, Brazil",
        coursework: ["Big Data Fundamentals", "Website Creation and Programming", "Cloud Computing", "Back-End Development", "Front-End Development", "Database Design and Implementation", "DevOps Methodology", "Information Security Fundamentals"],
      },
      {
        school: "University of Fortaleza (UNIFOR)",
        title: "Bachelor's Degree in Computer Science (8.37/10.0)",
        period: "Feb. 2022 – Dec. 2025",
        place: "Fortaleza, Brazil",
        coursework: ["Data Structures", "Databases", "Web Development", "Computer Graphics", "Mobile Development", "Functional Programming", "Object Oriented Programming", "Operating Systems", "Artificial Intelligence"],
      },
    ],
    skillsTitle: "Skills",
    skillLabels: {
      languages: "Programming languages",
      frontend: "Front-end",
      backend: "Back-end & data",
      mobile: "Mobile",
      devops: "DevOps & tooling",
      ai: "AI-assisted development",
    },
    contactTitle: "Let's talk",
    contactText:
      "I'm always happy to chat about new roles, projects or anything web, systems or gamedev related.",
    osJoke: "I use openSUSE, btw.",
    about: {
      title: "About me",
      summary:
        "Computer Science graduate and full-stack developer with experience in web development, game development and automation. I like building correct, efficient solutions, and I keep learning through hands-on projects.",
      focusTitle: "What I work on",
      focus: [
        {
          title: "Web development",
          text: "Front-end and back-end, from React and Next.js interfaces to Go and Node.js services.",
          tags: ["React", "Next.js", "Go", "Node.js", "PostgreSQL"],
        },
        {
          title: "Linux & DevOps",
          text: "Linux user (openSUSE), working with Docker, Nix and the shell.",
          tags: ["Linux", "Docker", "NixOS", "Shell"],
        },
        {
          title: "Systems & embedded",
          text: "C for embedded and systems work, Rust for general projects.",
          tags: ["C", "Rust"],
        },
        {
          title: "Game development",
          text: "Games and tools built with Godot.",
          tags: ["Godot", "GDScript"],
        },
      ],
      courseworkLabel: "Relevant coursework",
      languagesTitle: "Spoken languages",
      languages: ["English", "Portuguese"],
    },
  },
  pt: {
    role: "Desenvolvedor Full-Stack",
    lead: "Construo aplicações web de ponta a ponta: front-ends em React e Next.js, back-ends em Go e Node.js, bancos de dados e o ferramental de Linux/Docker ao redor. Bacharel em Ciência da Computação, baseado em Manaus.",
    facts: [
      { label: "Localização", value: "Manaus, Amazonas, Brasil (UTC−4)" },
      { label: "Atualmente", value: "Assistente de TI na Masf Refeições" },
      { label: "Formação", value: "Bacharel em Ciência da Computação, UNIFOR" },
      { label: "Idiomas", value: "Inglês, Português" },
    ],
    cta: {
      projects: "Ver projetos",
      email: "Enviar email",
      about: "Trajetória completa",
      copyEmail: "Copiar endereço de email",
      emailCopied: "Email copiado!",
    },
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
        place: "Manaus, Brasil",
        coursework: ["Fundamentos de Big Data", "Criação e Programação de Websites", "Cloud Computing", "Desenvolvimento Back-End", "Desenvolvimento Front-End", "Projeto e Implementação de Banco de Dados", "Método DevOps", "Fundamentos de Segurança da Informação"],
      },
      {
        school: "Universidade de Fortaleza (UNIFOR)",
        title: "Bacharelado em Ciência da Computação (8,37/10,0)",
        period: "fev. 2022 – dez. 2025",
        place: "Fortaleza, Brasil",
        coursework: ["Estruturas de Dados", "Bancos de Dados", "Desenvolvimento Web", "Computação Gráfica", "Desenvolvimento Mobile", "Programação Funcional", "Programação Orientada a Objetos", "Sistemas Operacionais", "Inteligência Artificial"],
      },
    ],
    skillsTitle: "Habilidades",
    skillLabels: {
      languages: "Linguagens de programação",
      frontend: "Front-end",
      backend: "Back-end e dados",
      mobile: "Mobile",
      devops: "DevOps e ferramentas",
      ai: "Desenvolvimento com IA",
    },
    contactTitle: "Vamos conversar",
    contactText:
      "Vou adorar conversar sobre novas oportunidades, projetos ou qualquer coisa de web, sistemas ou gamedev.",
    osJoke: "Eu uso openSUSE, btw.",
    about: {
      title: "Sobre mim",
      summary:
        "Bacharel em Ciência da Computação e desenvolvedor full-stack, com experiência em desenvolvimento web, desenvolvimento de jogos e automação. Gosto de criar soluções corretas e eficientes, e sigo aprendendo através de projetos práticos.",
      focusTitle: "No que eu trabalho",
      focus: [
        {
          title: "Desenvolvimento web",
          text: "Front-end e back-end, de interfaces em React e Next.js a serviços em Go e Node.js.",
          tags: ["React", "Next.js", "Go", "Node.js", "PostgreSQL"],
        },
        {
          title: "Linux e DevOps",
          text: "Usuário de Linux (openSUSE), trabalhando com Docker, Nix e o shell.",
          tags: ["Linux", "Docker", "NixOS", "Shell"],
        },
        {
          title: "Sistemas e embarcados",
          text: "C para embarcados e sistemas, Rust para projetos em geral.",
          tags: ["C", "Rust"],
        },
        {
          title: "Desenvolvimento de jogos",
          text: "Jogos e ferramentas feitos com Godot.",
          tags: ["Godot", "GDScript"],
        },
      ],
      courseworkLabel: "Disciplinas relevantes",
      languagesTitle: "Idiomas falados",
      languages: ["Inglês", "Português"],
    },
  },
};
