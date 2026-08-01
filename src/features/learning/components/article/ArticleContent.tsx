import type { ReactNode } from "react";
import { cn } from "@/shared/utils";

type ArticleContentProps = {
  children: ReactNode;
  className?: string;
};

export default function ArticleContent({
  children,
  className,
}: ArticleContentProps) {
  return (
    <div className={cn("learning-prose max-w-none", className)}>{children}</div>
  );
}
