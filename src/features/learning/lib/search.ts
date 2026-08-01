/**
 * FlexSearch index builder — wired up in Phase 2 (Cmd+K search).
 * Kept here so the dependency and API surface are ready.
 */
import { Index } from "flexsearch";
import type { ArticleMeta } from "@/features/learning/types/article";

export type SearchDocument = {
  id: number;
  title: string;
  href: string;
  category: string;
  description: string;
};

export function buildSearchIndex(articles: ArticleMeta[]) {
  const index = new Index({
    tokenize: "forward",
  });

  const documents: SearchDocument[] = articles.map((article, id) => {
    const doc: SearchDocument = {
      id,
      title: article.frontmatter.title,
      href: article.href,
      category: article.frontmatter.category,
      description: article.frontmatter.description ?? "",
    };
    index.add(id, `${doc.title} ${doc.category} ${doc.description}`);
    return doc;
  });

  return { index, documents };
}
