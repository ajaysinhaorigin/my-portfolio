import { BookMarked, Star } from "lucide-react";
import type { LectureSource as LectureSourceType } from "@/features/learning/types/article";
import { cn } from "@/shared/utils";

type LectureSourceProps = {
  source: LectureSourceType;
};

const statusStyles = {
  "not-started": "bg-muted text-muted-foreground",
  "in-progress": "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  completed: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
};

const statusLabels = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  completed: "Completed",
};

export default function LectureSource({ source }: LectureSourceProps) {
  const confidence = Math.min(Math.max(source.confidence ?? 0, 0), 5);

  return (
    <></>
    // <section className="mt-12 rounded-2xl border border-border bg-card p-6">
    //   <div className="mb-5 flex items-center gap-2">
    //     <BookMarked className="h-4 w-4 text-accent" />
    //     <h2 className="text-lg font-semibold text-foreground">Lecture Source</h2>
    //   </div>

    //   <div className="grid gap-4 sm:grid-cols-2">
    //     <div>
    //       <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
    //         Course
    //       </dt>
    //       <dd className="mt-1 text-sm font-medium text-foreground">
    //         {source.course}
    //       </dd>
    //     </div>
    //     <div>
    //       <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
    //         Instructor
    //       </dt>
    //       <dd className="mt-1 text-sm font-medium text-foreground">
    //         {source.instructor}
    //       </dd>
    //     </div>
    //     <div>
    //       <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
    //         Status
    //       </dt>
    //       <dd className="mt-1">
    //         <span
    //           className={cn(
    //             "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
    //             statusStyles[source.status],
    //           )}
    //         >
    //           {statusLabels[source.status]}
    //         </span>
    //       </dd>
    //     </div>
    //     {source.completedOn ? (
    //       <div>
    //         <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
    //           Completed On
    //         </dt>
    //         <dd className="mt-1 text-sm font-medium text-foreground">
    //           {source.completedOn}
    //         </dd>
    //       </div>
    //     ) : null}
    //     {typeof source.revisionCount === "number" ? (
    //       <div>
    //         <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
    //           Revision Count
    //         </dt>
    //         <dd className="mt-1 text-sm font-medium text-foreground">
    //           {source.revisionCount}
    //         </dd>
    //       </div>
    //     ) : null}
    //     {confidence > 0 ? (
    //       <div>
    //         <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
    //           My Confidence
    //         </dt>
    //         <dd className="mt-1 flex items-center gap-0.5">
    //           {Array.from({ length: 5 }).map((_, index) => (
    //             <Star
    //               key={index}
    //               className={cn(
    //                 "h-4 w-4",
    //                 index < confidence
    //                   ? "fill-amber-400 text-amber-400"
    //                   : "text-border",
    //               )}
    //             />
    //           ))}
    //         </dd>
    //       </div>
    //     ) : null}
    //   </div>
    // </section>
  );
}
