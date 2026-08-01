"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { NavSection } from "@/features/learning/types/article";
import { cn } from "@/shared/utils";
import SidebarLink from "./SidebarLink";

type SidebarSectionProps = {
  section: NavSection;
  activeHref?: string;
  defaultOpen?: boolean;
  onNavigate?: () => void;
};

export default function SidebarSection({
  section,
  activeHref,
  defaultOpen = false,
  onNavigate,
}: SidebarSectionProps) {
  const hasActiveChild = section.items.some((item) => item.href === activeHref);
  const [open, setOpen] = useState(defaultOpen || hasActiveChild);

  return (
    <div className="mb-2">
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
        <div className="mt-1 ml-2 space-y-0.5 border-l border-border pl-2">
          {section.items.map((item) => (
            <SidebarLink
              key={item.href}
              href={item.href}
              title={item.title}
              active={item.href === activeHref}
              accentColor={section.color}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
