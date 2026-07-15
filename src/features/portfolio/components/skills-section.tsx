"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/features/portfolio/portfolio.data";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui";
import SectionHeading from "./section-heading";

export default function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I ship with"
          description="A practical stack for building production fintech products — from UI polish to backend scale."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: categoryIndex * 0.08, duration: 0.45 }}
            >
              <Card className="h-full transition-shadow hover:shadow-lg hover:shadow-accent/5">
                <CardHeader>
                  <CardTitle>{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: categoryIndex * 0.05 + skillIndex * 0.02,
                        }}
                      >
                        <Badge variant="outline">{skill}</Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
