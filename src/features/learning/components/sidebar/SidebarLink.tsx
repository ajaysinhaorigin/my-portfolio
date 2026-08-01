"use client";

import Link from "next/link";
import { cn } from "@/shared/utils";

type SidebarLinkProps = {
  href: string;
  title: string;
  active?: boolean;
  accentColor?: string;
  onNavigate?: () => void;
};

export default function SidebarLink({
  href,
  title,
  active = false,
  accentColor,
  onNavigate,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "block rounded-lg px-3 py-1.5 text-sm transition-colors",
        active
          ? "bg-accent/10 font-medium text-accent"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
      style={
        active && accentColor
          ? {
              backgroundColor: `${accentColor}18`,
              color: accentColor,
            }
          : undefined
      }
    >
      <span className="flex items-center gap-2">
        <span
          className={cn(
            "inline-block h-1.5 w-1.5 rounded-full",
            active ? "bg-current" : "bg-border",
          )}
        />
        {title}
      </span>
    </Link>
  );
}
