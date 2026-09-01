export type Difficulty = "beginner" | "intermediate" | "advanced";

export type LectureStatus = "not-started" | "in-progress" | "completed";

export type LectureSource = {
  course: string;
  instructor: string;
  status: LectureStatus;
  completedOn?: string;
  revisionCount?: number;
  confidence?: number;
};

export type ArticleFrontmatter = {
  title: string;
  description?: string;
  difficulty: Difficulty;
  readingTime?: string;
  lastUpdated: string;
  category: string;
  tags?: string[];
  prerequisites?: string[];
  relatedTopics?: string[];
  lectureSource?: LectureSource;
  summary?: string;
  interviewQuestions?: string[];
};

export type Heading = {
  id: string;
  text: string;
  level: number;
};

export type ArticleMeta = {
  topic: string;
  slug: string[];
  href: string;
  frontmatter: ArticleFrontmatter;
  readingTime: string;
};

export type Article = ArticleMeta & {
  content: string;
  headings: Heading[];
};

export type NavItem = {
  title: string;
  slug: string;
  href: string;
};

/** A collapsible group of chapters inside a module (e.g. Web Fundamentals). */
export type NavGroup = {
  title: string;
  color: string;
  items: NavItem[];
};

/** A top-level module in a track (e.g. Networking). */
export type NavSection = {
  title: string;
  color: string;
  groups: NavGroup[];
};

export type TopicStatus = "available" | "coming-soon";

export type TopicConfig = {
  slug: string;
  title: string;
  description: string;
  color: string;
  colorClass: string;
  status: TopicStatus;
  icon: "system-design" | "dsa" | "aws" | "devops" | "ai";
};
