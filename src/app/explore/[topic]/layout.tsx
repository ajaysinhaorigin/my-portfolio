import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Sidebar } from "@/features/learning";
import { getNavigation, getTopicConfig } from "@/features/learning";

type TopicLayoutProps = {
  children: ReactNode;
  params: Promise<{ topic: string }>;
};

export default async function TopicLayout({
  children,
  params,
}: TopicLayoutProps) {
  const { topic: topicSlug } = await params;
  const topic = getTopicConfig(topicSlug);

  if (!topic || topic.status !== "available") {
    notFound();
  }

  const sections = getNavigation(topicSlug);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar topic={topic} sections={sections} />
      <div className="lg:ml-64">{children}</div>
    </div>
  );
}
