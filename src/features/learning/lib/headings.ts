import type { Heading } from "@/features/learning/types/article";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Strip MDX/JSX frontmatter and extract h2/h3 headings from markdown body. */
export function extractHeadings(source: string): Heading[] {
  const withoutFrontmatter = source.replace(/^---[\s\S]*?---\s*/, "");
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(withoutFrontmatter)) !== null) {
    const level = match[1].length;
    const text = match[2]
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .trim();

    headings.push({
      id: slugify(text),
      text,
      level,
    });
  }

  return headings;
}
