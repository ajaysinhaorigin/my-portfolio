"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Brain, Cloud, Network } from "lucide-react";
import Link from "next/link";
import { learningTopics } from "@/features/portfolio/portfolio.data";
import { Badge } from "@/shared/components/ui";
import { cn } from "@/shared/utils";

const iconMap = {
  dsa: Brain,
  "system-design": Network,
  aws: Cloud,
  default: Brain,
} as const;

const topicHrefs: Record<string, string> = {
  dsa: "/explore/dsa",
  "system-design": "/explore/system-design",
  aws: "/explore/aws",
};

export default function LearningSection() {
  return (
    <section id="explore" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Explore
          </h2>
          <p className="max-w-xl text-lg font-light text-muted-foreground">
            Engineering notes written while learning — open a track to enter a
            docs-style learning space.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {learningTopics.map((topic, index) => {
            const Icon = iconMap[topic.icon] ?? iconMap.default;
            const href = topicHrefs[topic.icon] ?? "/explore";
            const isAvailable = topic.icon === "system-design";

            const content = (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                whileHover={isAvailable ? { y: -4 } : undefined}
                className={cn(
                  "group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6",
                  isAvailable
                    ? "transition-shadow hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
                    : "opacity-80",
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
                  {isAvailable ? (
                    <>
                      Open
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </>
                  ) : (
                    "Coming soon"
                  )}
                </div>
              </motion.article>
            );

            if (!isAvailable) {
              return <div key={topic.title}>{content}</div>;
            }

            return (
              <Link key={topic.title} href={href} className="block h-full">
                {content}
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
          >
            Browse all tracks
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
