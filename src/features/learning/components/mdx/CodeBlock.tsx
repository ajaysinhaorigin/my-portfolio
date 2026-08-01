import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/utils";

type CodeBlockProps = HTMLAttributes<HTMLPreElement> & {
  children?: ReactNode;
  "data-language"?: string;
};

/**
 * Wrapper used by rehype-pretty-code / MDX for fenced code blocks.
 * Keeps styling consistent with the learning platform theme.
 */
export default function CodeBlock({
  children,
  className,
  ...props
}: CodeBlockProps) {
  const language = props["data-language"];

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border border-border bg-muted/40">
      {language ? (
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            {language}
          </span>
        </div>
      ) : null}
      <pre
        className={cn(
          "overflow-x-auto p-4 text-[13px] leading-relaxed font-mono",
          className,
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
