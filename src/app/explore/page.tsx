import type { Metadata } from "next";
import Link from "next/link";
import { ExploreLanding } from "@/features/learning";
import { Footer } from "@/features/portfolio";
import ThemeToggle from "@/shared/components/navigation/theme-toggle";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Structured engineering notes on System Design, DSA, AWS, and more — written while learning.",
};

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Portfolio
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <ExploreLanding />
      <Footer />
    </div>
  );
}
