"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Download, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { siteConfig, socialLinks } from "@/features/portfolio/portfolio.data";
import { Button, Input, Textarea } from "@/shared/components/ui";
import SectionHeading from "./section-heading";
import SocialIcons from "./social-icons";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (values: ContactFormValues) => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${values.name}`);
    const body = encodeURIComponent(
      `${values.message}\n\n— ${values.name}\n${values.email}`,
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    reset();
  };

  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          description="Open to fullstack roles, fintech product work, and interesting side collaborations."
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-card p-6 sm:p-8"
          >
            <p className="text-sm leading-relaxed text-muted-foreground">
              Prefer email or LinkedIn? Reach out directly — I usually reply
              within a day.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <a
                href={`mailto:${siteConfig.email}`}
                className="block font-medium text-foreground transition-colors hover:text-accent"
              >
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="block text-muted-foreground transition-colors hover:text-accent"
              >
                {siteConfig.phone}
              </a>
              <p className="text-muted-foreground">{siteConfig.location}</p>
            </div>

            <div className="mt-8">
              <SocialIcons links={socialLinks} />
            </div>

            <Button asChild variant="outline" className="mt-8 w-full sm:w-auto">
              <a href={siteConfig.resumePath} download>
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </Button>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="rounded-2xl border border-border bg-card p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Your name"
                  {...register("name")}
                />
                {errors.name ? (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                />
                {errors.email ? (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                ) : null}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Tell me about the role, product, or idea..."
                {...register("message")}
              />
              {errors.message ? (
                <p className="text-xs text-red-500">{errors.message.message}</p>
              ) : null}
            </div>

            <Button
              type="submit"
              variant="accent"
              className="mt-6 w-full sm:w-auto"
              disabled={isSubmitting}
            >
              <Send className="h-4 w-4" />
              Send message
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
