import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicHub, getNavigation, getTopicConfig } from "@/features/learning";

type TopicPageProps = {
  params: Promise<{ topic: string }>;
};

export async function generateStaticParams() {
  return [{ topic: "system-design" }];
}

export async function generateMetadata({
  params,
}: TopicPageProps): Promise<Metadata> {
  const { topic: topicSlug } = await params;
  const topic = getTopicConfig(topicSlug);

  if (!topic) {
    return { title: "Explore" };
  }

  return {
    title: topic.title,
    description: topic.description,
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic: topicSlug } = await params;
  const topic = getTopicConfig(topicSlug);

  if (!topic || topic.status !== "available") {
    notFound();
  }

  return <TopicHub topic={topic} sections={getNavigation(topicSlug)} />;
}
