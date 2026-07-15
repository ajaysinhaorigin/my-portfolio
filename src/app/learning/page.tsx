import type { Metadata } from "next";
import { LearningSection, Footer } from "@/features/portfolio";

export const metadata: Metadata = {
  title: "Learning",
  description:
    "Topics Ajay Sinha is currently studying — DSA, System Design, AWS, and more.",
};

export default function LearningPage() {
  return (
    <div className="pt-16">
      <LearningSection />
      <Footer />
    </div>
  );
}
