import { Link } from "react-router-dom";
import { Sparkles, SlidersHorizontal, Clock, Flame, ChevronRight } from "lucide-react";
import { PRESETS } from "@/lib/exercises";
import { Button } from "@/components/ui/button";

const difficultyDot: Record<string, string> = {
  Easy: "bg-success",
  Medium: "bg-warning",
  Hard: "bg-destructive",
};

const Workouts = () => {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold">Workouts</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick a preset, build your own, or filter to fit your day.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <Link to="/workouts/build" className="group">
          <div className="gradient-hero relative h-32 overflow-hidden rounded-2xl p-4 text-primary-foreground shadow-neon">
            <SlidersHorizontal className="mb-2 h-6 w-6" />
            <p className="text-sm font-semibold">Build a workout</p>
            <p className="text-xs opacity-80">Filter by body part & difficulty</p>
            <ChevronRight className="absolute bottom-3 right-3 h-5 w-5" />
          </div>
        </Link>
        <Link to="/workouts/preset/upper-body" className="group">
          <div className="relative h-32 overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-card">
            <Sparkles className="mb-2 h-6 w-6 text-primary" />
            <p className="text-sm font-semibold">Quick start</p>
            <p className="text-xs text-muted-foreground">Jump into Upper Body</p>
            <ChevronRight className="absolute bottom-3 right-3 h-5 w-5 text-muted-foreground" />
          </div>
        </Link>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Preset workouts</h2>
          <span className="text-xs text-muted-foreground">{PRESETS.length} routines</span>
        </div>
        <ul className="space-y-3">
          {PRESETS.map((p) => (
            <li key={p.key}>
              <Link
                to={`/workouts/preset/${p.key}`}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-card transition-colors hover:border-primary/40"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
                  <Flame className="h-6 w-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-semibold">{p.name}</p>
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${difficultyDot[p.difficulty]}`}
                      aria-label={p.difficulty}
                    />
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{p.description}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {p.estMinutes} min
                    </span>
                    <span>{p.exerciseIds.length} exercises</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Button asChild variant="outline" className="w-full">
        <Link to="/workouts/build">Or build a custom workout →</Link>
      </Button>
    </div>
  );
};

export default Workouts;
