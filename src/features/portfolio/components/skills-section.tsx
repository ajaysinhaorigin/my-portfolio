"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/features/portfolio/portfolio.data";

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative z-10 mx-auto w-full max-w-[980px] scroll-mt-24 px-6 py-24"
    >
      <div className="mb-16 flex flex-col items-center text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          Skills & Stack
        </h2>
        <p className="max-w-xl text-lg font-light text-muted-foreground">
          The tools I use to design, build, and ship production products end to
          end.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="relative overflow-hidden rounded-[2rem] border border-border bg-card/40"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[60%] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative divide-y divide-border">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="grid gap-6 px-7 py-8 sm:px-11 md:grid-cols-[160px_1fr] md:gap-10"
            >
              <div className="flex items-start gap-3 md:flex-col md:gap-2">
                <span className="font-mono text-xs font-medium tracking-wider text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-semibold tracking-[0.14em] text-foreground uppercase">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-background/80 px-3.5 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
