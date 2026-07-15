"use client";

import { motion } from "framer-motion";
import {
  Database,
  ExternalLink,
  Lock,
  MapPin,
  MessageSquare,
  Search,
} from "lucide-react";
import type { ReactNode } from "react";
import { projects, siteConfig } from "@/features/portfolio/portfolio.data";

const featureIcons: Record<string, ReactNode[]> = {
  "Cloud-Store": [
    <Lock key="lock" className="h-4 w-4" />,
    <Database key="db" className="h-4 w-4" />,
    <Search key="search" className="h-4 w-4" />,
  ],
  "Property-Pulse": [
    <MessageSquare key="msg" className="h-4 w-4" />,
    <MapPin key="map" className="h-4 w-4" />,
    <Lock key="lock" className="h-4 w-4" />,
  ],
};

const projectMeta: Record<
  string,
  { tag: string; graphicId: "cloud" | "property" }
> = {
  "Cloud-Store": { tag: "WEB APP", graphicId: "cloud" },
  "Property-Pulse": { tag: "FULLSTACK", graphicId: "property" },
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 w-full scroll-mt-24 px-6 py-24">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="font-display mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Featured Case Studies
          </h2>
          <p className="max-w-xl text-lg font-light text-muted-foreground">
            Personal products focused on real workflows — storage, auth, search,
            and polish.
          </p>
        </div>

        <div className="space-y-12">
          {projects.map((project, index) => {
            const meta = projectMeta[project.title] ?? {
              tag: "PROJECT",
              graphicId: "cloud" as const,
            };
            const icons =
              featureIcons[project.title] ??
              featureIcons["Cloud-Store"];

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.08 }}
                className="group relative rounded-[2rem] border border-border bg-card p-2 shadow-2xl transition-colors duration-500 hover:border-accent/30"
              >
                <div className="flex flex-col gap-2 overflow-hidden rounded-[1.75rem] bg-background md:flex-row">
                  {/* Content */}
                  <div className="relative z-10 flex flex-1 flex-col justify-center p-8 md:p-12">
                    <div className="mb-6 flex items-center gap-3">
                      <span className="rounded-full border border-accent/20 bg-accent-soft px-3 py-1 text-xs font-bold tracking-wider text-accent">
                        {meta.tag}
                      </span>
                    </div>

                    <h3 className="mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                      {project.title}
                    </h3>

                    <p className="mb-8 text-base font-light leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <div className="mb-10 space-y-4">
                      {project.highlights.map((feature, idx) => (
                        <div key={feature} className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-accent">
                            {icons[idx] ?? icons[0]}
                          </div>
                          <p className="text-sm font-medium text-foreground/80">
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mb-10 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center gap-6 border-t border-border pt-6">
                      <a
                        href="#contact"
                        className="group/btn inline-flex items-center gap-2 text-sm font-bold text-foreground transition-colors hover:text-accent"
                      >
                        Discuss project
                        <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </a>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Get in touch
                      </a>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className="relative m-2 flex min-h-[300px] w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-card md:min-h-full md:w-[45%]">
                    <div
                      className="absolute inset-0 opacity-[0.03] transition-opacity duration-700 group-hover:opacity-[0.08] dark:opacity-[0.04]"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                      }}
                    />

                    <div className="relative z-10 flex h-full w-full items-center justify-center p-8">
                      {meta.graphicId === "cloud" ? (
                        <div className="relative h-48 w-48">
                          <div className="absolute inset-x-0 bottom-0 h-32 rounded-xl bg-gradient-to-t from-accent/20 to-transparent opacity-50 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3">
                            {[1, 2, 3].map((i) => (
                              <motion.div
                                key={i}
                                whileHover={{ x: i % 2 === 0 ? 10 : -10 }}
                                className="z-10 flex h-10 w-32 items-center gap-3 rounded-lg border border-border bg-muted px-4 shadow-lg"
                              >
                                <div
                                  className="h-2 w-2 animate-pulse rounded-full bg-accent"
                                  style={{ animationDelay: `${i * 0.2}s` }}
                                />
                                <div className="h-1.5 w-12 rounded-full bg-foreground/10" />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="relative flex h-48 w-48 items-center justify-center">
                          <div className="absolute h-32 w-32 rounded-full bg-accent/15 blur-3xl transition-transform duration-700 group-hover:scale-150" />
                          <div className="relative z-10 flex h-32 w-32 rotate-12 items-center justify-center rounded-2xl border border-border bg-background shadow-2xl transition-transform duration-500 group-hover:rotate-0">
                            <MapPin className="h-12 w-12 text-accent" />
                          </div>
                          <div className="absolute -bottom-4 -left-4 z-20 flex h-20 w-20 -rotate-6 items-center justify-center rounded-2xl border border-border bg-muted">
                            <MessageSquare className="h-8 w-8 text-foreground/50" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
