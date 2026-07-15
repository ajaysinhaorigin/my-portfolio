"use client";

import { motion } from "framer-motion";
import { FileDown } from "lucide-react";
import { siteConfig } from "@/features/portfolio/portfolio.data";

export default function FloatingCvButton() {
  return (
    <motion.a
      href={siteConfig.resumePath}
      download
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="fixed bottom-6 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-border bg-card/95 px-4 py-3 text-sm font-medium text-foreground shadow-lg backdrop-blur-md transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground sm:right-6"
      aria-label="Download CV"
    >
      <FileDown className="h-4 w-4" />
      <span className="hidden sm:inline">CV</span>
    </motion.a>
  );
}
