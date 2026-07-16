"use client";

import { motion } from "framer-motion";
import {
  Database,
  ExternalLink,
  Github,
  Lock,
  MapPin,
  MessageSquare,
  Search,
} from "lucide-react";
import type { ReactNode } from "react";
import { projects } from "@/features/portfolio/portfolio.data";

const featureIcons: Record<"cloud" | "property", ReactNode[]> = {
  cloud: [
    <Lock key="lock" className="h-3.5 w-3.5" />,
    <Database key="db" className="h-3.5 w-3.5" />,
    <Search key="search" className="h-3.5 w-3.5" />,
  ],
  property: [
    <MessageSquare key="msg" className="h-3.5 w-3.5" />,
    <MapPin key="map" className="h-3.5 w-3.5" />,
    <Lock key="lock" className="h-3.5 w-3.5" />,
  ],
};

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 mx-auto w-full max-w-[980px] scroll-mt-24 px-6 py-24"
    >
      <div className="mb-16 flex flex-col items-center text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          Featured Works
        </h2>
        <p className="max-w-xl text-lg font-light text-muted-foreground">
          Architecting scalable solutions with a focus on performance, security,
          and exceptional user experience.
        </p>
      </div>

      <div className="space-y-6">
        {projects.map((project, i) => {
          const icons = featureIcons[project.graphicId];

          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.08 }}
              className="group relative rounded-3xl border border-border bg-card p-1.5 shadow-xl transition-colors duration-500 hover:border-accent/30"
            >
              <div className="flex flex-col overflow-hidden rounded-[1.35rem] bg-background md:flex-row">
                <div className="relative z-10 flex w-full flex-col justify-center p-8 md:w-1/2 md:p-10">

                  <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground md:text-2xl">
                    {project.title}
                  </h3>

                  <p className="mb-4 text-sm font-light leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mb-4 space-y-2.5">
                    {project.highlights.map((feature, idx) => (
                      <div key={feature} className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-accent">
                          {icons[idx] ?? icons[0]}
                        </div>
                        <p className="text-sm font-medium text-foreground/80">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border bg-muted px-2.5 py-1 text-[11px] font-medium text-foreground/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center gap-5 border-t border-border pt-4">
                    <a
                      href={project.liveUrl ?? "#"}
                      className="group/btn inline-flex items-center gap-1.5 text-sm font-bold text-foreground transition-colors hover:text-accent"
                    >
                      View Live Site
                      <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                    <a
                      href={project.githubUrl ?? "#"}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Github className="h-3.5 w-3.5" /> Source Code
                    </a>
                  </div>
                </div>

                {/* Graphic — 50% */}
                <div className="relative flex min-h-[300px] w-full items-center justify-center overflow-hidden border-t border-border bg-card md:min-h-[340px] md:w-1/2 md:border-t-0 md:border-l">
                  <div
                    className="absolute inset-0 opacity-[0.03] transition-opacity duration-700 group-hover:opacity-[0.08]"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />

                  <div className="relative z-10 flex h-full w-full items-center justify-center p-5">
                    {project.graphicId === "cloud" ? (
                      <div className="relative h-32 w-32">
                        <div className="absolute inset-x-0 bottom-0 h-20 rounded-xl bg-gradient-to-t from-accent/20 to-transparent opacity-50 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2">
                          {[1, 2, 3].map((row) => (
                            <motion.div
                              key={row}
                              whileHover={{ x: row % 2 === 0 ? 6 : -6 }}
                              className="z-10 flex h-8 w-24 items-center gap-2 rounded-md border border-border bg-muted px-3 shadow-md"
                            >
                              <div
                                className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent"
                                style={{ animationDelay: `${row * 0.2}s` }}
                              />
                              <div className="h-1 w-8 rounded-full bg-foreground/10" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="relative flex h-32 w-32 items-center justify-center">
                        <div className="absolute h-20 w-20 rounded-full bg-accent/15 blur-2xl transition-transform duration-700 group-hover:scale-150" />
                        <div className="relative z-10 flex h-20 w-20 rotate-12 items-center justify-center rounded-xl border border-border bg-background shadow-xl transition-transform duration-500 group-hover:rotate-0">
                          <MapPin className="h-8 w-8 text-accent" />
                        </div>
                        <div className="absolute -bottom-2 -left-2 z-20 flex h-12 w-12 -rotate-6 items-center justify-center rounded-xl border border-border bg-muted">
                          <MessageSquare className="h-5 w-5 text-foreground/50" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
