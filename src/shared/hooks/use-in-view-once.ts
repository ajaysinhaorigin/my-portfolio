"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

export function useInViewOnce(amount = 0.2) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount });

  return { ref, isInView };
}
