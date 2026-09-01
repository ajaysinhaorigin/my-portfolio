"use client";

import { useEffect, useRef, useState } from "react";
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
  const asideRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (!id) continue;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        }

        // Prefer the topmost visible heading in document order
        const next =
          headings.find((heading) => visible.has(heading.id))?.id ??
          activeFromScroll(headings);
        if (next) setActiveId(next);
      },
      {
        rootMargin: "-80px 0px -55% 0px",
        threshold: [0, 0.25, 1],
      },
    );

    for (const el of elements) observer.observe(el);

    // Seed active state before the first intersection callback
    const initial = activeFromScroll(headings);
    if (initial) setActiveId(initial);

    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    if (!activeId || variant !== "sidebar") return;
    const link = linkRefs.current.get(activeId);
    const aside = asideRef.current;
    if (!link || !aside) return;

    const linkTop = link.offsetTop;
    const linkBottom = linkTop + link.offsetHeight;
    const viewTop = aside.scrollTop;
    const viewBottom = viewTop + aside.clientHeight;

    if (linkTop < viewTop + 48 || linkBottom > viewBottom - 48) {
      link.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeId, variant]);

  if (headings.length === 0) return null;

  const list = (
    <ol className="space-y-1.5">
      {headings.map((heading, index) => (
        <li key={heading.id}>
          <a
            ref={(el) => {
              if (el) linkRefs.current.set(heading.id, el);
              else linkRefs.current.delete(heading.id);
            }}
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
      ref={asideRef}
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

/** Fallback: last heading whose top is above the scroll offset. */
function activeFromScroll(headings: Heading[]): string {
  const offset = window.scrollY + 100;
  let current = headings[0]?.id ?? "";

  for (const heading of headings) {
    const el = document.getElementById(heading.id);
    if (!el) continue;
    if (el.offsetTop <= offset) current = heading.id;
    else break;
  }

  return current;
}
