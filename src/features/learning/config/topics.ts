import type { TopicConfig } from "@/features/learning/types/article";

export const topicConfig: Record<string, TopicConfig> = {
  "system-design": {
    slug: "system-design",
    title: "System Design",
    description:
      "Architecture, scalability, and design trade-offs — spanning networking, databases, caching, and real systems.",
    color: "#ff6b35",
    colorClass: "text-[#ff6b35]",
    status: "available",
    icon: "system-design",
  },
  dsa: {
    slug: "dsa",
    title: "Data Structures & Algorithms",
    description:
      "Problem patterns, data structures, and algorithmic thinking — organized by topic and complexity.",
    color: "#10b981",
    colorClass: "text-emerald-500",
    status: "coming-soon",
    icon: "dsa",
  },
  aws: {
    slug: "aws",
    title: "AWS Cloud",
    description:
      "Cloud services, infrastructure patterns, and deployment — organized by use case.",
    color: "#3b82f6",
    colorClass: "text-blue-500",
    status: "coming-soon",
    icon: "aws",
  },
  devops: {
    slug: "devops",
    title: "DevOps",
    description:
      "CI/CD, containers, observability, and infrastructure automation — coming soon.",
    color: "#f59e0b",
    colorClass: "text-amber-500",
    status: "coming-soon",
    icon: "devops",
  },
  ai: {
    slug: "ai",
    title: "AI Engineering",
    description:
      "LLMs, RAG, agents, and production AI patterns — coming soon.",
    color: "#a855f7",
    colorClass: "text-purple-500",
    status: "coming-soon",
    icon: "ai",
  },
};

export const topicList = Object.values(topicConfig);

export function getTopicConfig(slug: string): TopicConfig | undefined {
  return topicConfig[slug];
}

export const categoryColors: Record<string, string> = {
  networking: "#ef4444",
  database: "#eab308",
  caching: "#22c55e",
  scalability: "#f97316",
  security: "#a855f7",
  cloud: "#3b82f6",
  architecture: "#06b6d4",
  storage: "#14b8a6",
  queues: "#ec4899",
};
