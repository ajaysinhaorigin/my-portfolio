"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Brain, Cloud, Network } from "lucide-react";
import { learningTopics } from "@/features/portfolio/portfolio.data";
import { Badge } from "@/shared/components/ui";
import { cn } from "@/shared/utils";

const iconMap = {
  dsa: Brain,
  "system-design": Network,
  aws: Cloud,
  default: Brain,
} as const;

export default function LearningSection() {
  return (
    <section id="explore" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Explore
          </h2>
          <p className="max-w-xl text-lg font-light text-muted-foreground">
            A curated space of engineering fundamentals and beyond — open to
            explore.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {learningTopics.map((topic, index) => {
            const Icon = iconMap[topic.icon] ?? iconMap.default;

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
                <div className="mb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
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
                  Open
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
