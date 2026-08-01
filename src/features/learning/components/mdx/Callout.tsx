import type { ReactNode } from "react";
import { cn } from "@/shared/utils";

const variants = {
  definition: {
    label: "Definition",
    emoji: "💡",
    className:
      "border-sky-500/30 bg-sky-500/10 text-sky-950 dark:text-sky-100",
  },
  important: {
    label: "Important",
    emoji: "⚡",
    className:
      "border-amber-500/30 bg-amber-500/10 text-amber-950 dark:text-amber-100",
  },
  example: {
    label: "Example",
    emoji: "🟢",
    className:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100",
  },
  mistake: {
    label: "Common Mistake",
    emoji: "🔴",
    className:
      "border-rose-500/30 bg-rose-500/10 text-rose-950 dark:text-rose-100",
  },
  tip: {
    label: "Interview Tip",
    emoji: "🟣",
    className:
      "border-purple-500/30 bg-purple-500/10 text-purple-950 dark:text-purple-100",
  },
  remember: {
    label: "Remember",
    emoji: "📌",
    className:
      "border-orange-500/30 bg-orange-500/10 text-orange-950 dark:text-orange-100",
  },
  note: {
    label: "Notes",
    emoji: "📚",
    className:
      "border-blue-500/30 bg-blue-500/10 text-blue-950 dark:text-blue-100",
  },
  analogy: {
    label: "Analogy",
    emoji: "🧠",
    className:
      "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-950 dark:text-fuchsia-100",
  },
} as const;

export type CalloutVariant = keyof typeof variants;

type CalloutProps = {
  type?: CalloutVariant;
  title?: string;
  children: ReactNode;
};

export default function Callout({
  type = "note",
  title,
  children,
}: CalloutProps) {
  const variant = variants[type] ?? variants.note;

  return (
    <aside
      className={cn(
        "my-6 rounded-xl border px-4 py-3 text-sm leading-relaxed",
        variant.className,
      )}
    >
      <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold tracking-wide uppercase">
        <span aria-hidden>{variant.emoji}</span>
        <span>{title ?? variant.label}</span>
      </div>
      <div className="[&_p]:m-0 [&_p+p]:mt-2">{children}</div>
    </aside>
  );
}
