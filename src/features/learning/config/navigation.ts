import type { NavSection } from "@/features/learning/types/article";

const sd = (category: string, slug: string) =>
  `/explore/system-design/${category}/${slug}`;

export const systemDesignNavigation: NavSection[] = [
  {
    title: "Networking",
    color: "#ef4444",
    items: [
      {
        title: "How Web Works",
        slug: "how-web-works",
        href: sd("networking", "how-web-works"),
      },
      {
        title: "DNS",
        slug: "dns",
        href: sd("networking", "dns"),
      },
      {
        title: "Browser Caching",
        slug: "browser-caching",
        href: sd("networking", "browser-caching"),
      },
      {
        title: "TCP Three-Way Handshake",
        slug: "tcp-handshake",
        href: sd("networking", "tcp-handshake"),
      },
      {
        title: "TLS Handshake",
        slug: "tls-handshake",
        href: sd("networking", "tls-handshake"),
      },
      {
        title: "HTTP",
        slug: "http",
        href: sd("networking", "http"),
      },
    ],
  },
];

export const navigationByTopic: Record<string, NavSection[]> = {
  "system-design": systemDesignNavigation,
};

export function getNavigation(topic: string): NavSection[] {
  return navigationByTopic[topic] ?? [];
}

export function findNavItem(topic: string, slug: string) {
  const sections = getNavigation(topic);
  for (const section of sections) {
    const item = section.items.find((entry) => entry.slug === slug);
    if (item) {
      return { section, item };
    }
  }
  return null;
}

export function getRelatedHref(topic: string, relatedSlug: string): string | null {
  const found = findNavItem(topic, relatedSlug);
  return found?.item.href ?? null;
}
