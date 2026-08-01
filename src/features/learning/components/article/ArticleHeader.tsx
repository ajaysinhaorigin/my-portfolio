import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import type { ArticleFrontmatter } from "@/features/learning/types/article";
import { categoryColors } from "@/features/learning/config/topics";
import DifficultyBadge from "./DifficultyBadge";

type ArticleHeaderProps = {
  frontmatter: ArticleFrontmatter;
  readingTime: string;
  backHref: string;
  backLabel?: string;
};

export default function ArticleHeader({
  frontmatter,
  readingTime,
  backHref,
  backLabel = "Back",
}: ArticleHeaderProps) {
  const categoryColor =
    categoryColors[frontmatter.category] ?? "var(--accent)";

  return (
    <header className="mb-10 border-b border-border pb-8">
      <Link
        href={backHref}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>

      <div className="mb-3 flex items-center gap-2">
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase"
          style={{
            backgroundColor: `${categoryColor}18`,
            color: categoryColor,
          }}
        >
          {frontmatter.category}
        </span>
      </div>

      <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {frontmatter.title}
      </h1>

      {frontmatter.description ? (
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">
          {frontmatter.description}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <DifficultyBadge difficulty={frontmatter.difficulty} />
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {readingTime}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          {frontmatter.lastUpdated}
        </span>
      </div>

      {frontmatter.prerequisites && frontmatter.prerequisites.length > 0 ? (
        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted-foreground">Prerequisites:</span>
          {frontmatter.prerequisites.map((item) => (
            <span
              key={item}
              className="rounded-md border border-border bg-muted px-2 py-0.5 text-xs font-medium text-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </header>
  );
}
