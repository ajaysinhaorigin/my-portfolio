"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/features/learning/types/article";
import { cn } from "@/shared/utils";

type TableOfContentsProps = {
  headings: Heading[];
  className?: string;
  variant?: "sidebar" | "inline";
};

export default function TableOfContents({
  headings,
  className,
  variant = "sidebar",
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: [0, 1],
      },
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const list = (
    <ol className="space-y-1.5">
      {headings.map((heading, index) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className={cn(
              "block text-sm transition-colors",
              heading.level === 3 && "pl-3",
              activeId === heading.id
                ? "font-medium text-accent"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span className="mr-2 text-xs text-muted-foreground/70">
              {index + 1}.
            </span>
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "my-8 rounded-xl border border-border bg-muted/30 p-5 xl:hidden",
          className,
        )}
      >
        <p className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Table of Contents
        </p>
        {list}
      </div>
    );
  }

  return (
    <aside
      className={cn(
        "fixed top-0 right-0 z-20 hidden h-screen w-64 overflow-y-auto border-l border-border bg-background px-5 py-8 xl:block",
        className,
      )}
    >
      <p className="mb-4 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        On this page
      </p>
      {list}
    </aside>
  );
}
