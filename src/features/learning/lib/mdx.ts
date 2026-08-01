import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import type { ReactElement } from "react";
import { mdxComponents } from "@/features/learning/components/mdx";
import type { ArticleFrontmatter } from "@/features/learning/types/article";
import { slugify } from "@/features/learning/lib/headings";

const prettyCodeOptions = {
  theme: {
    dark: "github-dark-default",
    light: "github-light",
  },
  keepBackground: false,
  defaultLang: "plaintext",
};

function rehypeSlugHeadings() {
  return (tree: {
    children?: Array<{
      type: string;
      tagName?: string;
      properties?: Record<string, unknown>;
      children?: Array<{ type: string; value?: string; children?: unknown[] }>;
    }>;
  }) => {
    const visit = (node: {
      type: string;
      tagName?: string;
      properties?: Record<string, unknown>;
      children?: Array<{ type: string; value?: string; children?: unknown[] }>;
    }) => {
      if (
        node.type === "element" &&
        node.tagName &&
        /^h[2-4]$/.test(node.tagName)
      ) {
        const text = collectText(node);
        node.properties = {
          ...node.properties,
          id: slugify(text),
        };
      }

      if (node.children) {
        for (const child of node.children) {
          visit(child as typeof node);
        }
      }
    };

    if (tree.children) {
      for (const child of tree.children) {
        visit(child);
      }
    }
  };
}

function collectText(node: {
  type: string;
  value?: string;
  children?: Array<{ type: string; value?: string; children?: unknown[] }>;
}): string {
  if (node.type === "text" && node.value) return node.value;
  if (!node.children) return "";
  return node.children
    .map((child) => collectText(child as typeof node))
    .join("");
}

export async function compileArticleMDX(
  source: string,
): Promise<{ content: ReactElement; frontmatter: ArticleFrontmatter }> {
  const result = await compileMDX<ArticleFrontmatter>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlugHeadings,
          [rehypePrettyCode, prettyCodeOptions],
        ],
      },
    },
  });

  return {
    content: result.content,
    frontmatter: result.frontmatter,
  };
}
