"use client";

import { siteConfig, socialLinks } from "@/features/portfolio/portfolio.data";
import SocialIcons from "./social-icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-left sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-medium text-foreground">
            {siteConfig.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            © {year} · Built with Next.js, Tailwind CSS & Framer Motion
          </p>
        </div>
        <SocialIcons links={socialLinks} />
      </div>
    </footer>
  );
}
