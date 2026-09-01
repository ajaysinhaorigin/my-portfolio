import type { NavGroup, NavItem, NavSection } from "@/features/learning/types/article";

const sd = (category: string, slug: string) =>
  `/explore/system-design/${category}/${slug}`;

export const systemDesignNavigation: NavSection[] = [
  {
    title: "Networking",
    color: "#ef4444",
    groups: [
      {
        title: "Web Fundamentals",
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
            title: "HTTP",
            slug: "http",
            href: sd("networking", "http"),
          },
        ],
      },
      {
        title: "Communication Protocols",
        color: "#f97316",
        items: [
          {
            title: "Overview",
            slug: "communication-protocols",
            href: sd("networking", "communication-protocols"),
          },
          {
            title: "Web Protocols",
            slug: "web-protocols",
            href: sd("networking", "web-protocols"),
          },
          {
            title: "Real-Time Protocols",
            slug: "realtime-protocols",
            href: sd("networking", "realtime-protocols"),
          },
          {
            title: "Transfer Protocols",
            slug: "transfer-protocols",
            href: sd("networking", "transfer-protocols"),
          },
        ],
      },
    ],
  },
  {
    title: "Design Patterns",
    color: "#f59e0b",
    groups: [
      {
        title: "Foundations",
        color: "#f59e0b",
        items: [
          {
            title: "Object-Oriented Programming",
            slug: "oop",
            href: sd("design-patterns", "oop"),
          },
          {
            title: "SOLID Principles",
            slug: "solid-principles",
            href: sd("design-patterns", "solid-principles"),
          },
        ],
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

export function getSectionGroups(section: NavSection): NavGroup[] {
  return section.groups;
}

export function countChapters(sections: NavSection[]): number {
  return sections.reduce(
    (sum, section) =>
      sum +
      section.groups.reduce((groupSum, group) => groupSum + group.items.length, 0),
    0,
  );
}

export function countGroups(sections: NavSection[]): number {
  return sections.reduce((sum, section) => sum + section.groups.length, 0);
}

export function findNavItem(topic: string, slug: string) {
  const sections = getNavigation(topic);
  for (const section of sections) {
    for (const group of section.groups) {
      const item = group.items.find((entry) => entry.slug === slug);
      if (item) {
        return { section, group, item };
      }
    }
  }
  return null;
}

export function getRelatedHref(
  topic: string,
  relatedSlug: string,
): string | null {
  const found = findNavItem(topic, relatedSlug);
  return found?.item.href ?? null;
}

/** Flatten all items across modules/groups — useful for hubs and search. */
export function getAllNavItems(topic: string): NavItem[] {
  return getNavigation(topic).flatMap((section) =>
    section.groups.flatMap((group) => group.items),
  );
}
