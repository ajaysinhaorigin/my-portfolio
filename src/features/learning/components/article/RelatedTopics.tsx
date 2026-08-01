import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { getRelatedHref } from "@/features/learning/config/navigation";
import { findNavItem } from "@/features/learning/config/navigation";

type RelatedTopicsProps = {
  topic: string;
  relatedTopics: string[];
};

export default function RelatedTopics({
  topic,
  relatedTopics,
}: RelatedTopicsProps) {
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

  return (
    <section className="mt-12 border-t border-border pt-8">
      <h2 className="mb-5 text-lg font-semibold text-foreground">
        Related Topics
      </h2>
      <div className="flex flex-col items-start gap-1">
        {items.map((item, index) => (
          <div key={item.slug} className="flex flex-col items-start">
            <Link
              href={item.href!}
              className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:text-accent"
            >
              {item.title}
            </Link>
            {index < items.length - 1 ? (
              <ArrowDown className="my-1 ml-4 h-4 w-4 text-muted-foreground" />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
