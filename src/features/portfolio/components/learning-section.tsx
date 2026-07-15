"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Brain, Cloud, Network } from "lucide-react";
import type { LearningStatus } from "@/features/portfolio/portfolio.data";
import { learningTopics } from "@/features/portfolio/portfolio.data";
import { Badge } from "@/shared/components/ui";
import { cn } from "@/shared/utils";
import SectionHeading from "./section-heading";

const statusStyles: Record<
  LearningStatus,
  { label: string; variant: "accent" | "warning" | "success" }
> = {
  "in-progress": { label: "In Progress", variant: "accent" },
  planned: { label: "Planned", variant: "warning" },
  completed: { label: "Completed", variant: "success" },
};

const iconMap = {
  dsa: Brain,
  "system-design": Network,
  aws: Cloud,
  default: Brain,
} as const;

export default function LearningSection() {
  return (
    <section id="learning" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Learning"
          title="What I'm studying next"
          description="A living board of topics I'm deepening — add a card in one data file and it shows up here."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {learningTopics.map((topic, index) => {
            const Icon = iconMap[topic.icon] ?? iconMap.default;
            const status = statusStyles[topic.status];

            return (
              <motion.article
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                whileHover={{ y: -4 }}
                className={cn(
                  "group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6",
                  "transition-shadow hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5",
                )}
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>

                <h3 className="text-lg font-semibold text-foreground">
                  {topic.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {topic.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {topic.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-accent">
                  Learning in public
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
