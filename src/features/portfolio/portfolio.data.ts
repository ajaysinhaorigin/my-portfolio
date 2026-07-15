export type SocialLink = {
  name: string;
  href: string;
  label: string;
};

export type SkillCategory = {
  title: string;
  skills: string[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  highlights: string[];
};

export type ProjectItem = {
  title: string;
  description: string;
  highlights: string[];
  tech: string[];
  links?: { label: string; href: string }[];
};

export type LearningStatus = "in-progress" | "planned" | "completed";

export type LearningTopic = {
  title: string;
  description: string;
  status: LearningStatus;
  icon: "dsa" | "system-design" | "aws" | "default";
  tags: string[];
};

export const siteConfig = {
  name: "Ajay Sinha",
  role: "Fullstack Software Engineer",
  tagline:
    "Building scalable fintech products across frontend, backend, and mobile — with Next.js, NestJS, React Native, and TypeScript.",
  location: "Mohali, India",
  email: "withajaysinha@gmail.com",
  phone: "8222859676",
  yearsOfExperience: 3,
  resumePath: "/resume/Ajay-Sinha-CV.pdf",
  bio: [
    "I'm a fullstack software engineer with 3 years of experience building scalable fintech applications across frontend, backend, and mobile platforms.",
    "Currently an SDE at Zomint Tech, I architect multi-database NestJS backends, ship React Native fintech apps, and own end-to-end delivery from auth systems to investor demos.",
    "I care about clean architecture, rapid product iteration, and learning in public — DSA, system design, and AWS are on my desk right now.",
  ],
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Learning", href: "#learning" },
  { label: "Contact", href: "#contact" },
] as const;

export const socialLinks: SocialLink[] = [
  {
    name: "linkedin",
    href: "https://www.linkedin.com/in/ajaysinhaorigin/",
    label: "LinkedIn",
  },
  {
    name: "github",
    href: "https://github.com/ajaysinhaorigin",
    label: "GitHub",
  },
  {
    name: "instagram",
    href: "https://www.instagram.com/ajaysinhaorigin/",
    label: "Instagram",
  },
  {
    name: "email",
    href: "mailto:withajaysinha@gmail.com",
    label: "Email",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      "React.js",
      "Next.js",
      "React Native",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "NativeWind",
      "ShadCN/UI",
      "Material UI",
      "Zustand",
      "Redux",
      "TanStack Query",
      "React Hook Form",
      "Zod",
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      "Node.js",
      "Express.js",
      "NestJS",
      "PostgreSQL",
      "MongoDB",
      "Prisma",
      "REST APIs",
      "Firebase Auth",
      "Socket.IO",
    ],
  },
  {
    title: "Tools & Cloud",
    skills: [
      "AWS",
      "Vercel",
      "Git",
      "Axios",
      "Playwright",
      "Vitest",
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    role: "SDE",
    company: "Zomint Tech Private Limited",
    location: "Mohali, IND",
    period: "Aug 2025 – Present",
    current: true,
    highlights: [
      "Architected a scalable multi-database fintech backend using NestJS, PostgreSQL, and Prisma with separate platform, MFD, and RIA services.",
      "Built and maintained multiple fintech products including Plan Creator, CardMatch, LoanMatch, Quarterly Review systems, CSV import workflows, and internal operational tools.",
      "Developing a React Native fintech mobile application from scratch with authentication, real-time advisor-client chat, portfolio workflows, notifications, analytics, and scalable state management.",
      "Implemented secure authentication and real-time communication using Firebase Auth, JWT access/refresh tokens, and Socket.IO with thread-based messaging.",
      "Managed end-to-end product delivery across frontend, backend, databases, and deployment while collaborating closely with founders and product stakeholders.",
    ],
  },
  {
    role: "Front-end Developer",
    company: "ENEST Technologies Pvt Ltd",
    location: "Mohali, IND",
    period: "Oct 2023 – Jul 2025",
    highlights: [
      "Improved page load performance by optimizing rendering, lazy loading, and reusable components in React.js applications.",
      "Owned React Native application development including UI implementation, API integration, debugging, and feature delivery.",
      "Built dynamic forms, Google Maps integrations, and reusable frontend components across multiple products.",
      "Developed admin panel features including RBAC, state management, and optimized data tables using React.js and TypeScript.",
    ],
  },
];

export const projects: ProjectItem[] = [
  {
    title: "Cloud-Store",
    description:
      "A modern and secure cloud storage application designed for seamless file management and collaboration.",
    highlights: [
      "OTP-based authentication and real-time storage tracking with Next.js, MongoDB, and ShadCN.",
      "Advanced search, result caching, and responsive file management workflows.",
      "Secure cloud storage UX focused on speed and collaboration.",
    ],
    tech: ["Next.js", "MongoDB", "ShadCN/UI", "TypeScript"],
  },
  {
    title: "Property-Pulse",
    description:
      "A rental property platform that helps users find their next home with rich search and interactive features.",
    highlights: [
      "Google authentication, property CRUD, Cloudinary uploads, and advanced search.",
      "Messaging, notifications, bookmarking, and maps integration.",
      "Responsive UI workflows built for real-world rental discovery.",
    ],
    tech: ["Next.js", "Cloudinary", "Google Auth", "Maps"],
  },
];

export const learningTopics: LearningTopic[] = [
  {
    title: "Data Structures & Algorithms",
    description:
      "Daily problem-solving focused on patterns, complexity, and interview readiness — arrays, trees, graphs, and DP.",
    status: "in-progress",
    icon: "dsa",
    tags: ["LeetCode", "Patterns", "Complexity"],
  },
  {
    title: "System Design",
    description:
      "High-level and low-level design for scalable systems — caching, queues, databases, and real-world fintech architectures.",
    status: "in-progress",
    icon: "system-design",
    tags: ["HLD", "LLD", "Scalability"],
  },
  {
    title: "AWS Cloud",
    description:
      "Hands-on cloud fundamentals: compute, storage, networking, IAM, and deploying production-ready services.",
    status: "planned",
    icon: "aws",
    tags: ["EC2", "S3", "IAM"],
  },
];

export const education = {
  degree: "Bachelor of Computer Science",
  school: "Kurukshetra University, Kurukshetra",
  period: "Jul 2019 – Aug 2022",
  score: "Percentage – 80%",
};
