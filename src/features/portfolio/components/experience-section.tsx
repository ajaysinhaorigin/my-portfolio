"use client";

import { motion } from "framer-motion";
import { experience } from "@/features/portfolio/portfolio.data";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative z-10 mx-auto w-full max-w-5xl scroll-mt-24 px-6 py-24"
    >
      <div className="mb-16 flex flex-col items-center text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          Experience
        </h2>
        <p className="max-w-xl text-lg font-light text-muted-foreground">
          Roles where I owned delivery across product, frontend, backend, and
          mobile.
        </p>
      </div>

      <div className="space-y-0">
        {experience.map((job, index) => (
          <motion.article
            key={`${job.company}-${job.period}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.08 }}
            className="group border-t border-border py-10 first:border-t-0 first:pt-0 md:py-14 md:first:pt-0"
          >
            <div className="grid gap-8 md:grid-cols-[200px_1fr] md:gap-12">
              <div className="md:pt-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {job.period}
                </p>
                {job.current ? (
                  <span className="mt-3 inline-flex rounded-full border border-accent/20 bg-accent-soft px-3 py-1 text-[11px] font-bold tracking-wider text-accent">
                    CURRENT
                  </span>
                ) : null}
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  {job.role}
                </h3>
                <p className="mt-2 text-base text-muted-foreground">
                  <span className="font-medium text-foreground/85">
                    {job.company}
                  </span>
                  <span className="mx-2 text-border">·</span>
                  {job.location}
                </p>

                <ul className="mt-8 space-y-4">
                  {job.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground md:text-[15px]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition-transform group-hover:scale-125" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="border-t border-border" />
    </section>
  );
}
