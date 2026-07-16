"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { siteConfig, socialLinks } from "@/features/portfolio/portfolio.data";
import SocialIcons from "./social-icons";

type FourPointStarProps = {
  className?: string;
  color?: string;
};

function FourPointStar({
  className,
  color = "currentColor",
}: FourPointStarProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M12 0C12 6.62742 17.3726 12 24 12C17.3726 12 12 17.3726 12 24C12 17.3726 6.62742 12 0 12C6.62742 12 12 6.62742 12 0Z"
        fill={color}
      />
    </svg>
  );
}

type OrbitStar = {
  angle: number;
  sizeClass: string;
  /** Dimmer fill — still sharp & blinking, just less intense */
  muted?: boolean;
};

type OrbitRingProps = {
  sizeClass: string;
  ringClass: string;
  duration: number;
  reverse?: boolean;
  starColor: string;
  stars: OrbitStar[];
};

function OrbitRing({
  sizeClass,
  ringClass,
  duration,
  reverse = false,
  starColor,
  stars,
}: OrbitRingProps) {
  return (
    <div className={`absolute ${sizeClass}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className={`absolute inset-0 rounded-full border ${ringClass}`}
      />

      <motion.div
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        {stars.map((star, index) => (
          <div
            key={star.angle}
            className="absolute inset-0"
            style={{ transform: `rotate(${star.angle}deg)` }}
          >
            <motion.div
              animate={{ rotate: reverse ? 360 : -360 }}
              transition={{ duration, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div
                animate={{
                  opacity: star.muted ? [0.4, 0.85, 0.4] : [0.55, 1, 0.55],
                  scale: star.muted ? [0.82, 1.12, 0.82] : [0.85, 1.18, 0.85],
                }}
                transition={{
                  duration: star.muted ? 2.4 : 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.4,
                }}
              >
                <FourPointStar className={star.sizeClass} color={starColor} />
              </motion.div>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[95vh] w-full flex-col items-center justify-center overflow-hidden pt-24"
    >
      {/* Smooth layered background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(255,107,53,0.07)_0%,transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_28%,rgba(255,255,255,0.04)_0%,transparent_60%)]" />
      </div>

      {/*
        Size from reference (large), design from before:
        quiet dashed/solid borders, no glow, subtle stars.
      */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        {/* Outer — white ring + orange stars (bright + softer, both sharp & blinking) */}
        <OrbitRing
          sizeClass="h-[min(1400px,126vmin)] w-[min(1400px,126vmin)]"
          duration={55}
          ringClass="border border-dashed border-foreground/[0.08] dark:border-white/[0.09]"
          starColor="color-mix(in oklab, var(--accent) 72%, white)"
          stars={[
            { angle: 15, sizeClass: "h-7 w-7 sm:h-8 sm:w-8" },
            { angle: 105, sizeClass: "h-5 w-5 sm:h-6 sm:w-6", muted: true },
            { angle: 195, sizeClass: "h-8 w-8 sm:h-9 sm:w-9" },
            { angle: 285, sizeClass: "h-4 w-4 sm:h-5 sm:w-5", muted: true },
          ]}
        />

        {/* Middle — light orange ring + soft white stars */}
        <OrbitRing
          sizeClass="h-[min(920px,88vmin)] w-[min(920px,88vmin)]"
          duration={42}
          reverse
          ringClass="border border-accent/15"
          starColor="color-mix(in oklab, white 70%, var(--foreground))"
          stars={[
            { angle: 40, sizeClass: "h-6 w-6 sm:h-7 sm:w-7" },
            { angle: 130, sizeClass: "h-4 w-4 sm:h-5 sm:w-5", muted: true },
            { angle: 220, sizeClass: "h-7 w-7 sm:h-8 sm:w-8" },
            { angle: 310, sizeClass: "h-3.5 w-3.5 sm:h-4 sm:w-4", muted: true },
          ]}
        />

        {/* Inner — white ring + light orange stars */}
        <OrbitRing
          sizeClass="h-[min(540px,52vmin)] w-[min(540px,52vmin)]"
          duration={30}
          ringClass="border border-dashed border-foreground/[0.09] dark:border-white/[0.1]"
          starColor="color-mix(in oklab, var(--accent) 65%, white)"
          stars={[
            { angle: 0, sizeClass: "h-5 w-5 sm:h-6 sm:w-6" },
            { angle: 120, sizeClass: "h-3.5 w-3.5 sm:h-4 sm:w-4", muted: true },
            { angle: 240, sizeClass: "h-6 w-6 sm:h-7 sm:w-7" },
          ]}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mt-12 flex max-w-4xl flex-col items-center px-6 text-center"
      >
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-card/70 px-4 py-2 shadow-lg backdrop-blur-md">
          <div className="relative flex h-2.5 w-2.5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            Fullstack Software Engineer
          </span>
        </div>

        <h1 className="font-display mb-6 text-5xl leading-[1.05] font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl">
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-foreground via-muted-foreground to-muted-foreground/60 bg-clip-text text-transparent">
            {siteConfig.name}
          </span>
        </h1>

        <p className="mb-12 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
          {siteConfig.tagline}
        </p>

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-3">
          <a
            href="#projects"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,107,53,0.2),0_8px_24px_-6px_rgba(255,107,53,0.45)] transition-all duration-300 hover:bg-orange-mid hover:shadow-[0_0_0_1px_rgba(255,107,53,0.3),0_12px_28px_-4px_rgba(255,107,53,0.5)] hover:brightness-105"
          >
            Explore Work
            <ArrowRight className="h-4 w-4 opacity-90 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>

          <a
            href={siteConfig.resumePath}
            download
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-7 text-sm font-semibold text-foreground backdrop-blur-md transition-all duration-300  hover:border-accent/40 hover:text-accent"
          >
            <Download className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-accent" />
            Download CV
          </a>
        </div>

        <div className="mt-12 flex justify-center">
          <SocialIcons links={socialLinks} />
        </div>
      </motion.div>
    </section>
  );
}
