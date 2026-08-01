import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type {
  Article,
  ArticleFrontmatter,
  ArticleMeta,
} from "@/features/learning/types/article";
import { extractHeadings } from "@/features/learning/lib/headings";

const CONTENT_DIR = path.join(process.cwd(), "content");

function isDirectory(filePath: string) {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch {
    return false;
  }
}

function isFile(filePath: string) {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function walkMdxFiles(dir: string, base: string[] = []): string[][] {
  if (!isDirectory(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const slugs: string[][] = [];

  for (const entry of entries) {
    const next = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      slugs.push(...walkMdxFiles(next, [...base, entry.name]));
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      slugs.push([...base, entry.name.replace(/\.mdx$/, "")]);
    }
  }

  return slugs;
}

export function getContentRoot() {
  return CONTENT_DIR;
}

export function articleExists(topic: string, slug: string[]): boolean {
  const filePath = path.join(CONTENT_DIR, topic, ...slug) + ".mdx";
  return isFile(filePath);
}

export function categoryExists(topic: string, slug: string[]): boolean {
  const dirPath = path.join(CONTENT_DIR, topic, ...slug);
  return isDirectory(dirPath);
}

export function getAllArticleSlugs(topic?: string): { topic: string; slug: string[] }[] {
  if (topic) {
    const topicDir = path.join(CONTENT_DIR, topic);
    return walkMdxFiles(topicDir).map((slug) => ({ topic, slug }));
  }

  if (!isDirectory(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) =>
      walkMdxFiles(path.join(CONTENT_DIR, entry.name)).map((slug) => ({
        topic: entry.name,
        slug,
      })),
    );
}

export function getArticleMeta(topic: string, slug: string[]): ArticleMeta | null {
  const filePath = path.join(CONTENT_DIR, topic, ...slug) + ".mdx";
  if (!isFile(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as ArticleFrontmatter;
  const computedReadingTime = frontmatter.readingTime ?? readingTime(content).text;

  return {
    topic,
    slug,
    href: `/explore/${topic}/${slug.join("/")}`,
    frontmatter,
    readingTime: computedReadingTime,
  };
}

export function getArticle(topic: string, slug: string[]): Article | null {
  const meta = getArticleMeta(topic, slug);
  if (!meta) return null;

  const filePath = path.join(CONTENT_DIR, topic, ...slug) + ".mdx";
  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);

  return {
    ...meta,
    content,
    headings: extractHeadings(raw),
  };
}

export function getTopicArticles(topic: string): ArticleMeta[] {
  return getAllArticleSlugs(topic)
    .map(({ slug }) => getArticleMeta(topic, slug))
    .filter((article): article is ArticleMeta => article !== null)
    .sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title));
}

export function getCategoryArticles(
  topic: string,
  categorySlug: string[],
): ArticleMeta[] {
  const prefix = categorySlug.join("/");
  return getTopicArticles(topic).filter((article) =>
    article.slug.join("/").startsWith(`${prefix}/`),
  );
}

export function getAvailableTopics(): string[] {
  if (!isDirectory(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}
