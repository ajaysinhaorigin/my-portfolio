"use client";

import { useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/shared/utils";

type MermaidDiagramProps = {
  chart: string;
  caption?: string;
  className?: string;
};

export default function MermaidDiagram({
  chart,
  caption,
  className,
}: MermaidDiagramProps) {
  const id = useId().replace(/:/g, "");
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      try {
        if (typeof chart !== "string" || !chart.trim()) {
          throw new Error("Mermaid chart is missing or empty");
        }

        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: resolvedTheme === "dark" ? "dark" : "default",
          fontFamily: "var(--font-sans)",
        });

        const { svg: rendered } = await mermaid.render(
          `mermaid-${id}`,
          chart.trim(),
        );

        if (!cancelled) {
          setSvg(rendered);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to render diagram");
          setSvg("");
        }
      }
    }

    void renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [chart, id, resolvedTheme]);

  return (
    <figure
      className={cn(
        "my-8 overflow-hidden rounded-xl border border-border bg-card p-4",
        className,
      )}
    >
      {error ? (
        <pre className="overflow-x-auto text-xs text-rose-500">{error}</pre>
      ) : svg ? (
        <div
          className="flex justify-center overflow-x-auto [&_svg]:max-w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
          Rendering diagram…
        </div>
      )}
      {caption ? (
        <figcaption className="mt-3 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
