import { ArrowUpRight, Brain, Cloud, Cpu, Network, Server } from "lucide-react";
import Link from "next/link";
import { getNavigation } from "@/features/learning/config/navigation";
import { topicList } from "@/features/learning/config/topics";
import { Badge } from "@/shared/components/ui";
import { cn } from "@/shared/utils";

const iconMap = {
  "system-design": Network,
  dsa: Brain,
  aws: Cloud,
  devops: Server,
  ai: Cpu,
} as const;

export default function ExploreLanding() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-medium tracking-wide text-accent uppercase">
          Explore
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Engineering notes written while learning.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Structured deep-dives into system design, algorithms, and cloud —
          organized like documentation, not a blog.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {topicList.map((topic) => {
          const Icon = iconMap[topic.icon];
          const modules =
            topic.status === "available" ? getNavigation(topic.slug) : [];
          const chapterCount = modules.reduce(
            (sum, section) => sum + section.items.length,
            0,
          );
          const isAvailable = topic.status === "available";

          const card = (
            <article
              className={cn(
                "group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all",
                isAvailable
                  ? "hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
                  : "opacity-80",
              )}
            >
              <div className="mb-5 flex items-start justify-between">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `${topic.color}18`,
                    color: topic.color,
                  }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                {!isAvailable ? (
                  <Badge variant="muted">Coming Soon</Badge>
                ) : null}
              </div>

              <h2 className="text-xl font-semibold text-foreground">
                {topic.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {topic.description}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm">
                <span className="text-muted-foreground">
                  {isAvailable
                    ? `${modules.length} ${modules.length === 1 ? "Module" : "Modules"} · ${chapterCount} Chapters`
                    : "In progress"}
                </span>
                {isAvailable ? (
                  <span className="inline-flex items-center gap-1 font-medium text-muted-foreground transition-colors group-hover:text-accent">
                    Open
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                ) : null}
              </div>
            </article>
          );

          if (!isAvailable) {
            return (
              <div key={topic.slug} aria-disabled>
                {card}
              </div>
            );
          }

          return (
            <Link key={topic.slug} href={`/explore/${topic.slug}`}>
              {card}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
