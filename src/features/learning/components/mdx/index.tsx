import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/shared/utils";
import Callout from "./Callout";
import CodeBlock from "./CodeBlock";
import MermaidDiagram from "./MermaidDiagram";

function Anchor(props: ComponentPropsWithoutRef<"a">) {
  const href = props.href ?? "";
  const isExternal = href.startsWith("http");

  return (
    <a
      {...props}
      className={cn(
        "font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent",
        props.className,
      )}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    />
  );
}

export const mdxComponents: MDXComponents = {
  Callout,
  Mermaid: MermaidDiagram,
  MermaidDiagram,
  pre: CodeBlock,
  a: Anchor,
  h2: (props) => (
    <h2
      {...props}
      className={cn(
        "mt-12 mb-4 scroll-mt-24 text-2xl font-semibold tracking-tight text-foreground",
        props.className,
      )}
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className={cn(
        "mt-8 mb-3 scroll-mt-24 text-xl font-semibold tracking-tight text-foreground",
        props.className,
      )}
    />
  ),
  h4: (props) => (
    <h4
      {...props}
      className={cn(
        "mt-6 mb-2 scroll-mt-24 text-lg font-medium text-foreground",
        props.className,
      )}
    />
  ),
  p: (props) => (
    <p
      {...props}
      className={cn(
        "my-4 text-[15px] leading-7 text-muted-foreground",
        props.className,
      )}
    />
  ),
  ul: (props) => (
    <ul
      {...props}
      className={cn(
        "my-4 list-disc space-y-2 pl-6 text-[15px] text-muted-foreground",
        props.className,
      )}
    />
  ),
  ol: (props) => (
    <ol
      {...props}
      className={cn(
        "my-4 list-decimal space-y-2 pl-6 text-[15px] text-muted-foreground",
        props.className,
      )}
    />
  ),
  li: (props) => (
    <li {...props} className={cn("leading-7", props.className)} />
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className={cn(
        "my-6 border-l-2 border-accent/60 pl-4 text-[15px] text-muted-foreground italic",
        props.className,
      )}
    />
  ),
  hr: (props) => (
    <hr {...props} className={cn("my-10 border-border", props.className)} />
  ),
  table: (props) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-border">
      <table
        {...props}
        className={cn("w-full text-left text-sm", props.className)}
      />
    </div>
  ),
  th: (props) => (
    <th
      {...props}
      className={cn(
        "border-b border-border bg-muted/50 px-4 py-2 font-semibold text-foreground",
        props.className,
      )}
    />
  ),
  td: (props) => (
    <td
      {...props}
      className={cn(
        "border-b border-border px-4 py-2 text-muted-foreground",
        props.className,
      )}
    />
  ),
  code: (props) => {
    const isBlock = typeof props.className === "string" &&
      props.className.includes("language-");

    if (isBlock) {
      return <code {...props} />;
    }

    return (
      <code
        {...props}
        className={cn(
          "rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground",
          props.className,
        )}
      />
    );
  },
};

export { Callout, CodeBlock, MermaidDiagram };
