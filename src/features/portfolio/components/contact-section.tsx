"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Send } from "lucide-react";
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
    const mailto = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    const link = document.createElement("a");
    link.href = mailto;
    link.rel = "noopener noreferrer";
    link.click();
    reset();
  };

  return (
    <section
      id="contact"
      className="relative z-10 mx-auto w-full max-w-[980px] scroll-mt-24 px-6 py-24"
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

      <motion.div
        initial={{ opacity: 0, y: 24 }}
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
        <div className="pointer-events-none absolute -top-28 left-1/2 h-56 w-[70%] -translate-x-1/2 rounded-full bg-accent/12 blur-3xl" />

        <div className="relative grid lg:grid-cols-[1fr_1.15fr]">
          <div className="flex flex-col justify-between border-b border-border px-7 py-10 sm:px-10 lg:border-r lg:border-b-0 lg:py-12">
            <div>
              <p className="mb-6 text-sm font-light leading-relaxed text-muted-foreground">
                Email me or send a short message — I
                usually reply within a day.
              </p>

              <a
                href={`mailto:${siteConfig.email}`}
                className="group inline-flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground transition-colors hover:text-accent sm:text-2xl"
              >
                {siteConfig.email}
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </a>

              <p className="mt-3 text-sm text-muted-foreground">
                {siteConfig.location}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <SocialIcons links={socialLinks} />
              {/* <a
                href={siteConfig.resumePath}
                download
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:text-accent"
              >
                <Download className="h-3.5 w-3.5" />
                Download CV
              </a> */}
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-7 py-10 sm:px-10 lg:py-12"
          >
            <div className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Mail className="h-4 w-4 text-accent" />
              Send a message
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-xs font-medium tracking-wide text-muted-foreground uppercase"
                >
                  Name
                </label>
                <input
                  id="name"
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent/50"
                  {...register("name")}
                />
                {errors.name ? (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs font-medium tracking-wide text-muted-foreground uppercase"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent/50"
                  {...register("email")}
                />
                {errors.email ? (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                ) : null}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <label
                htmlFor="message"
                className="text-xs font-medium tracking-wide text-muted-foreground uppercase"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Tell me about the role, product, or idea..."
                className="w-full resize-none rounded-2xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent/50"
                {...register("message")}
              />
              {errors.message ? (
                <p className="text-xs text-red-500">{errors.message.message}</p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,107,53,0.2),0_8px_24px_-6px_rgba(255,107,53,0.45)] transition-all hover:bg-orange-mid hover:shadow-[0_0_0_1px_rgba(255,107,53,0.3),0_12px_28px_-4px_rgba(255,107,53,0.5)] disabled:opacity-60 sm:w-auto"
            >
              <Send className="h-4 w-4" />
              Send message
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
