import type { Difficulty } from "@/features/learning/types/article";
import { Badge } from "@/shared/components/ui";
import { cn } from "@/shared/utils";

const difficultyStyles: Record<Difficulty, string> = {
  beginner: "border-emerald-500/30 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  intermediate: "border-blue-500/30 bg-blue-500/15 text-blue-600 dark:text-blue-400",
  advanced: "border-purple-500/30 bg-purple-500/15 text-purple-600 dark:text-purple-400",
};

const difficultyLabels: Record<Difficulty, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

type DifficultyBadgeProps = {
  difficulty: Difficulty;
  className?: string;
};

export default function DifficultyBadge({
  difficulty,
  className,
}: DifficultyBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(difficultyStyles[difficulty], className)}
    >
      {difficultyLabels[difficulty]}
    </Badge>
  );
}
