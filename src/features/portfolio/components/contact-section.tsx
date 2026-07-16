"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Download, Mail, MapPin, Phone, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { siteConfig, socialLinks } from "@/features/portfolio/portfolio.data";
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
    <section
      id="contact"
      className="relative z-10 mx-auto w-full max-w-5xl scroll-mt-24 px-6 py-24"
    >
      <div className="mb-16 flex flex-col items-center text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          Get in Touch
        </h2>
        <p className="max-w-xl text-lg font-light text-muted-foreground">
          Open to fullstack roles, fintech product work, and interesting
          collaborations.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-[2rem] border border-border bg-card p-2 shadow-2xl"
        >
          <div className="flex h-full flex-col rounded-[1.75rem] bg-background p-6 md:p-8">
            <span className="mb-6 w-fit rounded-full border border-accent/20 bg-accent-soft px-3 py-1 text-xs font-bold tracking-wider text-accent">
              LET&apos;S TALK
            </span>

            <p className="text-base font-light leading-relaxed text-muted-foreground">
              Prefer email or LinkedIn? Reach out directly — I usually reply
              within a day.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted text-accent">
                  <Mail className="h-4 w-4" />
                </span>
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-accent"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted text-accent">
                  <Phone className="h-4 w-4" />
                </span>
                {siteConfig.phone}
              </a>
              <p className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted text-accent">
                  <MapPin className="h-4 w-4" />
                </span>
                {siteConfig.location}
              </p>
            </div>

            <div className="mt-auto space-y-6 pt-10">
              <SocialIcons links={socialLinks} />

              <a
                href={siteConfig.resumePath}
                download
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-muted px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-accent/30 hover:text-accent sm:w-auto"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.08 }}
          className="rounded-[2rem] border border-border bg-card p-2 shadow-2xl"
        >
          <div className="rounded-[1.75rem] bg-background p-6 md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <input
                  id="name"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent/50"
                  {...register("name")}
                />
                {errors.name ? (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent/50"
                  {...register("email")}
                />
                {errors.email ? (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                ) : null}
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell me about the role, product, or idea..."
                className="w-full resize-none rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent/50"
                {...register("message")}
              />
              {errors.message ? (
                <p className="text-xs text-red-500">{errors.message.message}</p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-medium text-white shadow-[0_0_15px_rgba(255,107,53,0.25)] transition-all hover:bg-orange-mid hover:shadow-[0_0_25px_rgba(255,107,53,0.4)] disabled:opacity-60 sm:w-auto"
            >
              <Send className="h-4 w-4" />
              Send message
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
