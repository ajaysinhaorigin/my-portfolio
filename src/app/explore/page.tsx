import type { Metadata } from "next";
import { LearningSection, Footer } from "@/features/portfolio";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Structured breakdowns of DSA, System Design, AWS, and more by Ajay Sinha.",
};

export default function ExplorePage() {
  return (
    <div className="pt-16">
      <LearningSection />
      <Footer />
    </div>
  );
}
