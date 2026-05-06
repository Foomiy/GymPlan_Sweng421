import { Flame, ShieldCheck } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const StreakBanner = () => {
  const streak = useAppStore((s) => s.streak);
  const lowSafety = streak.safetyDaysRemaining <= 1;

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-card",
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl",
            streak.count > 0 ? "gradient-hero text-primary-foreground shadow-neon" : "bg-secondary text-muted-foreground",
          )}
        >
          <Flame className="h-5 w-5" />
        </div>
        <div>
          <p className="text-lg font-bold leading-none">
            {streak.count}
            <span className="ml-1 text-sm font-medium text-muted-foreground">
              day{streak.count === 1 ? "" : "s"}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">Current streak</p>
        </div>
      </div>
      <div
        className={cn(
          "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium",
          lowSafety
            ? "bg-warning/15 text-warning"
            : "bg-secondary text-muted-foreground",
        )}
        title="Rest days you can take without losing your streak"
      >
        <ShieldCheck className="h-3.5 w-3.5" />
        {streak.safetyDaysRemaining} rest left
      </div>
    </div>
  );
};
