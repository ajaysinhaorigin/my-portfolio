"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { NavSection } from "@/features/learning/types/article";
import { cn } from "@/shared/utils";
import SidebarGroup from "./SidebarGroup";

type SidebarSectionProps = {
  section: NavSection;
  activeHref?: string;
  defaultOpen?: boolean;
  onNavigate?: () => void;
};

export default function SidebarSection({
  section,
  activeHref,
  defaultOpen = true,
  onNavigate,
}: SidebarSectionProps) {
  const hasActiveChild = section.groups.some((group) =>
    group.items.some((item) => item.href === activeHref),
  );
  const [open, setOpen] = useState(defaultOpen || hasActiveChild);

  return (
    <div className="mb-3">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold text-foreground hover:bg-muted"
      >
        <span className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: section.color }}
          />
          {section.title}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div className="mt-1 ml-3 space-y-1 border-l border-border pl-2">
          {section.groups.map((group) => (
            <SidebarGroup
              key={group.title}
              group={group}
              activeHref={activeHref}
              defaultOpen={false}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
