"use client";

import { ArrowLeft, BookOpen, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavSection, TopicConfig } from "@/features/learning/types/article";
import ThemeToggle from "@/shared/components/navigation/theme-toggle";
import { Button } from "@/shared/components/ui";
import { cn } from "@/shared/utils";
import SidebarSection from "./SidebarSection";

type SidebarProps = {
  topic: TopicConfig;
  sections: NavSection[];
};

export default function Sidebar({ topic, sections }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const nav = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-4">
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Explore
        </Link>
        <ThemeToggle />
      </div>

      <div className="border-b border-border px-4 py-4">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${topic.color}18`, color: topic.color }}
          >
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{topic.title}</p>
            <p className="text-xs text-muted-foreground">
              {sections.reduce((sum, section) => sum + section.items.length, 0)}{" "}
              topics
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {sections.map((section) => (
          <SidebarSection
            key={section.title}
            section={section}
            activeHref={pathname}
            defaultOpen
            onNavigate={() => setMobileOpen(false)}
          />
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setMobileOpen(true)}
          className="rounded-lg"
        >
          <Menu className="h-4 w-4" />
          Menu
        </Button>
        <span className="text-sm font-semibold text-foreground">{topic.title}</span>
        <ThemeToggle />
      </div>

      {/* Desktop sidebar */}
      <aside className="fixed top-0 left-0 z-30 hidden h-screen w-64 border-r border-border bg-background lg:block">
        {nav}
      </aside>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <button
          type="button"
          aria-label="Close menu"
          className={cn(
            "absolute inset-0 bg-black/50 transition-opacity",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={cn(
            "absolute top-0 left-0 h-full w-[min(20rem,85vw)] border-r border-border bg-background shadow-2xl transition-transform",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setMobileOpen(false)}
            className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
          {nav}
        </aside>
      </div>
    </>
  );
}
