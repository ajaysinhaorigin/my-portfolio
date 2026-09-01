"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { NavGroup } from "@/features/learning/types/article";
import { cn } from "@/shared/utils";
import SidebarLink from "./SidebarLink";

type SidebarGroupProps = {
  group: NavGroup;
  activeHref?: string;
  defaultOpen?: boolean;
  onNavigate?: () => void;
};

export default function SidebarGroup({
  group,
  activeHref,
  defaultOpen = false,
  onNavigate,
}: SidebarGroupProps) {
  const hasActiveChild = group.items.some((item) => item.href === activeHref);
  const [open, setOpen] = useState(defaultOpen || hasActiveChild);

  return (
    <div className="mb-1">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase hover:bg-muted hover:text-foreground"
      >
        <span className="flex items-center gap-2 normal-case">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: group.color }}
          />
          <span className="text-sm font-semibold tracking-normal">
            {group.title}
          </span>
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 shrink-0 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div className="mt-1 ml-2 space-y-0.5 border-l border-border pl-2">
          {group.items.map((item) => (
            <SidebarLink
              key={item.href}
              href={item.href}
              title={item.title}
              active={item.href === activeHref}
              accentColor={group.color}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
