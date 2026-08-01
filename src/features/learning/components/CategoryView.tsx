import Link from "next/link";
import type { ArticleMeta } from "@/features/learning/types/article";
import { categoryColors } from "@/features/learning/config/topics";
import DifficultyBadge from "@/features/learning/components/article/DifficultyBadge";

type CategoryViewProps = {
  topic: string;
  category: string;
  articles: ArticleMeta[];
};

function titleCase(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function CategoryView({
  topic,
  category,
  articles,
}: CategoryViewProps) {
  const color = categoryColors[category] ?? "var(--accent)";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href={`/explore/${topic}`}
        className="mb-6 inline-block text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        ← Back to {titleCase(topic)}
      </Link>

      <div className="mb-8">
        <span
          className="mb-3 inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase"
          style={{ backgroundColor: `${color}18`, color }}
        >
          {category}
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {titleCase(category)}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {articles.length} article{articles.length === 1 ? "" : "s"} in this
          section
        </p>
      </div>

      <div className="space-y-3">
        {articles.map((article) => (
          <Link
            key={article.href}
            href={article.href}
            className="block rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/40"
          >
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-semibold text-foreground">
                {article.frontmatter.title}
              </h2>
              <DifficultyBadge difficulty={article.frontmatter.difficulty} />
            </div>
            {article.frontmatter.description ? (
              <p className="mt-2 text-sm text-muted-foreground">
                {article.frontmatter.description}
              </p>
            ) : null}
            <p className="mt-3 text-xs text-muted-foreground">
              {article.readingTime} · {article.frontmatter.lastUpdated}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
