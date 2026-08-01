"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  findNavItem,
  getRelatedHref,
} from "@/features/learning/config/navigation";

const INITIAL_VISIBLE = 6;

type RelatedTopicsProps = {
  topic: string;
  relatedTopics: string[];
};

export default function RelatedTopics({
  topic,
  relatedTopics,
}: RelatedTopicsProps) {
  const [expanded, setExpanded] = useState(false);

  if (!relatedTopics.length) return null;

  const items = relatedTopics
    .map((slug) => {
      const href = getRelatedHref(topic, slug);
      const found = findNavItem(topic, slug);
      return {
        slug,
        href,
        title: found?.item.title ?? slug,
      };
    })
    .filter((item) => item.href);

  if (!items.length) return null;

  const hasMore = items.length > INITIAL_VISIBLE;
  const visibleItems =
    expanded || !hasMore ? items : items.slice(0, INITIAL_VISIBLE);
  const hiddenCount = items.length - INITIAL_VISIBLE;

  return (
    <section className="mt-12 border-t border-border pt-8">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h2 className="text-lg font-semibold text-foreground">
          Related Chapters
        </h2>
        <span className="text-xs text-muted-foreground">
          {items.length} linked
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {visibleItems.map((item) => (
          <Link
            key={item.slug}
            href={item.href!}
            className="inline-flex items-center rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
          >
            {item.title}
          </Link>
        ))}
      </div>

      {hasMore ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {expanded ? (
            <>
              Show less
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Show {hiddenCount} more
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      ) : null}
    </section>
  );
}
