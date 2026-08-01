import type { ArticleFrontmatter } from "@/features/learning/types/article";
import LectureSource from "./LectureSource";
import RelatedTopics from "./RelatedTopics";

type ArticleFooterProps = {
  topic: string;
  frontmatter: ArticleFrontmatter;
};

export default function ArticleFooter({
  topic,
  frontmatter,
}: ArticleFooterProps) {
  return (
    <footer className="mt-12">
      {frontmatter.summary ? (
        <section className="rounded-2xl border border-border bg-muted/30 p-6">
          <h2 className="mb-3 text-lg font-semibold text-foreground">Summary</h2>
          <p className="text-[15px] leading-7 text-muted-foreground">
            {frontmatter.summary}
          </p>
        </section>
      ) : null}

      {frontmatter.interviewQuestions &&
      frontmatter.interviewQuestions.length > 0 ? (
        <section className="mt-8 rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Interview Questions
          </h2>
          <ol className="list-decimal space-y-3 pl-5 text-[15px] text-muted-foreground">
            {frontmatter.interviewQuestions.map((question) => (
              <li key={question} className="leading-7">
                {question}
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {frontmatter.relatedTopics ? (
        <RelatedTopics topic={topic} relatedTopics={frontmatter.relatedTopics} />
      ) : null}

      {frontmatter.lectureSource ? (
        <LectureSource source={frontmatter.lectureSource} />
      ) : null}
    </footer>
  );
}
