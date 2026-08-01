import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArticleContent,
  ArticleFooter,
  ArticleHeader,
  Breadcrumb,
  CategoryView,
  TableOfContents,
  articleExists,
  categoryExists,
  compileArticleMDX,
  getAllArticleSlugs,
  getArticle,
  getCategoryArticles,
  getTopicConfig,
} from "@/features/learning";
import fs from "fs";
import path from "path";

type ArticlePageProps = {
  params: Promise<{ topic: string; slug: string[] }>;
};

function titleCase(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function generateStaticParams() {
  const articles = getAllArticleSlugs().map(({ topic, slug }) => ({
    topic,
    slug,
  }));

  const categories = new Map<string, { topic: string; slug: string[] }>();

  for (const article of articles) {
    if (article.slug.length > 1) {
      const categorySlug = article.slug.slice(0, -1);
      const key = `${article.topic}/${categorySlug.join("/")}`;
      categories.set(key, { topic: article.topic, slug: categorySlug });
    }
  }

  return [...articles, ...categories.values()];
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { topic, slug } = await params;
  const article = getArticle(topic, slug);

  if (article) {
    return {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
    };
  }

  if (categoryExists(topic, slug)) {
    return {
      title: `${titleCase(slug[slug.length - 1] ?? "")} · ${getTopicConfig(topic)?.title ?? topic}`,
    };
  }

  return { title: "Not Found" };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { topic, slug } = await params;
  const topicConfig = getTopicConfig(topic);

  if (!topicConfig || topicConfig.status !== "available") {
    notFound();
  }

  if (articleExists(topic, slug)) {
    const article = getArticle(topic, slug);
    if (!article) notFound();

    const filePath =
      path.join(process.cwd(), "content", topic, ...slug) + ".mdx";
    const source = fs.readFileSync(filePath, "utf8");
    const { content } = await compileArticleMDX(source);

    const category = slug[0] ?? article.frontmatter.category;
    const backHref =
      slug.length > 1
        ? `/explore/${topic}/${slug.slice(0, -1).join("/")}`
        : `/explore/${topic}`;

    return (
      <>
        <div className="xl:mr-64">
          <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            <Breadcrumb
              items={[
                { label: "Explore", href: "/explore" },
                { label: topicConfig.title, href: `/explore/${topic}` },
                {
                  label: titleCase(category),
                  href: `/explore/${topic}/${category}`,
                },
                { label: article.frontmatter.title },
              ]}
            />

            <ArticleHeader
              frontmatter={article.frontmatter}
              readingTime={article.readingTime}
              backHref={backHref}
              backLabel={titleCase(category)}
            />

            <TableOfContents headings={article.headings} variant="inline" />

            <ArticleContent>{content}</ArticleContent>

            <ArticleFooter topic={topic} frontmatter={article.frontmatter} />
          </article>
        </div>

        <TableOfContents headings={article.headings} />
      </>
    );
  }

  if (categoryExists(topic, slug)) {
    const articles = getCategoryArticles(topic, slug);
    return (
      <CategoryView
        topic={topic}
        category={slug[slug.length - 1] ?? ""}
        articles={articles}
      />
    );
  }

  notFound();
}
