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
          {
            title: "Introduction to Design Patterns",
            slug: "introduction",
            href: sd("design-patterns", "introduction"),
          },
        ],
      },
      {
        title: "Creational Patterns",
        color: "#10b981",
        items: [
          {
            title: "Singleton",
            slug: "singleton",
            href: sd("design-patterns", "singleton"),
          },
          {
            title: "Factory Method",
            slug: "factory-method",
            href: sd("design-patterns", "factory-method"),
          },
          {
            title: "Builder",
            slug: "builder",
            href: sd("design-patterns", "builder"),
          },
          {
            title: "Abstract Factory",
            slug: "abstract-factory",
            href: sd("design-patterns", "abstract-factory"),
          },
          {
            title: "Prototype",
            slug: "prototype",
            href: sd("design-patterns", "prototype"),
          },
        ],
      },
      {
        title: "Structural Patterns",
        color: "#3b82f6",
        items: [
          {
            title: "Adapter",
            slug: "adapter",
            href: sd("design-patterns", "adapter"),
          },
          {
            title: "Facade",
            slug: "facade",
            href: sd("design-patterns", "facade"),
          },
          {
            title: "Decorator",
            slug: "decorator",
            href: sd("design-patterns", "decorator"),
          },
          {
            title: "Bridge",
            slug: "bridge",
            href: sd("design-patterns", "bridge"),
          },
          {
            title: "Composite",
            slug: "composite",
            href: sd("design-patterns", "composite"),
          },
          {
            title: "Flyweight",
            slug: "flyweight",
            href: sd("design-patterns", "flyweight"),
          },
          {
            title: "Proxy",
            slug: "proxy",
            href: sd("design-patterns", "proxy"),
          },
        ],
      },
      {
        title: "Behavioral Patterns",
        color: "#a855f7",
        items: [
          {
            title: "Strategy",
            slug: "strategy",
            href: sd("design-patterns", "strategy"),
          },
          {
            title: "Observer",
            slug: "observer",
            href: sd("design-patterns", "observer"),
          },
          {
            title: "Command",
            slug: "command",
            href: sd("design-patterns", "command"),
          },
          {
            title: "Chain of Responsibility",
            slug: "chain-of-responsibility",
            href: sd("design-patterns", "chain-of-responsibility"),
          },
          {
            title: "State",
            slug: "state",
            href: sd("design-patterns", "state"),
          },
          {
            title: "Iterator",
            slug: "iterator",
            href: sd("design-patterns", "iterator"),
          },
          {
            title: "Mediator",
            slug: "mediator",
            href: sd("design-patterns", "mediator"),
          },
          {
            title: "Memento",
            slug: "memento",
            href: sd("design-patterns", "memento"),
          },
          {
            title: "Template Method",
            slug: "template-method",
            href: sd("design-patterns", "template-method"),
          },
          {
            title: "Visitor",
            slug: "visitor",
            href: sd("design-patterns", "visitor"),
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
