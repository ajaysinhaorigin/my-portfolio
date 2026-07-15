"use client";

import { motion } from "framer-motion";
import { experience } from "@/features/portfolio/portfolio.data";
import { Badge } from "@/shared/components/ui";
import SectionHeading from "./section-heading";

export default function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've been building"
          description="Startup environments, rapid demos, and full ownership across the stack."
        />

        <div className="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border sm:before:left-[15px]">
          {experience.map((job, index) => (
            <motion.article
              key={`${job.company}-${job.period}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
              className="relative pl-10 sm:pl-12"
            >
              <span className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background sm:h-8 sm:w-8">
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              </span>

              <div className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {job.role}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {job.company} · {job.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {job.current ? (
                      <Badge variant="accent">Current</Badge>
                    ) : null}
                    <Badge variant="muted">{job.period}</Badge>
                  </div>
                </div>

                <ul className="mt-5 space-y-3">
                  {job.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
