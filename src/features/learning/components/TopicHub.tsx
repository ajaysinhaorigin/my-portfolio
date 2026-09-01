import Link from "next/link";
import type { NavSection, TopicConfig } from "@/features/learning/types/article";
import { countChapters } from "@/features/learning/config/navigation";
import { getTopicArticles } from "@/features/learning/lib/content";
import DifficultyBadge from "@/features/learning/components/article/DifficultyBadge";

type TopicHubProps = {
  topic: TopicConfig;
  sections: NavSection[];
};

export default function TopicHub({ topic, sections }: TopicHubProps) {
  const articles = getTopicArticles(topic.slug);
  const articleByHref = new Map(
    articles.map((article) => [article.href, article]),
  );
  const chapterCount = countChapters(sections);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p
          className="mb-2 text-sm font-semibold tracking-wide uppercase"
          style={{ color: topic.color }}
        >
          {topic.title}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Start here
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {topic.description}
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          {chapterCount} {chapterCount === 1 ? "chapter" : "chapters"} across{" "}
          {sections.length} {sections.length === 1 ? "module" : "modules"}
        </p>
      </div>

      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <div className="mb-5 flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: section.color }}
              />
              <h2 className="text-xl font-semibold text-foreground">
                {section.title}
              </h2>
            </div>

            <div className="space-y-8 pl-1">
              {section.groups.map((group) => (
                <div key={group.title}>
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: group.color }}
                    />
                    <h3 className="text-base font-semibold text-foreground">
                      {group.title}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {group.items.map((item) => {
                      const article = articleByHref.get(item.href);

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent/40"
                        >
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {item.title}
                            </p>
                            {article?.frontmatter.description ? (
                              <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                                {article.frontmatter.description}
                              </p>
                            ) : null}
                          </div>
                          <div className="flex shrink-0 items-center gap-2">
                            {article ? (
                              <>
                                <DifficultyBadge
                                  difficulty={article.frontmatter.difficulty}
                                />
                                <span className="hidden text-xs text-muted-foreground sm:inline">
                                  {article.readingTime}
                                </span>
                              </>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                Coming soon
                              </span>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
