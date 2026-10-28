import { z } from "zod";

// No DB or server imports here: the admin editor (client) shares these.
const s = (max: number) => z.string().trim().max(max);
const req = (max: number) => s(max).min(1);

export const serviceIcons = ["react", "server", "mobile", "database", "code"] as const;

export const contentSchemas = {
  profile: z.object({
    name: req(80),
    title: req(120),
    company: s(120),
    tagline: s(300),
    location: s(120),
    email: z.string().trim().email().max(320),
    linkedin: s(300),
    github: s(300),
    cvUrl: s(300),
    availability: s(80),
    roles: z.array(req(60)).min(1).max(8),
    stats: z.array(z.object({ value: req(12), label: req(40) })).max(4),
  }),
  about: z.object({
    paragraphs: z.array(req(1200)).min(1).max(6),
    highlights: z.array(z.object({ title: req(60), text: req(160) })).max(3),
  }),
  skills: z
    .array(z.object({ title: req(40), blurb: s(80), skills: z.array(req(40)).max(30) }))
    .max(8),
  services: z.object({
    intro: s(600),
    items: z
      .array(
        z.object({
          title: req(80),
          description: req(400),
          highlights: z.array(req(80)).max(6),
          icon: z.enum(serviceIcons),
        }),
      )
      .max(8),
  }),
  sections: z.object({
    about: z.object({ eyebrow: s(40), title: req(100) }),
    projects: z.object({ eyebrow: s(40), title: req(100), subtitle: s(300) }),
    skills: z.object({ eyebrow: s(40), title: req(100), subtitle: s(300) }),
    services: z.object({
      eyebrow: s(40),
      title: req(100),
      ctaTitle: req(100),
      ctaText: s(500),
      ctaButton: req(40),
    }),
    experience: z.object({ eyebrow: s(40), title: req(100) }),
    contact: z.object({ eyebrow: s(40), title: req(100), subtitle: s(300), responseTime: s(80) }),
    footer: z.object({ text: s(300) }),
  }),
  experience: z
    .array(
      z.object({
        title: req(80),
        location: req(120),
        description: req(1200),
        date: req(40),
        logo: s(300),
      }),
    )
    .max(12),
};

export type SectionKey = keyof typeof contentSchemas;
export const sectionKeys = Object.keys(contentSchemas) as SectionKey[];

export type Profile = z.infer<typeof contentSchemas.profile>;
export type AboutContent = z.infer<typeof contentSchemas.about>;
export type SkillGroup = z.infer<typeof contentSchemas.skills>[number];
export type ServicesContent = z.infer<typeof contentSchemas.services>;
export type Experience = z.infer<typeof contentSchemas.experience>[number];
export type SectionsContent = z.infer<typeof contentSchemas.sections>;
export type SiteContent = { [K in SectionKey]: z.infer<(typeof contentSchemas)[K]> };

export const defaultContent: SiteContent = {
  profile: {
    name: "Osama Ayub",
    title: "Software Engineer",
    company: "Cogilent Solutions",
    tagline: "with 2+ years of experience specializing in React, Next.js, Node.js & TypeScript.",
    location: "Lahore, Pakistan",
    email: "osama.ayubwebdev@gmail.com",
    linkedin: "https://www.linkedin.com/in/osama-ayub8889993755979/",
    github: "https://github.com/osamaayub",
    cvUrl: "/CV.pdf",
    availability: "Open to new opportunities",
    roles: ["scalable web apps", "clean REST APIs", "polished interfaces", "full-stack products"],
    stats: [
      { value: "2+", label: "Years experience" },
      { value: "5+", label: "Products shipped" },
      { value: "MERN", label: "Core stack" },
      { value: "PK", label: "Lahore, Pakistan" },
    ],
  },
  about: {
    paragraphs: [
      "I’m a **Full-Stack Software Engineer** with **2+ years of professional experience** building scalable web applications. I specialize in the MERN stack, Next.js, and TypeScript, with a focus on performance, clean code, and intuitive user experiences.",
      "At **Cogilent Solutions, SensViz, and Narsun Studios**, I’ve built REST APIs, secure authentication, and responsive interfaces for enterprise applications and AI-powered platforms. I enjoy turning complex problems into practical solutions.",
      "Outside of coding, I enjoy gaming, movies, and time with friends, along with **learning new technologies**.",
    ],
    highlights: [
      { title: "Performance first", text: "Fast loads, lean bundles, smooth interactions." },
      { title: "Secure by default", text: "Validated inputs, solid auth, safe APIs." },
      { title: "End-to-end ownership", text: "From schema design to polished UI." },
    ],
  },
  skills: [
    {
      title: "Frontend",
      blurb: "Fast, accessible interfaces",
      skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Redux", "HTML & CSS", "Responsive Design"],
    },
    {
      title: "Backend",
      blurb: "Reliable APIs and auth",
      skills: ["Node.js", "Express.js", "REST APIs", "JWT", "OAuth", "API Development"],
    },
    {
      title: "Data & Tools",
      blurb: "Modeling, versioning, shipping",
      skills: ["MongoDB", "Database Design", "Git", "GitHub", "Vercel"],
    },
    {
      title: "Practices",
      blurb: "How I work",
      skills: ["Agile/Scrum", "Clean Code", "Problem Solving", "Code Review"],
    },
  ],
  services: {
    intro:
      "With 2+ years of professional experience, I bring strong full-stack skills in React, Next.js, Node.js, and MongoDB. Here’s how I can add value to your team.",
    items: [
      {
        title: "Frontend development",
        description: "Fast, accessible interfaces that match your brand and feel great on every screen size.",
        highlights: ["React & Next.js", "Tailwind & motion", "Pixel-accurate UI"],
        icon: "react",
      },
      {
        title: "Backend & REST APIs",
        description: "Reliable server logic and APIs your frontend (and future mobile apps) can trust.",
        highlights: ["Node & Express", "JWT / OAuth", "Validation & error handling"],
        icon: "server",
      },
      {
        title: "Responsive design",
        description: "Interfaces that adapt cleanly across mobile, tablet, and desktop without extra rework.",
        highlights: ["Mobile-first layouts", "Cross-device testing", "Consistent UX at every breakpoint"],
        icon: "mobile",
      },
      {
        title: "Database & data modeling",
        description: "Structured MongoDB schemas and queries that stay maintainable as your product grows.",
        highlights: ["Schema design", "Indexing & performance", "Clean integrations"],
        icon: "database",
      },
    ],
  },
  sections: {
    about: { eyebrow: "About", title: "Engineering with care" },
    projects: {
      eyebrow: "Selected work",
      title: "Ideas turned into experiences",
      subtitle:
        "A collection of full-stack products, thoughtful interfaces, and real-world solutions. Explore the experience or dive into the code.",
    },
    skills: {
      eyebrow: "Toolbox",
      title: "My skills",
      subtitle: "The tools I use to turn complex problems into simple, dependable experiences.",
    },
    services: {
      eyebrow: "What I do",
      title: "Services",
      ctaTitle: "Let's Build Something Great Together",
      ctaText:
        "Have an idea, startup, or business project in mind? I'm always excited to collaborate on building modern, scalable web applications that deliver real value. Let's discuss your goals and turn your vision into reality.",
      ctaButton: "Start a Conversation",
    },
    experience: { eyebrow: "Career", title: "My experience" },
    contact: {
      eyebrow: "Get in touch",
      title: "Let's work together",
      subtitle: "Have a project, an idea, or a role in mind? Send a message and let's talk.",
      responseTime: "Usually within a day or two",
    },
    footer: { text: "Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, MongoDB and Resend." },
  },
  experience: [
    {
      title: "Associate Software Engineer",
      location: "SensViz, Lahore, PK",
      description:
        "Built and maintained full-stack web products on the MERN stack. Delivered REST APIs, MongoDB data models, and responsive React interfaces. Collaborated on production features with attention to performance, code quality, and clear UI/UX. Worked in an agile environment to deliver features on time and meet project milestones.",
      date: "Aug 2025 - Jul 2026",
      logo: "/sensviz.jpeg",
    },
    {
      title: "Software Engineer",
      location: "Cogilent Solutions, Islamabad, PK",
      description:
        "Full-stack development focusing on scalable web applications. Worked on enterprise-level projects using React, Node.js, and modern JavaScript frameworks. Contributed to system architecture, API development, and performance optimization. Collaborated with cross-functional teams to deliver high-quality software solutions that meet business requirements and user needs.",
      date: "Feb 2025 - Jan 2026",
      logo: "/cogilent.jpeg",
    },
    {
      title: "MERN Stack Developer",
      location: "Narsun Studios, Lahore, PK",
      description:
        "Worked across the stack on web applications using React, Node.js, Express, and MongoDB. Gained solid full-stack delivery experience in an agile team environment, developing complete features from database design to frontend implementation. Contributed to project planning and code reviews while learning industry best practices.",
      date: "Jan 2024 - Apr 2024",
      logo: "/Narsun.jpeg",
    },
  ],
};
