"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

/**
 * Hide the portfolio pill navbar inside the learning platform
 * so topic routes feel like a separate docs application.
 */
export default function ConditionalNavbar() {
  const pathname = usePathname();
  const isLearningApp =
    pathname.startsWith("/explore/") || pathname === "/explore";

  if (isLearningApp) {
    return null;
  }

  return <Navbar />;
}
