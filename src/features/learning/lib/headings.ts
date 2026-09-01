import type { Heading } from "@/features/learning/types/article";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Returns a slugger that appends -1, -2, … when the same base slug repeats. */
export function createUniqueSlugger() {
  const seen = new Map<string, number>();

  return (text: string): string => {
    const base = slugify(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  };
}

/** Strip MDX/JSX frontmatter and extract h2/h3 headings from markdown body. */
export function extractHeadings(source: string): Heading[] {
  const withoutFrontmatter = source.replace(/^---[\s\S]*?---\s*/, "");
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  const uniqueSlug = createUniqueSlugger();
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(withoutFrontmatter)) !== null) {
    const level = match[1].length;
    const text = match[2]
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .trim();

    headings.push({
      id: uniqueSlug(text),
      text,
      level,
    });
  }

  return headings;
}
