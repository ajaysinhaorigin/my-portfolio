"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/shared/utils";
import ThemeToggle from "./theme-toggle";

const pillLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const sectionIds = ["home", "about", "projects", "contact"];
    const onScroll = () => {
      const scrollY = window.scrollY + 120;
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          setActive(`#${id}`);
          return;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed top-6 left-1/2 z-50 w-full max-w-fit -translate-x-1/2 px-4">
        <nav
          className={cn(
            "flex items-center gap-1 rounded-full border border-border p-1.5 shadow-2xl backdrop-blur-xl",
            "bg-[var(--nav)]",
          )}
        >
          <div className="hidden items-center gap-1 sm:flex">
            {pillLinks.map((link) => {
              const isActive =
                link.href === "#home"
                  ? active === "#home"
                  : active === link.href;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-foreground/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                </a>
              );
            })}

            <div className="mx-2 h-4 w-px bg-border" />

            <ThemeToggle />

            <a
              href="#contact"
              className="ml-1 rounded-full bg-accent px-5 py-2 text-sm font-bold text-white shadow-[0_0_15px_rgba(255,107,53,0.3)] transition-all hover:bg-orange-mid hover:shadow-[0_0_25px_rgba(255,107,53,0.5)]"
            >
              Let&apos;s Talk
            </a>
          </div>

          <div className="flex items-center gap-1 sm:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-foreground/10"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed inset-x-4 top-20 z-50 rounded-3xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur-xl sm:hidden"
          >
            <div className="flex flex-col gap-1">
              {[...pillLinks, { label: "Let's Talk", href: "#contact" }].map(
                (link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="rounded-2xl px-4 py-3 text-sm font-medium text-foreground hover:bg-muted"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ),
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
