"use client";

import { motion } from "framer-motion";
import { education, siteConfig } from "@/features/portfolio/portfolio.data";
import { Badge } from "@/shared/components/ui";
import SectionHeading from "./section-heading";

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionHeading
              eyebrow="About"
              title="Know who I am"
              description="Fintech builder by day. Curious engineer always shipping and learning."
            />

            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              {siteConfig.bio.map((paragraph, index) => (
                <motion.p
                  key={paragraph}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 rounded-2xl border border-border bg-card p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Education
              </p>
              <p className="mt-2 font-medium text-foreground">
                {education.degree}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {education.school}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {education.period} · {education.score}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-accent/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card p-3 shadow-xl">
              <div className="flex aspect-[4/5] flex-col items-center justify-center rounded-[1.35rem] bg-gradient-to-br from-muted via-card to-accent/20 p-8 text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-border bg-background text-3xl font-semibold text-accent">
                  AS
                </div>
                <p className="mt-6 font-display text-2xl font-semibold text-foreground">
                  {siteConfig.name}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {siteConfig.role}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <Badge variant="accent">{siteConfig.yearsOfExperience}+ years</Badge>
                  <Badge variant="outline">Fintech</Badge>
                  <Badge variant="outline">Fullstack</Badge>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
