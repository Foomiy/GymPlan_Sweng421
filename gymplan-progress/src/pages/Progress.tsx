import { useMemo, useState } from "react";
import { Plus, Trash2, Target, TrendingUp, ChevronRight, ArrowLeft } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EXERCISES } from "@/lib/exercises";
import { BodyPart, Exercise } from "@/lib/types";
import { toast } from "sonner";

const BODY_PARTS: BodyPart[] = ["Chest", "Back", "Shoulders", "Arms", "Legs", "Core"];

const Progress = () => {
  const goals = useAppStore((s) => s.goals);
  const settings = useAppStore((s) => s.settings);
  const customExercises = useAppStore((s) => s.customExercises);
  const addGoal = useAppStore((s) => s.addGoal);
  const updateGoal = useAppStore((s) => s.updateGoal);
  const deleteGoal = useAppStore((s) => s.deleteGoal);

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<BodyPart | null>(null);
  const [picked, setPicked] = useState<Exercise | null>(null);
  const [target, setTarget] = useState("");
  const [current, setCurrent] = useState("");

  const allExercises = useMemo(
    () => [...customExercises, ...EXERCISES],
    [customExercises],
  );

  const reset = () => {
    setCategory(null);
    setPicked(null);
    setTarget("");
    setCurrent("");
  };

  const submit = () => {
    if (!picked || !target) {
      toast.error("Pick an exercise and target weight");
      return;
    }
    if (goals.some((g) => g.exerciseId === picked.id)) {
      toast.error("Goal already exists for this exercise");
      return;
    }
    addGoal({
      exerciseId: picked.id,
      exerciseName: picked.name,
      targetWeight: +target,
      currentWeight: +current || 0,
      unit: settings.unit,
    });
    reset();
    setOpen(false);
    toast.success("Goal added");
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold">Progress</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track strength goals — they auto-update when you log workouts.
        </p>
      </div>

      {goals.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
          <Target className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
          <p className="font-medium">No goals yet</p>
          <p className="mb-4 text-sm text-muted-foreground">
            Set your first strength goal to start tracking.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {goals.map((g) => {
            const pct = Math.min(100, Math.round((g.currentWeight / g.targetWeight) * 100));
            const reached = pct >= 100;
            return (
              <li
                key={g.id}
                className="rounded-2xl border border-border bg-card p-4 shadow-card"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{g.exerciseName}</p>
                    <p className="text-xs text-muted-foreground">
                      Goal: {g.targetWeight} {g.unit}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteGoal(g.id)}
                    className="text-muted-foreground hover:text-destructive"
                    aria-label="delete goal"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3">
                  <div className="flex items-baseline justify-between">
                    <p className="text-2xl font-bold">
                      {g.currentWeight}
                      <span className="ml-1 text-sm font-medium text-muted-foreground">
                        / {g.targetWeight} {g.unit}
                      </span>
                    </p>
                    <span
                      className={`text-sm font-bold ${
                        reached ? "text-success" : "text-primary"
                      }`}
                    >
                      {pct}%
                    </span>
                  </div>
                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full gradient-hero transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder={`Update current (${g.unit})`}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const v = +(e.target as HTMLInputElement).value;
                        if (v >= 0) {
                          updateGoal(g.id, v);
                          (e.target as HTMLInputElement).value = "";
                        }
                      }
                    }}
                  />
                  <span className="text-xs text-muted-foreground">↵ to log</span>
                </div>

                {g.history.length > 1 && (
                  <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    {g.history.length} updates logged
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <Sheet
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) reset();
        }}
      >
        <SheetTrigger asChild>
          <Button className="w-full shadow-neon" size="lg">
            <Plus className="mr-2 h-4 w-4" /> Add goal
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              {(category || picked) && (
                <button
                  onClick={() => (picked ? setPicked(null) : setCategory(null))}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="back"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
              {picked
                ? `Goal: ${picked.name}`
                : category
                ? category
                : "Pick an exercise"}
            </SheetTitle>
          </SheetHeader>

          {!category && !picked && (
            <div className="mt-4 space-y-2">
              {BODY_PARTS.map((p) => {
                const count = allExercises.filter((e) => e.bodyParts.includes(p)).length;
                return (
                  <button
                    key={p}
                    onClick={() => setCategory(p)}
                    className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/40"
                  >
                    <div>
                      <p className="font-semibold">{p}</p>
                      <p className="text-xs text-muted-foreground">{count} exercises</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                );
              })}
            </div>
          )}

          {category && !picked && (
            <ul className="mt-4 space-y-2">
              {allExercises
                .filter((e) => e.bodyParts.includes(category))
                .map((ex) => {
                  const taken = goals.some((g) => g.exerciseId === ex.id);
                  return (
                    <li key={ex.id}>
                      <button
                        disabled={taken}
                        onClick={() => setPicked(ex)}
                        className="flex w-full items-center justify-between rounded-lg border border-border bg-card p-3 text-left transition-colors hover:border-primary/40 disabled:opacity-50"
                      >
                        <div>
                          <p className="font-medium">{ex.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {ex.equipment} · {ex.difficulty}
                            {taken && " · already tracked"}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </li>
                  );
                })}
            </ul>
          )}

          {picked && (
            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="tg">Target ({settings.unit})</Label>
                  <Input
                    id="tg"
                    type="number"
                    placeholder="225"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="cur">Current ({settings.unit})</Label>
                  <Input
                    id="cur"
                    type="number"
                    placeholder="112.5"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Tip: this goal will auto-update when you log {picked.name} in a workout.
              </p>
              <Button onClick={submit} className="w-full">
                Save goal
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Progress;
